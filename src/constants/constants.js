const englishAlphabetLength = 26;

const firstLetterNum = "a".charCodeAt();

const nameOfparameters = {
  config: ["-c", "--config"],
  input: ["-i", "--input"],
  output: ["-o", "--output"],
};

const requiredParameters = {
  "-c": "--config",
};

const parametersLong = {
  "-c": "--config",
  "-i": "--input",
  "-o": "--output",
};

const regexPattern = /^([CAR][01](-)|[A](-)|[CAR][01]|[A])*$/;

const latinRegex = /[A-Za-z]/;

module.exports = {
  firstLetterNum,
  englishAlphabetLength,
  nameOfparameters,
  parametersLong,
  requiredParameters,
  regexPattern,
  latinRegex,
};
