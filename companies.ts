import { readFileSync, writeFileSync } from "fs";

const file = readFileSync("./companies.csv", "utf-8");

type CompanyEntry = {
  code: string;
  name: string;
  notes?: string;
};

const out: CompanyEntry[] = [];

for (const line of file.split("\n")) {
  const [code, name, notes] = line.split(",").map((s) => s.trim());
  out.push({
    code,
    name,
    notes,
  });
}

export const companies = out;

export function writeToFile(path = "./companies.json") {
  writeFileSync(path, JSON.stringify(out));
}
