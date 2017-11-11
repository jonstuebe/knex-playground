const chalk = require("chalk");
const { map } = require("lodash");
const sqlFormatter = require("sql-formatter");

const log = function(data) {
  console.log(chalk.blue(data));
};
const savePoint = function() {
  const queries = map(arguments, arg => {
    return sqlFormatter.format(arg.toString());
  });

  return `
  SAVEPOINT test;

  ${queries.join("\n")}\n
ROLLBACK TO SAVEPOINT test;
  `.trim();
};
const stringify = data => {
  console.log(JSON.stringify(data, null, 2));
};
const transaction = function() {
  const queries = map(arguments, arg => {
    if (typeof arg === "string") {
      return arg;
    }
    return sqlFormatter.format(arg.toString());
  });

  return `
  BEGIN;

  ${queries.join("\n")}\n
COMMIT;
  `.trim();
};

module.exports = {
  log,
  stringify,
  transaction,
  savePoint
};
