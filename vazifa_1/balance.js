import fs from "fs";

const [, , options] = process.argv;
let expanses = fs.readFileSync("./database/expanses.json", "utf-8");
let incomes = fs.readFileSync("./database/incomes.json", "utf-8");

expanses = JSON.parse(expanses);
incomes = JSON.parse(incomes);
let expansesSum = expanses.reduce((sum, el) => sum + el.amount, 0);
let incomesSum = incomes.reduce((sum, el) => sum + el.amount, 0);

if (options == "--more") {
  console.table({
    Expranses: expansesSum,
    Incomes: incomesSum,
    BALANCE: incomesSum - expansesSum,
  });
} else {
  console.table({ BALANCE: incomesSum - expansesSum });
}
