const { argv } = process;
const { CipheringTool } = require("./src/cipheringTool/CipheringTool");

const app = new CipheringTool();
// app.init(argv);

app.init([
  "test",
  "test",
  "-c",
  "C1-C1-R0-A",
  "-i",
  "./input.txt",
  "-o",
  "./output.txt",
]);
