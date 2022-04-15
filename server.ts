import { flushSync } from "react-dom";
import { Handlers } from "./serverHandlers";

const fs = require("fs");

function createDB(data) {
  if (data.length > 0) {
    return JSON.parse(data, Handlers.reviver);
  }
  return new Map<string, string>();
}
let DB = createDB(Handlers.readFile());
console.log("db is:" + DB);

const express = require("express");
const app = express();

app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  console.log(req.body);
  console.log(Handlers.calculate(req.body.currentExp));
  console.log("DB IS:" + DB);
  if (!DB.has(req.body.currentExp)) {
    let str = Handlers.calculate(req.body.currentExp);
    DB.set(req.body.currentExp, str);
    console.log("expression in db");

    res.send({ body: str });
  } else {
    console.log("Pulled answer FROM DB");
    res.send({ body: DB.get(req.body.currentExp) });
  }
  console.log("current db is:");
  console.log(DB);
  console.log("ENDED COMUNICATION, stores in db");
  const str = JSON.stringify(DB, Handlers.replacer);
  fs.writeFileSync("./data.json", str, "utf-8");
  console.log(Handlers.readFile());
});
