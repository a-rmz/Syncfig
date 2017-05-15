#!/usr/bin/env node

import * as program from "commander";
import * as chalk from "chalk";
import { parseSyncfile } from "./lib/parse";

const path = "/Users/a-rmz/Documents/syncfig/syncfile.example";
const configFiles = parseSyncfile(path);

program
  .version("0.0.1");

// List files
program
  .command("ls", "List all the sync'd files");

// Add files
program
  .command("add", "Add a new config file", {isDefault: true});

program.parse(process.argv);
