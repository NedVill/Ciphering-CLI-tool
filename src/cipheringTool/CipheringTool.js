const { EncoderHandler } = require("../encoderHandler/EncoderHandler");
const {
  ArgumentsValidator,
} = require("../argumentsValidator/ArgumentsValidator");
const { FileEncoder } = require("../fileEncoder/FileEncoder");
const { nameOfparameters } = require("../constants/constants");

class CipheringTool {
  arguments = [];

  argumentsValidator = new ArgumentsValidator();

  encoderHandler = EncoderHandler.getInstance();

  fileEncoder = new FileEncoder();

  parametersKeysOfHandlers = {
    config: this.handleCrypt.bind(this),
    input: this.handleInputFile.bind(this),
    output: this.handleOutputFile.bind(this),
  };

  handleArguments() {
    for (const parameter in this.parametersKeysOfHandlers) {
      let argumentIndex = -1;

      nameOfparameters[parameter].some((subNames) => {
        if (this.arguments.indexOf(subNames) !== -1) {
          argumentIndex = this.arguments.indexOf(subNames);
          return true;
        }

        return false;
      });

      if (argumentIndex === -1) {
        this.parametersKeysOfHandlers[parameter]();
        continue;
      }

      this.parametersKeysOfHandlers[parameter](
        this.arguments[argumentIndex + 1]
      );
    }
  }

  handleCrypt(pattern) {
    this.encoderHandler.init(pattern);
  }

  handleInputFile(inputFile) {
    if (!inputFile) {
      return;
    }

    this.fileEncoder.setInputFile(inputFile);
  }

  handleOutputFile(outputFile) {
    if (!outputFile) {
      return;
    }

    this.fileEncoder.setOutputfile(outputFile);
  }

  init(args) {
    this.setArguments(args);
    this.argumentsValidator.init(this.arguments);
    this.handleArguments();
    this.runEncode();
  }

  runEncode() {
    this.fileEncoder.runEncode();
  }

  setArguments(args) {
    this.arguments = args.slice(2);
  }
}

module.exports.CipheringTool = CipheringTool;
