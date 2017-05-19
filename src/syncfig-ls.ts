
import * as program_ls from "commander";
import * as chalk from "chalk";
import { defaults } from "./lib/defaults";
import { parseSyncfile } from "./lib/parse";
import { syncfilePath } from "./config/paths";

const confPath: string = syncfilePath;
const configFiles: {} = parseSyncfile(confPath);

program_ls
  .option("-d --defaults", "List the default config files")
  .parse(process.argv);

const args = program_ls.args;

if (program_ls.defaults) {
  console.log(chalk.bold("These are the default config files included:"));
  for (const file in defaults) {
    console.log(`${chalk.green(file)} => ${defaults[file]}`);
  }
} else {
  console.log(chalk.bold("These are the files you have listed under your syncfile:"));
  for (const file in configFiles) {
    console.log(`${chalk.green(file)} => ${configFiles[file]}`);
  }
}


