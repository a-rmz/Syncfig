
import * as program_rm from "commander";
import * as chalk from "chalk";
import { parseSyncfile, parseTextFile } from "./lib/parse";
import { syncfilePath } from "./config/paths";
import { writeFile } from "fs";

program_rm
  .parse(process.argv);

const args: string[] = program_rm.args;

if (args.length < 1) {
  console.log(chalk.bold.red("Please enter a valid argument"));
  process.exit(1);
}

const confPath: string = syncfilePath;
const configFiles: {} = parseSyncfile(confPath);

const found: string[] = [];
const notFound: string[] = [];

args.forEach(arg => {
  if (configFiles[arg]) {
    found.push(arg);
  } else {
    notFound.push(arg);
  }
  delete configFiles[arg];
});

if (found.length > 0) {
  writeFile(syncfilePath, parseTextFile(configFiles), error => {
    if (error) {
      console.log("Oops! There was an error removing. Please try again later.");
    } else {
      console.log("Successfully deleted:");
      found.forEach(f => console.log(chalk.green(f)));
    }
  });
}

if (notFound.length > 0) {
  console.log();
  console.log("The following were not found:");
  notFound.forEach(f => console.log(chalk.red(f)));
}
