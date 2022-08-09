import toml from "@tuzig/toml";
import fs from "fs";
import util from "util";

const data = fs.readFileSync("./src/api/$data/core.toml", "utf8");
console.log(util.inspect(toml.parse(data), { depth: null }));
