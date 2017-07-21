
import { mkdir } from "fs";
import * as chalk from "chalk"; import * as untildify from "untildify";

export let init = () => {
  mkdir(untildify("~/.syncfig", error => {
    if (error) {
      console.log("Oops! Something went wrong while creating our directory");
    } else {
      console.log(`Syncfig directory created successfully under ${chalk.bold("~/.syncfig")}`);
    }
  }));
};
