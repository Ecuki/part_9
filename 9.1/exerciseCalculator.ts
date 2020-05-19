// const daysExercise = [3, 0, 2, 4.5, 0, 3, 1];
interface ExercisesValues {
    days: Array<number>;
    target: number;
}


interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArgs = (args: Array<string>): ExercisesValues => {

    if (args.length < 2) throw new Error("parameters missing");
    console.log(args);
    args.map(a => {
        if (a === "undefined" || a === undefined) {
            throw new Error("parameters have to be defined");
        }
    });
    if (args.find(a => isNaN(Number(a)) || a === "undefined")) { throw new Error("parameters have to be numbers"); }

    const argsToNumber = args.map(a => Number(a));
    if (argsToNumber.find(a => a < 0)) throw new Error("parameters can not be lower than 0");
    if (argsToNumber[0] === 0) throw new Error("Target can not be equal to 0");


    return {
        days: argsToNumber.slice(1),
        target: argsToNumber[0]
    };
};

const calculateExercises = (days: Array<number>, target: number): Result => {

    const sum = days.reduce((a, b) => a + b, 0);
    const average = sum / days.length;
    let rating, ratingDescription;
    if (average > target) {
        rating = 3;
        ratingDescription = "Nice work!";
    } else if (target - average < target / 2) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "you have to work harder";
    }

    return {
        periodLength: days.length,
        trainingDays: days.filter(d => d > 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target: target,
        average,
    };
};
// try {
//     const { days, target } = parseArgs(process.argv);
//     console.log(calculateExercises(days, target));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }
export {
    calculateExercises, parseArgs
};