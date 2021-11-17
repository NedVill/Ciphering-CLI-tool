const { argv } = process;
const { CipheringTool } = require("./src/CipheringTool/CipheringTool");

const app = new CipheringTool();
app.init(argv);
