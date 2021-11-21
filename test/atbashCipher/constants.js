const atbashValues = {
  passedValue: "gsv hvxivg gvhg",
  error: "the secret test",
};

const atbashArguments = {
  str: "the secret test",
  num: 1,
  nul: null,
  undef: undefined,
};

const errorMessage = "Incorrect! You should to pass a string parameter";

const atbashTestStrings = {
  alphabet: {
    input: "A B C D E F G H I K L M N O P Q R S T V X Y Z",
    output: "Z Y X W V U T S R P O N M L K J I H G E C B A",
  },
  alphabetLowerCase: {
    input: "a b c d e f g h i k l m n o p q r s t v x y z",
    output: "z y x w v u t s r p o n m l k j i h g e c b a",
  },
  alphabetMixedCase: {
    input: "a B c D e F g H i K l M n O p Q r S t V x Y z",
    output: "z Y x W v U t S r P o N m L k J i H g E c B a",
  },
  alphabetWithSymbols: {
    input: 'a B c D 12 e F g H i K "" l M n O p Q ___ r S t V x Y z',
    output: 'z Y x W 12 v U t S r P "" o N m L k J ___ i H g E c B a',
  },
};

module.exports = {
  atbashValues,
  atbashArguments,
  atbashTestStrings,
  errorMessage,
};
