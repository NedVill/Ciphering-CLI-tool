const { encode } = require("../../../src/_common/caesarCipher/utils/encode");
const { caesarPrams, caesarValuesEncode } = require("../constants");

describe("Caesar Encoder Tests", () => {
  it("argument is not array", () => {
    try {
      encode();
    } catch (e) {
      expect(e.message).toBe("you should to pass an Array param");
    }
  });

  it("return correct values", () => {
    expect(encode(caesarPrams.encode)).toBe(caesarValuesEncode.encode);
    expect(encode(caesarPrams.encodeUpperCase)).toBe(
      caesarValuesEncode.encodeUpperCase
    );
  });

  it("return correct values with different steps", () => {
    expect(encode(caesarPrams.encode, 4)).toBe(
      caesarValuesEncode.encodeStepFour
    );
    expect(encode(caesarPrams.encode, 5)).toBe(
      caesarValuesEncode.encodeStepFive
    );
    expect(encode(caesarPrams.encode, 8)).toBe(
      caesarValuesEncode.encodeStepEight
    );
  });
});
