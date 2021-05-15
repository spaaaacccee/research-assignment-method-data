import { writeFileSync } from "fs";
import { companies } from "./companies";
import type { Company } from "./types";
import { go } from "./utils";

go(async () => {
  for (const { code } of companies) {
    const out: Company = { values: [] };
    const entries = await import(`./prices/${code}.json`);
    for (const { close, open } of entries.default) {
      out.values.push({
        value: close,
        change: open === close ? 0 : open > close ? -1 : 1,
      });
    }
    writeFileSync(`./processed-prices/${code}.json`, JSON.stringify(out));
  }
});
