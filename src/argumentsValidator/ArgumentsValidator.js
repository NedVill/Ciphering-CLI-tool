const { stderr } = process;
const {
  parametersLong,
  requiredParameters,
} = require("../constants/constants");

class ArgumentsValidator {
  arguments = [];

  init(args) {
    this.arguments = args;
    this.validate();
  }

  validate() {
    if (this.isValidArguments) {
      stderr.write(
        `You should to enter the parameter: ${this.isValidArguments}`
      );
      process.exit(9);
    }

    if (!!this.duplicateNamingOfArgument) {
      stderr.write(
        `Found duplicate naming of argument: "${this.duplicateNamingOfArgument}"`
      );
      process.exit(9);
    }

    if (!!this.duplicateArgument) {
      stderr.write(`Found duplicate argument: "${this.duplicateArgument}"`);
      process.exit(9);
    }
  }

  get isValidArguments() {
    let emptyArgument = "";

    for (const argument in requiredParameters) {
      let notFoundShortArg = false;

      if (this.arguments.indexOf(argument) === -1) {
        notFoundShortArg = true;
      }

      if (
        notFoundShortArg &&
        this.arguments.indexOf(requiredParameters[argument]) === -1
      ) {
        emptyArgument = argument;
      }
    }

    return emptyArgument;
  }

  get duplicateArgument() {
    let findedArgument;

    this.arguments.some((argument, index) => {
      return this.arguments.some((findArgument, dependIndex) => {
        if (index !== dependIndex && argument === findArgument) {
          findedArgument = findArgument;
          return true;
        }

        return false;
      });
    });

    return findedArgument;
  }

  get duplicateNamingOfArgument() {
    let findedArgument;

    this.arguments.some((argument) => {
      return this.arguments.some((findArgument) => {
        if (parametersLong[argument] === findArgument) {
          findedArgument = findArgument;
          return true;
        }

        return false;
      });
    });

    return findedArgument;
  }
}

module.exports.ArgumentsValidator = ArgumentsValidator;
