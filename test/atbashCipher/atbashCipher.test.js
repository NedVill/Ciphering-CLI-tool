const { atbashCipher } = require("../../src/_common/atbashCipher/atbashCipher");
const { atbashValues, atbashArguments, errorMessage } = require("./constants");

describe("Atbash Tests", () => {
  it("argument is empty", () => {
    try {
      atbashCipher();
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
  });

  it("argument is string return string", () => {
    expect(atbashCipher(atbashArguments.str)).toBe(atbashValues.passedValue);
  });

  it("argument is not string", () => {
    try {
      atbashCipher(atbashArguments.num);
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
    try {
      atbashCipher(atbashArguments.nul);
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
    try {
      atbashCipher(atbashArguments.undef);
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
  });
});
