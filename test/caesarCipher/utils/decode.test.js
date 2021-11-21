const { decode } = require("../../../src/_common/caesarCipher/utils/decode");
const { caesarPrams, caesarValuesDecode } = require("../constants");

describe("Caesar Decoder Tests", () => {
  it("return correct values", () => {
    expect(decode(caesarPrams.encode)).toBe(caesarValuesDecode.decode);
    expect(decode(caesarPrams.encodeUpperCase)).toBe(
      caesarValuesDecode.decodeUpperCase
    );
  });

  it("return correct values with different steps", () => {
    expect(decode(caesarPrams.encode, 4)).toBe(
      caesarValuesDecode.decodeStepFour
    );
    expect(decode(caesarPrams.encode, 5)).toBe(
      caesarValuesDecode.decodeStepFive
    );
    expect(decode(caesarPrams.encode, 8)).toBe(
      caesarValuesDecode.decodeStepEight
    );
  });

  it("argument is not array", () => {
    try {
      decode();
    } catch (e) {
      expect(e.message).toBe("you should to pass an Array param");
    }
  });
});
