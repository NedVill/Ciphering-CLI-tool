const { checkIsLetter } = require("../../src/utils/check-is-letter");

describe("checkIsLatin Tests", () => {
  it("Check return true", () => {
    expect(checkIsLetter("a")).toBeTruthy();
    expect(checkIsLetter("ф")).toBeTruthy();
  });

  it("Check return false", () => {
    expect(checkIsLetter("1")).toBeFalsy();
    expect(checkIsLetter("!")).toBeFalsy();
    expect(checkIsLetter(" ")).toBeFalsy();
  });
});
