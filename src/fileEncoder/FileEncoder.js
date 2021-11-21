const { stderr, stdout, stdin } = process;
const { Transform, pipeline } = require("stream");
const fs = require("fs");
const { EncoderHandler } = require("../encoderHandler/EncoderHandler");

class FileEncoder {
  constructor() {
    this.setTransformStream();
  }

  encoderHandler = EncoderHandler.getInstance();

  inputFile;

  outputFile;

  transform;

  getEncodedValue(value) {
    this.encoderHandler.encode(value);
    return this.encoderHandler.outputValue;
  }

  runPipeline(stream, destination) {
    pipeline(stream, this.transform, destination, (err) => {
      if (err) {
        console.error("Encode filed.", err);
      } else {
        console.log("Encode succeeded.");
      }
    });
  }

  runEncode() {
    if (!this.outputFile && !this.inputFile) {
      stdout.write("Enter input text!\n");
      this.runPipeline(stdin, stdout);
    }

    if (!this.inputFile && this.outputFile) {
      stdout.write("Enter input text !\n");
      this.runPipeline(stdin, this.outputFile);
    }

    if (!this.outputFile && this.inputFile) {
      stdout.write(`Reading from "${this.inputFile.path}" ... \n`);
      this.runPipeline(this.inputFile, stdout);
    }

    if (this.outputFile && this.inputFile) {
      this.runPipeline(this.inputFile, this.outputFile);
    }
  }

  setInputFile(path) {
    if (!fs.existsSync(path)) {
      stderr.write(`Input file is wrong!`);
      process.exit(9);
    }

    this.inputFile = fs.createReadStream(path);
  }

  setOutputfile(path) {
    if (!fs.existsSync(path)) {
      stderr.write(`Output file is wrong!`);
      process.exit(9);
    }

    this.outputFile = fs.createWriteStream(path, { flags: "a" });
  }

  setTransformStream() {
    const encodeMethod = this.getEncodedValue.bind(this);
    this.transform = new Transform({
      transform(chunk, enc, callBack) {
        const stringOfChunk = chunk.toString().trim();
        callBack(null, encodeMethod(stringOfChunk) + "\n");
      },
    });
  }
}

module.exports.FileEncoder = FileEncoder;
