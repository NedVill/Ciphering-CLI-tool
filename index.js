const { argv } = process;
const { CipheringCLITool } = require("./src/CipheringCLITool/cipheringCLITool");

const app = new CipheringCLITool();
app.init(argv);
