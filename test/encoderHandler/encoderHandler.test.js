const { EncoderHandler } = require("../../src/encoderHandler/EncoderHandler");
const realProcess = process;

describe("EncoderHandler Vars Tests", () => {
  const encoderHandler = new EncoderHandler();

  it("Check default params", () => {
    expect(typeof encoderHandler.encoder).toBe("object");
    expect(encoderHandler.pattern).toBe("");
    expect(encoderHandler.string).toBe("");
  });
});

describe("EncoderHandler mocks Tests", () => {
  const encoderHandler = new EncoderHandler();
  const originalValidate = encoderHandler.validate;
  const originalSetString = encoderHandler.setString;
  const originalRunEncode = encoderHandler.runEncode;

  beforeEach(() => {
    encoderHandler.setString = jest.fn((arg) => {
      return arg;
    });
    encoderHandler.runEncode = jest.fn((arg) => {
      return arg;
    });
    encoderHandler.validate = jest.fn((arg) => {
      return arg;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    encoderHandler.setString = originalSetString;
    encoderHandler.runEncode = originalRunEncode;
    encoderHandler.validate = originalValidate;
  });

  it("Check encode", () => {
    encoderHandler.encode("test");
    expect(encoderHandler.setString.mock.calls[0][0]).toBe("test");
    expect(encoderHandler.setString.mock.results[0].value).toBe("test");
    expect(encoderHandler.setString.mock.calls.length).toBe(1);
    expect(encoderHandler.runEncode.mock.calls.length).toBe(1);
  });

  it("Check init", () => {
    encoderHandler.init("A1-R0");
    expect(encoderHandler.validate.mock.calls.length).toBe(1);
  });
});

describe("EncoderHandler Tests", () => {
  const encoderHandler = new EncoderHandler();

  it("Check setString", () => {
    encoderHandler.setString("test");
    expect(encoderHandler.string).toBe("test");
  });

  it("Check validate", () => {
    encoderHandler.pattern = "C1-R0";
    expect(encoderHandler.validate()).toBeTruthy();
  });

  it("Check outputValue", () => {
    expect(encoderHandler.outputValue).toBe("");
  });
});

describe("EncoderHandler runEncode inside mock Tests", () => {
  const encoderHandler = new EncoderHandler();
  const originalSetStringInit = encoderHandler.encoder.init;
  const originalSetStringEncode = encoderHandler.encoder.encode;

  beforeEach(() => {
    encoderHandler.encoder.init = jest.fn((arg) => {
      return arg;
    });
    encoderHandler.encoder.encode = jest.fn((arg) => {
      return arg;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    encoderHandler.encoder.init = originalSetStringInit;
    encoderHandler.encoder.encode = originalSetStringEncode;
  });

  it("Check runEncode", () => {
    encoderHandler.pattern = "C1-R0";
    encoderHandler.string = "test";
    encoderHandler.runEncode();
    expect(encoderHandler.encoder.init.mock.calls.length).toBe(1);
    expect(encoderHandler.encoder.init.mock.calls[0][0]).toBe("C1-R0");
    expect(encoderHandler.encoder.encode.mock.calls.length).toBe(1);
    expect(encoderHandler.encoder.encode.mock.calls[0][0]).toBe("test");
  });
});

describe("EncoderHandler exit", () => {
  const encoderHandler = new EncoderHandler();

  beforeEach(() => {
    process.exit = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    jest.clearAllMocks();
  });

  it("check encode without a string parameter", () => {
    try {
      encoderHandler.encode();
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("check init without a pattern parameter", () => {
    try {
      encoderHandler.init();
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("check validate with incorrect pattern", () => {
    encoderHandler.pattern = "C2-R2";
    try {
      encoderHandler.validate();
    } catch (error) {
      expect(error).toBe(9);
    }
  });
});

describe("EncoderHandler stderr.write", () => {
  const encoderHandler = new EncoderHandler();

  beforeEach(() => {
    process.stderr.write = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.stderr.write = realProcess.stderr.write;
    jest.clearAllMocks();
  });

  it("check encode without a string parameter", () => {
    try {
      encoderHandler.encode();
    } catch (error) {
      expect(error).toBe(
        "EncoderHandler encode: the parameter 'string' is required as string"
      );
    }
  });

  it("check init without a pattern parameter", () => {
    try {
      encoderHandler.init();
    } catch (error) {
      expect(error).toBe(
        "EncoderHandler encode: the parameter 'pattern' is required as string"
      );
    }
  });

  it("check validate with incorrect pattern", () => {
    encoderHandler.pattern = "C2-R2";
    try {
      encoderHandler.validate();
    } catch (error) {
      const isTrue = error.includes("Incorrect parameter value of config:");
      expect(isTrue).toBeTruthy();
    }
  });
});
