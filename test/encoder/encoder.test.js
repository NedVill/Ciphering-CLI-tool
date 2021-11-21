const { Encoder } = require("../../src/encoder/Encoder");

const realProcess = process;
const encoder = new Encoder();
const setParamsOriginal = encoder.setParams;
const mockCallback = jest.fn((arg) => {
  return arg;
});

describe("encoder Vars Tests", () => {
  it("Check default params", () => {
    expect(encoder.params).toStrictEqual([]);
    expect(encoder.encodedString).toBe("");
  });
});

describe("encoder Tests", () => {
  beforeEach(() => {
    encoder.setParams = mockCallback;
  });

  afterEach(() => {
    jest.clearAllMocks();
    encoder.setParams = setParamsOriginal;
  });

  it("Check init", () => {
    encoder.init();
    expect(encoder.setParams.mock.calls.length).toBe(1);
  });

  it("Check encode if param index is not found in Array", () => {
    encoder.encode("test");
    expect(encoder.encodedString).toBe("test");
    expect(encoder.encodedValue).toBe("test");
  });
});

describe("encoder Tests setParams", () => {
  it("Check setParams", () => {
    encoder.setParams("A1-R0");
    expect(encoder.params).toStrictEqual("A1-R0".split("-"));
  });

  it("Check encode", () => {
    encoder.params = ["A1", "R0"];
    expect(encoder.encode("test")).toBeTruthy();
    expect(encoder.encode()).toBeTruthy();
  });
});

describe("encoder Tests exit", () => {
  beforeEach(() => {
    process.exit = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    jest.clearAllMocks();
  });

  it("Check setParams if params is empty Array", () => {
    try {
      encoder.setParams();
    } catch (error) {
      expect(error).toBe(9);
    }
  });
});

describe("encoder Tests stderr.write", () => {
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

  it("Check setParams if config is empty", () => {
    try {
      encoder.setParams();
    } catch (error) {
      expect(error).toBe("Encoder: config is required as string!");
    }
  });
});
