
import * as program_add from "commander";
import * as chalk from "chalk";
import { defaults } from "./lib/defaults";
import { appendFileSync } from "fs";
import { syncfilePath } from "./config/paths";

program_add
  .option("-p --path", "Add a custom path for the file")
  .parse(process.argv);

const args = program_add.args;

if (args.length < 1 || args.length > 2) {
  console.log(chalk.bold.red("Please enter a valid argument"));
  process.exit(1);
}

const program = args[0];
const path = args[1];

if (!program_add.path && !path && !defaults[program]) {
  console.log("That file is not listed in the defaults. :(");
  console.log(`Please a path manually using the ${chalk.bold("-p")} flag`);
  process.exit(1);
} else if (program_add.path && !path) {
  console.log(chalk.bold.red("Please enter a valid path"));
  process.exit(1);
}

console.log(`Adding ${chalk.green(program)} => ${path ? path : defaults[program]}`);

const cb = error => {
  if (error) {
    console.log(`Oops! There was an error adding ${chalk.red(program)} to the list.`);
  } else {
    console.log(`Successfully added ${program}`);
  }
};

if (path) {
  const data = `${program}="${path}"`;
  appendFileSync(syncfilePath, data, cb);
} else {
  appendFileSync(syncfilePath, program, cb);
}
