const validateRollExpr = require("../../lib/utils/validateRollExpr");
const { InvalidRollExpressionError } = require("../../lib/utils/errors");

describe("validateRollExpr", () => {
  it("throws InvalidRollExpressionError given null", () => {
    expect(() => validateRollExpr(null)).toThrow(InvalidRollExpressionError);
  });

  it("throws InvalidRollExpressionError given undefined", () => {
    expect(() => validateRollExpr(undefined)).toThrow(
      InvalidRollExpressionError
    );
  });

  it("throws InvalidRollExpressionError given non string", () => {
    expect(() => validateRollExpr(-7)).toThrow(InvalidRollExpressionError);
  });

  describe("passes validation", () => {
    it.each([
      "1",
      "+1",
      "-0",
      "d4",
      "1d8",
      "10 d12",
      "-1d6 + 4d6",
      "D2 + 1",
      "d20 + 5 + d4 - 3",
      "d20-1"
    ])("given %s", expr => {
      expect(validateRollExpr(expr)).toBe(true);
    });
  });

  describe("throws InvalidRollExpressionError", () => {
    it.each([
      "d",
      "dd8",
      "1d6d6",
      "d2 -- 1",
      "word d20 + 5",
      "d20-d",
      "d8 * 5",
      "1 + 1d"
    ])("given %s", expr => {
      expect(() => validateRollExpr(expr)).toThrow(InvalidRollExpressionError);
    });
  });
});
