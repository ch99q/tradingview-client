// deno-lint-ignore-file no-explicit-any
import EventEmitter from "node:events";

const HOST = "wss://data.tradingview.com/socket.io/websocket?&type=chart";
const PROHOST = "wss://prodata.tradingview.com/socket.io/websocket?&type=chart";

type Message = Array<any> | Record<string, any>;

type Session = {
  protocol: Record<string, unknown>;
  socket: WebSocketStream;
  writer: WritableStreamDefaultWriter<string>;
  reader: ReadableStreamDefaultReader<string | Uint8Array>;
  send: (event: string, payload: Message) => void;
  close: () => void;
} & EventEmitter;

export async function connect(token?: string): Promise<Session> {
  const emitter = new EventEmitter()
  const socket = new WebSocketStream(token ? PROHOST : HOST, {
    headers: {
      'Origin': 'https://www.tradingview.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
      'Sec-WebSocket-Version': '13',
      'Sec-WebSocket-Key': 'fUe350iCGq763b/Cg8HQRQ==',
      'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
      "Accept-Encoding": "gzip, deflate, br, zstd",
    }
  });

  const { readable, writable } = await socket.opened;
  const writer = writable.getWriter();
  const reader = readable.getReader();

  let opened = false;

  let protocol = {};
  (async () => {
    try {
      while (true) {
        // Protocol: ~m~<packet size>~m~<packet>~m~<packet size>~m~<packet>...
        const { value, done } = await reader.read().then(({ value, done }) => ({ value: String(value), done }))
        if (done) return;
        const packets = value.split("~m~").filter(Boolean).reduce((acc, packet, i) => {
          // Convert the packets into an array of ~m~<packet size>~m~<packet>
          if (i % 2 === 0) acc.push("~m~" + packet);
          else acc[acc.length - 1] += "~m~" + packet;
          return acc;
        }, [] as string[]);
        for (const value of packets) {
          if (value.includes("~m~~h~")) {
            const [_, length, heartbeat] = value.match(/~m~(\d+)~m~~h~(\d+)/)!;
            await writer.write(`~m~${length}~m~~h~${heartbeat}`);
          } else if (value.includes("~m~{\"session_id\"")) {
            const [_, _length, data] = String(value).match(/~m~(\d+)~m~(.+)/)!;
            protocol = JSON.parse(data);
            emitter.emit('protocol', protocol);
          } else {
            if (!opened && protocol) {
              opened = true;
              emitter.emit('open', protocol);
            }
            const [_, _length, data] = String(value).match(/~m~(\d+)~m~(.+)/)!;
            const { m: event, p: payload } = JSON.parse(data) as { m: string, p: Message };
            if (event.endsWith('_error')) {
              emitter.emit('error', payload);
            } else {
              emitter.emit(event, payload);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      reader.releaseLock();
      emitter.emit('close');
    }
  })();

  // Wait until the protocol is received.
  await new Promise(resolve => emitter.once('protocol', resolve));

  const send = (event: string, payload: Message): Promise<void> => {
    const message = JSON.stringify({ m: event, p: payload });
    return writer.write(`~m~${message.length}~m~${message}`);
  }

  await send('set_auth_token', [token || 'unauthorized_user_token']);
  await send('set_locale', ['en', 'US']);

  const interval = setInterval(() => {
    // Check if there any listeners for any event.
    if (emitter.eventNames().length === 0) {
      socket.close();
      clearInterval(interval);
    }
  }, 100);

  (emitter as Session).protocol = protocol;
  (emitter as Session).socket = socket;
  (emitter as Session).reader = reader;
  (emitter as Session).writer = writer;
  (emitter as Session).send = send;
  (emitter as Session).close = () => {
    writer.write("~m~0~m~");
    socket.close();
  }
  return emitter as Session;
}

type Study = {
  id: string
  on: (callback: (data: Timerecord[]) => void) => void;
  once: (callback: (data: Timerecord[]) => void) => void;
}

type Series = {
  id: string
  on: (callback: (data: Timerecord[]) => void) => void;
  once: (callback: (data: Timerecord[]) => void) => void;
  createStudy: (indicator: string, options?: Record<string, any>) => Study;
  createScript: (script: string, inputs?: Input[], version?: string) => Study;
}

type Chart = {
  id: string
  switchTimezone: (timezone: string) => void;
  resolveSymbol: (symbol: string, exchange: string) => Promise<Symbol>;
  createSeries: (timeframe: Timeframe, symbol: Symbol, klines?: number, range?: string) => Series;
}

type Symbol = {
  id: string
  data: Record<string, any>;
}

type Input = { type: "integer", value: number } | { type: "source", value: string } | { type: "text", value: string } | { type: "float", value: number } | { type: "bool", value: boolean } | { type: "resolution", value: string }

type Timeframe = "1" | "3" | "5" | "15" | "30" | "60" | "120" | "180" | "240" | "1D" | "1W" | "1M";
type Timerecord = { i: number, v: number[] }

let REQUEST_ID = 0;
export function createChart(session: Session, id: string): Chart {
  session.send('chart_create_session', [id]);
  return {
    id,
    switchTimezone: (timezone: string) =>
      session.send('switch_timezone', [id, timezone]),
    resolveSymbol: (symbol: string, exchange: string) => new Promise<Symbol>((resolve) => {
      const SYMBOL_ID = "sds_sym_" + REQUEST_ID++;
      session.once('symbol_resolved', (data) => data[1] == SYMBOL_ID && resolve({ id: SYMBOL_ID, data: data[2] }));
      session.send('resolve_symbol', [id, SYMBOL_ID, "=" + JSON.stringify({ adjustment: "splits", symbol: `${exchange}:${symbol}` })])
    }),
    createSeries: (timeframe: Timeframe, symbol: Symbol, klines: number = 300, range: string = "") => {
      const SERIES_ID = "sds_" + REQUEST_ID++;
      session.send("create_series", [id, SERIES_ID, "s1", symbol.id, timeframe, klines, range]);

      return {
        id: SERIES_ID,
        on: (callback: (data: Timerecord[]) => void) => {
          const handle = (data: Record<string, any>) => {
            if (data[0] == id && data[1][SERIES_ID]) {
              callback(data[1][SERIES_ID].s);
            }
          }
          session.on('timescale_update', handle);
        },
        once: (callback: (data: Timerecord[]) => void) => {
          const handle = (data: Record<string, any>) => {
            if (data[0] == id && data[1][SERIES_ID]) {
              session.removeListener('timescale_update', handle);
              callback(data[1][SERIES_ID].s);
            }
          }
          session.on('timescale_update', handle);
        },
        createStudy: (indicator: string, options: Record<string, any> = {}) => {
          const STUDY_ID = "study_" + REQUEST_ID++;
          session.send("create_study", [id, STUDY_ID, "st1", SERIES_ID, indicator, options]);

          return {
            id: STUDY_ID,
            on: (callback: (data: Timerecord[]) => void) => {
              function handle(data: Record<string, any>) {
                if (data[0] == id && data[1][STUDY_ID]) {
                  callback(data[1][STUDY_ID].st);
                }
              }
              session.on('du', handle);
            },
            once: (callback: (data: Timerecord[]) => void) => {
              function handle(data: Record<string, any>) {
                if (data[0] == id && data[1][STUDY_ID]) {
                  session.removeListener('du', handle);
                  callback(data[1][STUDY_ID].st);
                }
              }
              session.on('du', handle);
            }
          }
        },
        createScript: (script: string, inputs: Input[] = [], version?: string) => {
          const SCRIPT_ID = "script_" + REQUEST_ID++;
          session.send("create_study", [id, SCRIPT_ID, "st1", SERIES_ID, "Script@tv-scripting-101!", {
            text: script,
            ...(inputs.map((input, i) => ({ [`in_${i}`]: { v: input.value, f: true, t: input.type } })).reduce((acc, input) => ({ ...acc, ...input }), {})),
            ...(version ? { pineVersion: version } : {}),
          }]);
          return {
            id: SCRIPT_ID,
            on: (callback: (data: Timerecord[]) => void) => {
              const handle = (data: Record<string, any>) => {
                if (data[0] == id && data[1][SCRIPT_ID]) {
                  callback(data[1][SCRIPT_ID].st);
                }
              }
              session.on('du', handle);
            },
            once: (callback: (data: Timerecord[]) => void) => {
              const handle = (data: Record<string, any>) => {
                if (data[0] == id && data[1][SCRIPT_ID]) {
                  session.removeListener('du', handle);
                  callback(data[1][SCRIPT_ID].st);
                }
              }
              session.on('du', handle);
            }
          }
        }
      }
    }
  }
}