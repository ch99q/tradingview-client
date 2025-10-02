import { Chart, createStudy, Series, Session } from "../client.ts";

const MARKET_CAP_SCRIPT = "bmI9Ks46_0sYpywA7oLeYKZAEkmbcgQ==_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";

const PRESETS = {
  MARKET_CAP: {
    text: MARKET_CAP_SCRIPT,
    pineId: "STD;Fund_market_cap_basic",
    pineVersion: "69.0",
  }
}

export const createPresetStudy = (session: Session, chart: Chart, series: Series, presetName: keyof typeof PRESETS) => {
  const preset = PRESETS[presetName];
  if (!preset) {
    throw new Error(`Preset study "${presetName}" not found.`);
  }
  return createStudy(session, chart, series, {
    id: "Internal@tv-scripting-101!",
    metadata: {
      text: preset.text,
      pineId: preset.pineId,
      pineVersion: preset.pineVersion
    },
    parameters: [
      { type: "symbol", value: "" },
      { type: "text", value: "USD" }, // Use USD as the default currency.
    ]
  });
}