import type { Search } from "twitter-api-client";

export type Tweet = Search["statuses"][0];

export type Combined = {
  prices: { [K in string]: Company };
  posts: {
    [K in string]: Posts;
  };
};

export type CompanyEntry = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  symbol: string;
};

export type Posts = {
  day: { posts: Post[] }[];
};

export type Post = {
  text: string;
  textSentiment: number;
  retweetCount: number;
  favoriteCount: number;
};

export type Investor = {
  cookies: number;
  cookiesInvested: number;
  /**
   * 0=x<1
   */
  visibility: number;
  posts: Post[];
  x: number;
  y: number;
};

export type Company = {
  values: { value: number; change: number }[];
};

export type Vision = {
  investors: Investor[];
  company: Company;
};
