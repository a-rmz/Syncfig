#!/usr/bin/env node

import * as program from "commander";

program
  .version("0.0.1");

// Sync
program
  .command("update", "Synchronize the files", {isDefault: true});

// List files
program
  .command("ls", "List all the sync'd files");

// Add files
program
  .command("add", "Add a new config file");

// Remove a listed file
program
  .command("rm", "Remove a config file");

program.parse(process.argv);
