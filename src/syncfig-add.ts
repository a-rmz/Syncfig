
import * as program_add from "commander";
import * as chalk from "chalk";
import { defaults } from "./lib/defaults";

program_add
  .option("-p --path", "Add a custom path for the file")
  .parse(process.argv);

const args = program_add.args;

if (args.length < 1 || args.length > 2) {
  console.log(chalk.bold.red("Please enter a valid argument"));
  process.exit(1);
}

const program = args[0];
let path = args[1];

if (!program_add.path && !path) {
  console.log("That file is not listed in the defaults. :(");
  console.log(`Please a path manually using the ${chalk.bold("-p")} flag`);
  process.exit(1);
} else if (program_add.path && !path) {
  console.log(chalk.bold.red("Please enter a valid path"));
  process.exit(1);
}

path = path ? path : defaults[program];

console.log(`Adding ${chalk.green(program)} => ${path}`);
