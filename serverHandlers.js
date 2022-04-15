"use strict";
exports.__esModule = true;
exports.Handlers = void 0;
var Handlers;
(function (Handlers) {
    var fs = require("fs");
    function isOperator(charachter) {
        return ["*", "/", "+", "-"].indexOf(charachter) > -1;
    }
    function calculate(expression) {
        var currentExp = expression;
        if (isOperator(currentExp.charAt(0))) {
            return "please enter valid details";
        }
        var expressionArray = getNumbersAndOperator(currentExp);
        if (expressionArray === null) {
            return "please enter valid details";
        }
        var firstNum = expressionArray[0];
        var secondNum = expressionArray[1];
        var operator = expressionArray[2];
        if (operator.localeCompare("*") == 0)
            return String(parseInt(firstNum) * parseInt(secondNum));
        if (operator.localeCompare("+") == 0)
            return String(parseInt(firstNum) + parseInt(secondNum));
        if (operator.localeCompare("-") == 0)
            return String(parseInt(firstNum) - parseInt(secondNum));
        if (operator.localeCompare("/") == 0)
            return String(parseInt(firstNum) / parseInt(secondNum));
        return "please enter valid details";
    }
    Handlers.calculate = calculate;
    function getNumbersAndOperator(expression) {
        var currentExp = expression;
        var firstNum = "";
        var secondNum = "";
        var operator = "";
        var i = 0;
        while (i < expression.length && !isOperator(expression.charAt(i))) {
            firstNum = firstNum.concat(currentExp.charAt(i));
            i++;
        }
        if (i == expression.length)
            return null;
        operator = expression[i];
        i++;
        while (i < expression.length && !isOperator(expression.charAt(i))) {
            secondNum = secondNum.concat(expression.charAt(i));
            i++;
        }
        if (i !== expression.length ||
            firstNum == "" ||
            secondNum == "" ||
            operator == "") {
            return null;
        }
        return [firstNum, secondNum, operator];
    }
    function readFile() {
        var data = fs.readFileSync("./data.json", "utf8", function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            return data;
        });
        console.log(data);
        return data;
    }
    Handlers.readFile = readFile;
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: "Map",
                value: Array.from(value.entries())
            };
        }
        else {
            return value;
        }
    }
    Handlers.replacer = replacer;
    function reviver(key, value) {
        if (typeof value === "object" && value !== null) {
            if (value.dataType === "Map") {
                return new Map(value.value);
            }
        }
        return value;
    }
    Handlers.reviver = reviver;
})(Handlers = exports.Handlers || (exports.Handlers = {}));
