import fs from "fs";

const [, , command, data, ...data1] = process.argv;

let expanses = fs.readFileSync("./database/expanses.json", "utf-8");
expanses = JSON.parse(expanses);

let commands = ["GET", "POST", "DELETE", "PUT"];

if (commands.includes(command)) {
  if (command == commands[0]) {
    console.table(expanses);
  }
  if (command == commands[1]) {
    if (data == +data) {
      expanses.push({
        expanseId: expanses.length
          ? expanses[expanses.length - 1].expanseId + 1
          : 1,
        amount: +data,
        purpose: data1,
      });
    } else {
      throw new Error("Iltimos amountga faqat son kiriting!!!");
    }
    fs.writeFileSync(
      "./database/expanses.json",
      JSON.stringify(expanses, null, 4)
    );
  }
  if (command == commands[2]) {
    expanses.forEach((element, index) => {
      if (element.expanseId == data) {
        expanses.splice(index, 1);
      }
      fs.writeFileSync(
        "./database/expanses.json",
        JSON.stringify(expanses, null, 4)
      );
    });
  }
  if (command == commands[3]) {
    expanses.forEach((element, index) => {
      if (element.expanseId == data) {
        let temp = [];
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].includes("=")) {
            temp.push(data1[i].split("="));
          } else {
            temp.push(data1[i]);
          }
          if (+temp[0][temp[0].length - 1]) {
            element.amount = +temp[0][temp[0].length - 1];
            for (let i = 1; i < temp.length; i++) {
              if (typeof temp[i] == "object") {
                element.purpose = [temp[i][temp[i].length - 1]];
              } else if (typeof temp[i] != "object") {
                element.purpose.push(temp[i]);
              }
            }
          } else if (!+temp[0][temp[0].length - 1]) {
            if (typeof temp[i] == "object") {
              element.purpose = [temp[i][temp[i].length - 1]];
            } else if (typeof temp[i] != "object") {
              element.purpose.push(temp[i]);
            }
          }
        }
      }
      fs.writeFileSync(
        "./database/expanses.json",
        JSON.stringify(expanses, null, 4)
      );
    });
  }
}
