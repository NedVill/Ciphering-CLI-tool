const { argv } = process;
const { CipheringTool } = require("./src/cipheringTool/CipheringTool");

const app = new CipheringTool();
app.init(argv);
