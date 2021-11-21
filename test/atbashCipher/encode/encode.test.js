const { atbashTestStrings, atbashArguments } = require("../constants");
const { encode } = require("../../../src/_common/atbashCipher/utils/encode");

describe("Atbash Encoder Tests", () => {
  it("argument is not array", () => {
    expect(encode(atbashArguments.num)).toBe("");
    expect(encode(atbashArguments.nul)).toBe("");
    expect(encode()).toBe("");
  });

  it("return correct values", () => {
    expect(encode(atbashTestStrings.alphabet.input.split(""))).toBe(
      atbashTestStrings.alphabet.output
    );
    expect(encode(atbashTestStrings.alphabetLowerCase.input.split(""))).toBe(
      atbashTestStrings.alphabetLowerCase.output
    );
    expect(encode(atbashTestStrings.alphabetMixedCase.input.split(""))).toBe(
      atbashTestStrings.alphabetMixedCase.output
    );
    expect(encode(atbashTestStrings.alphabetWithSymbols.input.split(""))).toBe(
      atbashTestStrings.alphabetWithSymbols.output
    );
  });
});
