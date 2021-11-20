const caesarPrams = {
  encode: [
    "t",
    "e",
    "s",
    "t",
    " ",
    "1",
    "2",
    "3",
    " ",
    "о",
    "й",
    " ",
    "о",
    "й",
  ],
  encodeUpperCase: [
    "t",
    "E",
    "s",
    "T",
    " ",
    "1",
    "2",
    "3",
    " ",
    "о",
    "й",
    " ",
    "о",
    "й",
  ],
};

const caesarValuesEncode = {
  encode: "whvw 123 ой ой",
  encodeUpperCase: "wHvW 123 ой ой",
  encodeStepFour: "xiwx 123 ой ой",
  encodeStepFive: "yjxy 123 ой ой",
  encodeStepEight: "bmab 123 ой ой",
};

const caesarValuesDecode = {
  decode: "qbpq 123 ой ой",
  decodeUpperCase: "qBpQ 123 ой ой",
  decodeStepFour: "paop 123 ой ой",
  decodeStepFive: "ozno 123 ой ой",
  decodeStepEight: "lwkl 123 ой ой",
};

module.exports = {
  caesarPrams,
  caesarValuesEncode,
  caesarValuesDecode,
};
