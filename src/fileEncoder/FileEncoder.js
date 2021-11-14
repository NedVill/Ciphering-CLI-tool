const { stderr, stdout, stdin } = process;
const fs = require("fs");
const { EncoderHandler } = require("../encoderHandler/EncoderHandler");

class FileEncoder {
  encoderHandler = EncoderHandler.getInstance();

  inputFile;

  outputFile;

  runEncode() {
    if (!this.outputFile && !this.inputFile) {
      stdout.write("Enter input text!\n");
      stdin.on("data", (data) => {
        this.encoderHandler.encode(data.toString());
        stdout.write(
          `Encode is complited: ${this.encoderHandler.outputValue}\n`
        );
        stdout.write("Enter input text!\n");
      });
    }

    if (!this.inputFile && this.outputFile) {
      stdout.write("Enter input text!\n");
      stdin.on("data", (data) => {
        this.encoderHandler.encode(data.toString());
        this.outputFile.write(`${this.encoderHandler.outputValue}\n`);
        stdout.write("Output file is changed!\n");
        stdout.write("Enter input text!\n");
      });
    }

    if (!this.outputFile && this.inputFile) {
      this.inputFile.on("data", (data) => {
        this.encoderHandler.encode(data.toString());
        stdout.write(
          `'Encode is complited: ${this.encoderHandler.outputValue}`
        );
        process.exit();
      });
    }

    if (this.outputFile && this.inputFile) {
      this.inputFile.on("data", (data) => {
        this.encoderHandler.encode(data.toString());
        this.outputFile.end(`${this.encoderHandler.outputValue}\n`);
        stdout.write("Output file is changed!");
        process.exit();
      });
    }
  }

  setInputFile(path) {
    if (!fs.existsSync(path)) {
      stderr.write(`Input file is wrong!`);
      process.exit();
    }

    this.inputFile = fs.createReadStream(path);
  }

  setOutputfile(path) {
    if (!fs.existsSync(path)) {
      stderr.write(`Output file is wrong!`);
      process.exit();
    }

    this.outputFile = fs.createWriteStream(path, { flags: "a" });
  }
}

module.exports.FileEncoder = FileEncoder;
