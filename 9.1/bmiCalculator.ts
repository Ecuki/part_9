
interface Category {
    description: string;
    min: number;
    max: number;
}
interface BMIValues {
    height: number;
    mass: number;

}

const parseArgument = (args: Array<string>): BMIValues => {

    if (args.length < 2) throw new Error("Not enought arguments");
    if (args.length > 2) throw new Error("To many argmuments");
    if (Number(args[0]) === 0 || Number(args[1]) === 0) {
        throw new Error('Provided values can not be 0!');
    } else if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
        return {
            height: Number(args[0]),
            mass: Number(args[1]),

        };
    } else {
        throw new Error('Provided values have to be numbers! bmi <height-in-cm> <mass-in-kg>');
    }
};

const calculateBmi = (height: number, mass: number): string => {

    const categories: Array<Category> = [{
        description: "Very severely underweight", min: 0, max: 15
    },
    { description: "Severely underweight", min: 15, max: 16 },
    { description: "Underweight", min: 16, max: 18.5 },
    { description: "Normal(healthy weight)", min: 18.5, max: 25 },
    { description: "Overweight", min: 25, max: 30 },
    { description: "Obese Class I(Moderately obese)", min: 30, max: 35 },
    { description: "Obese Class II(Severely obese)", min: 35, max: 40 },
    { description: "Obese Class III(Very severely obese)", min: 40, max: 9999 },
    ];
    const heightMeters: number = height / 100;
    const BMI: number = mass / (heightMeters * heightMeters);
    const description = categories.find(category => (BMI >= category.min && BMI < category.max))?.description;
    if (!description) {
        throw new Error('Something went wrong');
    }
    return description;
};



export { calculateBmi, parseArgument };

