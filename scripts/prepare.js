import "./fetch-d2.js";

import shell from "shelljs";

shell.exec("chomp build:pre");
shell.exec("chomp build");
