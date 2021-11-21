const { CipheringTool } = require("../../src/CipheringTool/CipheringTool");

const realProcess = process;
const mockCallback = jest.fn((arg) => {
  return arg;
});

describe("CipheringTool Vars Tests", () => {
  const cipheringTool = new CipheringTool();

  it("Check default params", () => {
    expect(cipheringTool.arguments).toStrictEqual([]);
    expect(typeof cipheringTool.argumentsValidator).toBe("object");
    expect(typeof cipheringTool.encoderHandler).toBe("object");
    expect(typeof cipheringTool.fileEncoder).toBe("object");
    expect(typeof cipheringTool.parametersKeysOfHandlers).toBe("object");
    expect(typeof cipheringTool.parametersKeysOfHandlers.config).toBe(
      "function"
    );
    expect(typeof cipheringTool.parametersKeysOfHandlers.input).toBe(
      "function"
    );
    expect(typeof cipheringTool.parametersKeysOfHandlers.output).toBe(
      "function"
    );
  });
});

describe("CipheringTool Tests", () => {
  const cipheringTool = new CipheringTool();

  beforeEach(() => {
    cipheringTool.argumentsValidator.init = mockCallback;
    cipheringTool.encoderHandler.init = mockCallback;
    cipheringTool.fileEncoder.setInputFile = mockCallback;
    cipheringTool.fileEncoder.setOutputfile = mockCallback;
    cipheringTool.fileEncoder.runEncode = mockCallback;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check handleCrypt", () => {
    cipheringTool.handleCrypt("test");
    expect(cipheringTool.encoderHandler.init.mock.calls[0][0]).toBe("test");
    expect(cipheringTool.encoderHandler.init.mock.results[0].value).toBe(
      "test"
    );
  });

  it("check handleOutputFile", () => {
    cipheringTool.handleOutputFile("test");
    expect(cipheringTool.fileEncoder.setOutputfile.mock.calls[0][0]).toBe(
      "test"
    );
    expect(cipheringTool.fileEncoder.setOutputfile.mock.results[0].value).toBe(
      "test"
    );
  });

  it("Check handleOutputFile without parameter", () => {
    cipheringTool.handleOutputFile();
    expect(cipheringTool.fileEncoder.setOutputfile.mock.calls.length).toBe(0);
  });

  it("Check runEncode", () => {
    cipheringTool.runEncode();
    expect(cipheringTool.fileEncoder.runEncode.mock.calls.length).toBe(1);
  });

  it("Check handleInputFile", () => {
    cipheringTool.handleInputFile("test");
    expect(cipheringTool.fileEncoder.setInputFile.mock.calls[0][0]).toBe(
      "test"
    );
    expect(cipheringTool.fileEncoder.setInputFile.mock.results[0].value).toBe(
      "test"
    );
  });

  it("Check handleInputFile without parameter", () => {
    cipheringTool.handleInputFile();
    expect(cipheringTool.fileEncoder.setInputFile.mock.calls.length).toBe(0);
  });
});

describe("CipheringTool exit", () => {
  const cipheringTool = new CipheringTool();

  beforeEach(() => {
    process.exit = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    jest.clearAllMocks();
  });

  it("check setArguments without parameters", () => {
    try {
      cipheringTool.setArguments();
    } catch (error) {
      expect(error).toBe(9);
    }
  });
});

describe("CipheringTool setArguments", () => {
  const cipheringTool = new CipheringTool();

  beforeEach(() => {
    process.stderr.write = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    process.stderr.write = realProcess.stderr.write;
    jest.clearAllMocks();
  });

  it("check setArguments", () => {
    cipheringTool.setArguments([0, 1, 2, 3]);
    expect(cipheringTool.arguments).toStrictEqual([2, 3]);
  });

  it("check setArguments without parameters", () => {
    try {
      cipheringTool.setArguments();
    } catch (error) {
      expect(error).toBe("Incorrect parameter: you should to set an Array");
    }
  });
});

describe("CipheringTool init", () => {
  const cipheringTool = new CipheringTool();

  beforeEach(() => {
    cipheringTool.argumentsValidator.init = jest.fn();
    cipheringTool.setArguments = jest.fn();
    cipheringTool.handleArguments = jest.fn();
    cipheringTool.runEncode = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("call argumentsValidator.init", () => {
    cipheringTool.init();
    expect(cipheringTool.argumentsValidator.init.mock.calls.length).toBe(1);
    expect(cipheringTool.setArguments.mock.calls.length).toBe(1);
    expect(cipheringTool.handleArguments.mock.calls.length).toBe(1);
    expect(cipheringTool.runEncode.mock.calls.length).toBe(1);
  });
});

describe("CipheringTool handleArguments", () => {
  const cipheringTool = new CipheringTool();

  beforeEach(() => {
    cipheringTool.parametersKeysOfHandlers.config = jest.fn((param) => param);
    cipheringTool.parametersKeysOfHandlers.input = jest.fn((param) => param);
    cipheringTool.parametersKeysOfHandlers.output = jest.fn((param) => param);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cipheringTool.arguments = [];
  });

  it("call", () => {
    cipheringTool.setArguments([
      "a",
      "b",
      "-c",
      "A1-R0",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ]);

    cipheringTool.handleArguments();

    expect(
      cipheringTool.parametersKeysOfHandlers.config.mock.calls.length
    ).toBe(1);

    expect(
      cipheringTool.parametersKeysOfHandlers.config.mock.calls[0][0]
    ).toStrictEqual("A1-R0");

    expect(cipheringTool.parametersKeysOfHandlers.input.mock.calls.length).toBe(
      1
    );

    expect(cipheringTool.parametersKeysOfHandlers.input.mock.calls[0][0]).toBe(
      "./input.txt"
    );

    expect(
      cipheringTool.parametersKeysOfHandlers.output.mock.calls.length
    ).toBe(1);

    expect(cipheringTool.parametersKeysOfHandlers.output.mock.calls[0][0]).toBe(
      "./output.txt"
    );
  });

  it("call", () => {
    cipheringTool.setArguments(["a", "b", "-c", "A1-R0"]);

    cipheringTool.handleArguments();

    expect(
      cipheringTool.parametersKeysOfHandlers.config.mock.calls.length
    ).toBe(1);

    expect(
      cipheringTool.parametersKeysOfHandlers.config.mock.calls[0][0]
    ).toStrictEqual("A1-R0");

    expect(cipheringTool.parametersKeysOfHandlers.input.mock.calls.length).toBe(
      1
    );

    expect(
      cipheringTool.parametersKeysOfHandlers.input.mock.calls[0][0]
    ).toBe();

    expect(
      cipheringTool.parametersKeysOfHandlers.output.mock.calls.length
    ).toBe(1);

    expect(
      cipheringTool.parametersKeysOfHandlers.output.mock.calls[0][0]
    ).toBe();
  });
});
