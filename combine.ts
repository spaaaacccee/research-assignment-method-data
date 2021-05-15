import { companies } from "./companies";
import { Search, TwitterClient } from "twitter-api-client";
import { writeFileSync } from "fs";
import { go } from "./utils";
import { Combined, Company, Posts } from "./types";

go(async () => {
  // Top 100 companies
  const COMPANY_COUNT = 100;
  const topics = companies.slice(0, COMPANY_COUNT);

  const out: Combined = { posts: {}, prices: {} };
  for (const topic of topics) {
    const { values }: Company = await import(
      `./processed-prices/${topic.code}.json`
    );
    const { day }: Posts = await import(
      `./processed-tweets/${topic.code}.json`
    );
    out.prices[topic.code] = { values };
    out.posts[topic.code] = { day };
  }

  writeFileSync(`./dataset.json`, JSON.stringify(out));
});
