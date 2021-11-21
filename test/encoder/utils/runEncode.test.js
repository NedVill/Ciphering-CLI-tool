const { runEncode } = require("../../../src/encoder/utils/runEncode");
const realProcess = process;

describe("runEncode Tests", () => {
  it("Check return correct values", () => {
    expect(runEncode({ method: "C", mode: 1, string: "test" })).toBe("uftu");
    expect(runEncode({ method: "A", mode: 0, string: "test" })).toBe("gvhg");
    expect(runEncode({ method: "A", mode: 1, string: "test" })).toBe("gvhg");
    expect(runEncode({ method: "R", mode: 0, string: "test" })).toBe("lwkl");
    expect(runEncode({ method: "R", mode: 1, string: "test" })).toBe("bmab");
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

  it("Check runEncode if parameter 'method' is not correct", () => {
    try {
      runEncode({ method: 1, mode: 1, string: "test" });
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("Check runEncode if parameter 'mode' is not correct", () => {
    try {
      runEncode({ method: "C", mode: 2, string: "test" });
    } catch (error) {
      expect(error).toBe(9);
    }

    try {
      runEncode({ method: "C", mode: "test", string: "test" });
    } catch (error) {
      expect(error).toBe(9);
    }

    try {
      runEncode({ method: "C", string: "test" });
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("Check runEncode if parameter 'string' is not correct", () => {
    try {
      runEncode({ method: "C", mode: 2 });
    } catch (error) {
      expect(error).toBe(9);
    }

    try {
      runEncode({ method: "C", mode: "test" });
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

  it("Check runEncode if parameter 'method' is not correct", () => {
    try {
      runEncode({ method: 1, mode: 1, string: "test" });
    } catch (error) {
      expect(error).toBe("runEncode: method is required as string!");
    }
  });

  it("Check runEncode if parameter 'mode' is not correct", () => {
    try {
      runEncode({ method: "C", mode: 2, string: "test" });
    } catch (error) {
      expect(error).toBe(
        "runEncode: mode is required as number in range 0 - 1!"
      );
    }

    try {
      runEncode({ method: "C", mode: "test", string: "test" });
    } catch (error) {
      expect(error).toBe(
        "runEncode: mode is required as number in range 0 - 1!"
      );
    }

    try {
      runEncode({ method: "C", string: "test" });
    } catch (error) {
      expect(error).toBe("runEncode: mode is required!");
    }
  });

  it("Check runEncode if parameter 'string' is not correct", () => {
    try {
      runEncode({ method: "C", mode: 2 });
    } catch (error) {
      expect(error).toBe("runEncode: string is required as string!");
    }

    try {
      runEncode({ method: "C", mode: "test" });
    } catch (error) {
      expect(error).toBe("runEncode: string is required as string!");
    }
  });
});
