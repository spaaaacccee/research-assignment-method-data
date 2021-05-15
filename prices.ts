import { writeFileSync } from "fs";
///@ts-ignore
import finance from "yahoo-finance";
import { companies } from "./companies";

// Top 100 companies
const COMPANY_COUNT = 100;
const topics = companies.slice(0, COMPANY_COUNT);
const DATE_FROM = "2021-05-05";
const DATE_TO = "2021-05-13";

for (const topic of topics) {
  finance.historical(
    {
      symbol: `${topic.code}.AX`,
      from: DATE_FROM,
      to: DATE_TO,
      period: "d", // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err: any, quotes: any) {
      writeFileSync(`prices/${topic.code}.json`, JSON.stringify(quotes));
    }
  );
}
