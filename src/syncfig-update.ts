
import * as program_update from "commander";
import * as chalk from "chalk";
import * as lnf from "lnf";

import { defaults } from "./lib/defaults";
import { parseSyncfile } from "./lib/parse";
import { syncfilePath, syncfigDir } from "./config/paths";
import { parse, join } from "path";

const confPath: string = syncfilePath;
const configFiles: {} = parseSyncfile(confPath);

program_update
  .option("-v --verbose", "Log some nerdy details of the process")
  .parse(process.argv);

const verbose: boolean = program_update.verbose || false;

const sync = (file: string, destPath: string, verbose: boolean) => {
  if (verbose) console.log(`Creating symlink for: ${chalk.green(file)} => ${destPath}`);
  const filename = parse(destPath).name;
  const targetPath = join(syncfigDir, filename);

  lnf(targetPath, destPath, error => {
    if (error) {
      console.log(`Oops! There was something wrong creating the link for ${file}`);
    } else if (verbose) {
      console.log(`Successfully linked ${chalk.bold(file)}`);
    }
  });
};

for (const file in configFiles) {
  const path = configFiles[file] || defaults[file];
  sync(file, path, verbose);
}
