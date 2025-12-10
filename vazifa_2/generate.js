const fs = require("fs");
const path = require("path");
const fileMap = [
  {
    src: [
      { modules: ["user.js"] },
      { routes: ["user.js"] },
      { controllers: ["user.js"] },
      "server.js",
      "config.js",
    ],
  },
  ".env",
];
function create(basePath, item) {
  if (typeof item === "object" && !Array.isArray(item)) {
    const folderName = Object.keys(item)[0];
    const folderPath = path.join(basePath, folderName);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    item[folderName].forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "");
    });
    return;
  }
  if (typeof item === "string") {
    const filePath = path.join(basePath, item);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "");
  }
}
function createStructure(basePath, map) {
  map.forEach((entry) => {
    if (typeof entry === "object" && !Array.isArray(entry)) {
      Object.keys(entry).forEach((folderName) => {
        const folderPath = path.join(basePath, folderName);
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
        entry[folderName].forEach((inner) => {
          create(folderPath, inner);
        });
      });
    } else {
      create(basePath, entry);
    }
  });
}
createStructure(process.cwd(), fileMap);
