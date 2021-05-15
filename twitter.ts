import { companies } from "./companies";
import { Search, TwitterClient } from "twitter-api-client";
import { writeFileSync } from "fs";
import { go } from "./utils";
import { apiKey } from "./apiKey";

go(async () => {
  // Top 100 companies
  const COMPANY_COUNT = 100;
  const TWEET_COUNT = 100;
  // Words to ignore in company names (lowercase)
  const IGNORE_WORDS = [
    "the",
    "ltd",
    "company",
    "group",
    "corporation",
    "enterprises",
    "Inc",
    "global",
    "etf",
  ];

  const twitter = new TwitterClient(apiKey);

  const topics = companies.slice(0, COMPANY_COUNT);

  //   const out: { [K in string]: Search } = {};

  for (const topic of topics) {
    let name = topic.name.toLowerCase();
    for (const ignoreWord of IGNORE_WORDS) {
      name = name.replace(ignoreWord, "");
    }
    const tweets = await twitter.tweets.search({
      lang: "en",
      //   result_type: "popular",
      count: TWEET_COUNT,
      q: `${name} ${topic.notes ?? ""}`,
    }); // out[topic.code] = tweets;
    writeFileSync(`tweets/${topic.code}.json`, JSON.stringify(tweets));
  }
});
