const validation = (params) => {
  if (typeof params !== "object") {
    throw new Error("you need enter an object of params");
  }

  if (!params.string) {
    throw new Error("you need to enter a string value");
  }

  if (!params.mode) {
    throw new Error("you need to enter a mode");
  }

  if (params.mode !== "encode" && params.mode !== "decode") {
    throw new Error(
      "you need to enter a mode with params: 'encode' or 'decode'"
    );
  }

  if (typeof params.mode !== "string" || typeof params.string !== "string") {
    throw new Error("you need to enter params with type - string");
  }
};

module.exports.validation = validation;
