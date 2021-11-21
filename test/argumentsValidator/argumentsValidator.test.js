const {
  ArgumentsValidator,
} = require("../../src/argumentsValidator/ArgumentsValidator");

const realProcess = process;
const validator = new ArgumentsValidator();

describe("ArgumentsValidator Tests", () => {
  beforeEach(() => {
    process.stderr.write = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
    process.stderr.write = realProcess.stderr.write;
  });

  it("Check default params", () => {
    expect(validator.arguments).toStrictEqual([]);
  });

  it("Check incorrect array", () => {
    try {
      validator.init("test");
    } catch (error) {
      expect(error).toBe("You should to enter an Array parameter");
    }
  });

  it("Check duplicateArgument", () => {
    try {
      validator.init(["-c", "C1-C1-A-R0", "-c", "C0"]);
    } catch (error) {
      const isError = error.includes(
        "Error: You provided argument more than once"
      );
      expect(error).toBeTruthy();
    }
  });

  it("Check duplicateNamingOfArgument", () => {
    try {
      validator.init(["-c", "C1-C1-A-R0", "--config", "C0"]);
    } catch (error) {
      const isError = error.includes(
        "Error: Found duplicate naming of argument:"
      );
      expect(isError).toBeTruthy();
    }
  });

  it("Check isValidArguments", () => {
    try {
      validator.init(["-o"]);
    } catch (error) {
      const isError = error.includes(
        "Error: You should to enter the parameter:"
      );
      expect(isError).toBeTruthy();
    }
  });
});

describe("ArgumentsValidator exit", () => {
  beforeEach(() => {
    process.stderr.write = jest.fn((arg) => {
      return arg;
    });

    process.exit = jest.fn((arg) => {
      throw arg;
    });
  });

  afterEach(() => {
    process.exit = realProcess.exit;
  });

  it("Check incorrect array", () => {
    try {
      validator.init("test");
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("Check duplicateArgument", () => {
    try {
      validator.init(["-c", "R0-A", "-c"]);
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("Check duplicateNamingOfArgument", () => {
    try {
      validator.init(["-c", "R0-A", "--config"]);
    } catch (error) {
      expect(error).toBe(9);
    }
  });

  it("Check isValidArguments", () => {
    try {
      validator.init(["-o"]);
    } catch (error) {
      expect(error).toBe(9);
    }
  });
});
