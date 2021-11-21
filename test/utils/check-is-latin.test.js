const { checkIsLatin } = require("../../src/utils/check-is-latin");

describe("checkIsLatin Tests", () => {
  it("Check return true", () => {
    expect(checkIsLatin("a")).toBeTruthy();
    expect(checkIsLatin("b")).toBeTruthy();
  });

  it("Check return false", () => {
    expect(checkIsLatin("1")).toBeFalsy();
    expect(checkIsLatin("ф")).toBeFalsy();
    expect(checkIsLatin("!")).toBeFalsy();
    expect(checkIsLatin(" ")).toBeFalsy();
  });
});
