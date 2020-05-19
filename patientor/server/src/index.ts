import express from 'express';
import cors from 'cors';
import patientRouter from './routers/patients';
import diagnosisRouter from './routers/diagnosis';
const app = express();
app.use(cors());
app.use(express.json());
console.log("object");
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log("Pinnging");

    res.send(
        "pong"
    );
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});