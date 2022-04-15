export module Handlers {
  const fs = require("fs");
  function isOperator(charachter) {
    return ["*", "/", "+", "-"].indexOf(charachter) > -1;
  }
  export function calculate(expression) {
    let currentExp = expression;

    if (isOperator(currentExp.charAt(0))) {
      return "please enter valid details";
    }
    const expressionArray = getNumbersAndOperator(currentExp);
    if (expressionArray === null) {
      return "please enter valid details";
    }
    let firstNum = expressionArray[0];
    let secondNum = expressionArray[1];
    let operator = expressionArray[2];
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
  function getNumbersAndOperator(expression) {
    let currentExp = expression;
    let firstNum = "";
    let secondNum = "";
    let operator = "";
    let i = 0;
    while (i < expression.length && !isOperator(expression.charAt(i))) {
      firstNum = firstNum.concat(currentExp.charAt(i));
      i++;
    }
    if (i == expression.length) return null;
    operator = expression[i];
    i++;
    while (i < expression.length && !isOperator(expression.charAt(i))) {
      secondNum = secondNum.concat(expression.charAt(i));
      i++;
    }
    if (
      i !== expression.length ||
      firstNum == "" ||
      secondNum == "" ||
      operator == ""
    ) {
      return null;
    }
    return [firstNum, secondNum, operator];
  }
  export function readFile() {
    let data = fs.readFileSync("./data.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      return data;
    });
    console.log(data);
    return data;
  }

  export function replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
  export function reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
  }
}
