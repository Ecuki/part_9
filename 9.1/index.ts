import express from 'express';
import { calculateBmi, parseArgument } from './bmiCalculator';
import bodyParser from 'body-parser';
import { calculateExercises, parseArgs } from './exerciseCalculator';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
    res.send("pong");
});
app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});
app.get('/bmi', (req, res) => {
    if (req.query.height && req.query.weight) {
        const qHeight = req.query.height.toString();
        const qWeight = req.query.weight.toString();
        try {
            const { height, mass } = parseArgument([qHeight, qWeight]);
            const response = calculateBmi(height, mass);
            res.send({
                height, mass,
                bmi: response
            });
        } catch (e) {
            res.status(400).send({
                error: e.message
            });
        }
    }

    res.status(400).send({
        error: "malformatted parameters"
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises: dailyExercises, target: reqTarget } = req.body;
    console.log([reqTarget, ...dailyExercises]);
    try {
        const { target, days } = parseArgs([reqTarget, ...dailyExercises]);
        const response = calculateExercises(days, target);
        res.send({
            ...response
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
});



const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
