"use strict";
exports.__esModule = true;
var serverHandlers_1 = require("./serverHandlers");
var fs = require("fs");
function createDB(data) {
    if (data.length > 0) {
        return JSON.parse(data, serverHandlers_1.Handlers.reviver);
    }
    return new Map();
}
var DB = createDB(serverHandlers_1.Handlers.readFile());
console.log("db is:" + DB);
var express = require("express");
var app = express();
app.listen(3000, function () { return console.log("listening on port 3000"); });
app.use(express.json({ limit: "1mb" }));
app.post("/api", function (req, res) {
    console.log(req.body);
    console.log(serverHandlers_1.Handlers.calculate(req.body.currentExp));
    console.log("DB IS:" + DB);
    if (!DB.has(req.body.currentExp)) {
        var str_1 = serverHandlers_1.Handlers.calculate(req.body.currentExp);
        DB.set(req.body.currentExp, str_1);
        console.log("expression in db");
        res.send({ body: str_1 });
    }
    else {
        console.log("Pulled answer FROM DB");
        res.send({ body: DB.get(req.body.currentExp) });
    }
    console.log("current db is:");
    console.log(DB);
    console.log("ENDED COMUNICATION, stores in db");
    var str = JSON.stringify(DB, serverHandlers_1.Handlers.replacer);
    fs.writeFileSync("./data.json", str, "utf-8");
    console.log(serverHandlers_1.Handlers.readFile());
});
