var mod = require("./serverHandlers");
test("checks operator properly", function () {
    expect(mod.isOperator("3")).toBeFalsy();
});
test("checks operator properly", function () {
    expect(mod.isOperator("*")).toBe(true);
});
test("check expression is correct", function () {
    expect(mod.calculate("*")).toBe("please enter valid details");
});
test("check expression is correct", function () {
    expect(mod.calculate("4*3")).toBe("12");
});
test("check expression is correct", function () {
    expect(mod.calculate("4/3/4")).toBe("please enter valid details");
});
test("check expression is correct", function () {
    expect(mod.calculate("3/3")).toBe("1");
});
test("check array of elements", function () {
    expect(mod.getNumbersAndOperator("*")).toBe(null);
});
test("check array of elements", function () {
    expect(mod.getNumbersAndOperator("4*3")).toEqual(["4", "3", "*"]);
});
