interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enought arguments");
  if (args.length > 4) throw new Error("To many argmuments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const multiplcator = (a: number, b: number, text: string) => {
  console.log(text, a * b);
};


try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplcator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

