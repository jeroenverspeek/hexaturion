import { showTime } from "../common";
import { defineApp } from "../types";

export default defineApp({
  id: "stockMarket",
  title: "Stock market",
  description: "Your favourite stock and crypto quotes.",
  icon: "money-bill-trend-up",
  category: "info",
  script: "stockMarketQuotes/showStockMarketQuotes.ts",
  startLabel: "Show quotes",
  params: [
    {
      id: "tickerSymbols",
      label: "Ticker symbols",
      type: "multiselect",
      flag: "--tickerSymbols",
      default: ["ASML.AS", "MSFT", "AAPL"],
      choices: [
        { value: "^AEX", label: "AEX" },
        { value: "ASML.AS", label: "ASML" },
        { value: "RABO.AS", label: "RABO" },
        { value: "SHELL.AS", label: "SHELL" },
        { value: "GOOG" },
        { value: "MSFT" },
        { value: "AAPL" },
      ],
      required: true,
    },
    {
      id: "speedFactor",
      label: "Speed of the banners",
      type: "number",
      flag: "--speedFactor",
      min: 0.1,
      step: 0.1,
      placeholder: "1",
      advanced: true,
    },
    showTime,
  ],
});
