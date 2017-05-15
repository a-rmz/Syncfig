import { readFileSync } from "fs";
import { defaults } from "./defaults";
import * as untildify from "untildify";

/**
 * Parsing algorithm based on dotenv's
 * Loads the key=value pairs or only keys and looks for them in the
 * defaults file
 * @param {string}  path Path to the file to parse
 */
export let parseSyncfile = (path: string) => {
  const file = readFileSync(path).toString();
  const lines = file.split("\n");

  const obj = { };

  lines.forEach((line) => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=?(\s*(.*)?\s*)?$/);
    // matched?
    if (keyValueArr != undefined) {
      const key = keyValueArr[1];

      // default undefined or missing values to empty string
      let value = keyValueArr[2] ? keyValueArr[2] : defaults[key] ? defaults[key] : "";

      // expand newlines in quoted values
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === "\"\"" && value.charAt(len - 1) === "\"\"") {
        value = value.replace(/\\n/gm, "\n");
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, "").trim();

      // resolve user dir
      value = untildify(value);
      obj[key] = value;
    }
  });

  return obj;
};
