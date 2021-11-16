const { argv } = process;
const { CipheringCLITool } = require("./src/cipheringCLITool/cipheringCLITool");

const app = new CipheringCLITool();
app.init(argv);
