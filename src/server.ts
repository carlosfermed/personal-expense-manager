import { app } from "./app";

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});
