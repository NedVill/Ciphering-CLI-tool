const { caesarCipher } = require("../../src/_common/caesarCipher/caesarCipher");

describe("Ceasar tests", () => {
  it("argument is not object", () => {
    try {
      caesarCipher();
    } catch (e) {
      expect(e.message).toBe("you need enter an object of params");
    }
  });

  it("param don't have a 'string'", () => {
    try {
      caesarCipher({ mode: "encode" });
    } catch (e) {
      expect(e.message).toBe("you need to enter a string value");
    }
  });

  it("param don't have a 'mode'", () => {
    try {
      caesarCipher({ string: "test" });
    } catch (e) {
      expect(e.message).toBe("you need to enter a mode");
    }
  });

  it("param don't have a 'mode' with correct flag", () => {
    try {
      caesarCipher({ mode: "test", string: "test" });
    } catch (e) {
      expect(e.message).toBe(
        "you need to enter a mode with params: 'encode' or 'decode'"
      );
    }
  });

  it("params is not string", () => {
    try {
      caesarCipher({ mode: "encode", string: 2 });
    } catch (e) {
      expect(e.message).toBe("you need to enter params with type - string");
    }
  });

  it("return correct value with mode: encode", () => {
    expect(caesarCipher({ mode: "encode", string: "test 123 ой ой" })).toBe(
      "whvw 123 ой ой"
    );
  });

  it("return correct value with mode: decode", () => {
    expect(caesarCipher({ mode: "decode", string: "test 123 ой ой" })).toBe(
      "qbpq 123 ой ой"
    );
  });
});
