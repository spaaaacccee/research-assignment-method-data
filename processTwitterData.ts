import { companies } from "./companies";
import type { Search } from "twitter-api-client";
import type { Posts } from "./types";
import Sentiment from "sentiment";
import { go } from "./utils";
import moment from "moment";
import { writeFileSync } from "fs";

const sentiment = new Sentiment();

// Top 100 companies
const COMPANY_COUNT = 100;
const topics = companies.slice(0, COMPANY_COUNT);

const DATE_FROM = "2021-05-05";
const DATE_TO = "2021-05-13";

go(async () => {
  const dateFrom = moment(DATE_FROM, "YYYY-MM-DD");
  const dateTo = moment(DATE_TO, "YYYY-MM-DD");
  for (const { code } of topics) {
    const { statuses }: Search = await import(`./tweets/${code}.json`);
    const out: Posts = { day: [] };
    for (let m = dateFrom.clone(); m.isBefore(dateTo); m.add(1, "days")) {
      const postsToday = statuses.filter((s) =>
        moment(s.created_at, "ddd MMM D HH:mm:ss ZZ YYYY").isSame(m, "day")
      );
      out.day.push({
        posts: postsToday.map((s) => ({
          text: s.text,
          textSentiment: sentiment.analyze(s.text).score,
          favoriteCount: s.favorite_count,
          retweetCount: s.retweet_count,
        })),
      });
    }
    writeFileSync(`./processed-tweets/${code}.json`, JSON.stringify(out));
  }
});
