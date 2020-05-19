import express from "express";
import diaryRouter from "./routes/disaries";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log("someons pindef here");
    res.send("pong");
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});