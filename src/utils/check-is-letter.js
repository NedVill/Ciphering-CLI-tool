const checkIsLetter = (char) => {
  const charOne = char.toLowerCase().charCodeAt();
  const charTwo = char.toUpperCase().charCodeAt();

  if (charOne === charTwo) {
    return false;
  }

  return true;
};

module.exports.checkIsLetter = checkIsLetter;
