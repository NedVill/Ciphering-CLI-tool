const { FileEncoder } = require("../../src/fileEncoder/FileEncoder");

jest.mock("stream");

const { pipeline } = require("stream");

const pipelineMock = async () => {
  return true;
};

pipeline.mockImplementation(pipelineMock);

const realProcess = process;

describe("FileEncoder Vars Tests", () => {
  const fileEncoder = new FileEncoder();

  it("Check default params", () => {
    expect(typeof fileEncoder.encoderHandler).toBe("object");
    expect(fileEncoder.inputFile).toBeUndefined();
    expect(fileEncoder.outputFile).toBeUndefined();
    expect(typeof fileEncoder.transform).toBe("object");
  });
});

describe("fileEncoder Tests", () => {
  const fileEncoder = new FileEncoder();

  it("Check setInputFile", () => {
    fileEncoder.setInputFile("./test/filesForTests/input.txt");
    expect(typeof fileEncoder.inputFile).toBe("object");
  });

  it("Check setOutputfile", () => {
    fileEncoder.setOutputfile("./test/filesForTests/output.txt");
    expect(typeof fileEncoder.inputFile).toBe("object");
  });
});

describe("fileEncoder getEncodedValue mocks Tests", () => {
  const fileEncoder = new FileEncoder();

  beforeEach(() => {
    Object.defineProperty(fileEncoder.encoderHandler, "outputValue", {
      get: jest.fn(() => "test"),
    });
    fileEncoder.encoderHandler.encode = jest.fn((arg) => arg);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check getEncodedValue", () => {
    expect(fileEncoder.getEncodedValue("test")).toBe("test");
  });
});

describe("fileEncoder runPipeline mocks Tests", () => {
  const fileEncoder = new FileEncoder();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check runPipeline", () => {
    fileEncoder.runPipeline(
      () => "test"(),
      () => "test"()
    );
    expect(typeof pipeline.mock.calls[0][0]).toBe("function");
    expect(typeof pipeline.mock.calls[0][2]).toBe("function");
  });
});

describe("fileEncoder runEncode inside mock Tests", () => {
  const fileEncoder = new FileEncoder();

  beforeEach(() => {
    process.stdout.write = jest.fn((arg) => {
      return arg;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check runEncode !this.outputFile && !this.inputFile", () => {
    fileEncoder.runEncode();
    expect(process.stdout.write.mock.calls[0][0]).toBe("Enter input text!\n");
  });

  it("Check runEncode !this.inputFile && this.outputFile", () => {
    fileEncoder.outputFile = "test";
    fileEncoder.runEncode();
    expect(process.stdout.write.mock.calls[0][0]).toBe("Enter input text !\n");
  });

  it("Check runEncode !this.outputFile && this.inputFile", () => {
    fileEncoder.inputFile = "test";
    fileEncoder.outputFile = undefined;
    fileEncoder.runEncode();
    expect(
      process.stdout.write.mock.calls[0][0].includes("Reading from")
    ).toBeTruthy();
  });

  it("Check runEncode !this.inputFile && this.outputFile", () => {
    fileEncoder.outputFile = "test";
    fileEncoder.inputFile = "test";
    fileEncoder.runEncode();
    expect(process.stdout.write.mock.calls.length).toBe(0);
  });
});

describe("fileEncoder exit", () => {
  const fileEncoder = new FileEncoder();

  beforeEach(() => {
    process.exit = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    jest.clearAllMocks();
  });

  it("check setInputFile", () => {
    try {
      fileEncoder.setInputFile();
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("check setOutputfile", () => {
    try {
      fileEncoder.setOutputfile();
    } catch (error) {
      expect(error).toBe(9);
    }
  });
});

describe("fileEncoder stderr.write", () => {
  const fileEncoder = new FileEncoder();

  beforeEach(() => {
    process.stderr.write = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.stderr.write = realProcess.stderr.write;
    jest.clearAllMocks();
  });

  it("check setInputFile", () => {
    try {
      fileEncoder.setInputFile();
    } catch (error) {
      expect(error).toBe("Input file is wrong!");
    }

    try {
      fileEncoder.setInputFile("./files/test.txt");
    } catch (error) {
      expect(error).toBe("Input file is wrong!");
    }
  });

  it("check setOutputfile", () => {
    try {
      fileEncoder.setOutputfile();
    } catch (error) {
      expect(error).toBe("Output file is wrong!");
    }

    try {
      fileEncoder.setOutputfile("./files/test.txt");
    } catch (error) {
      expect(error).toBe("Output file is wrong!");
    }
  });
});
