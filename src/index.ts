import app from "./app";
import { environment } from "./environment";

const port = environment.PORT;
app.listen(port, () => {
  return console.info(`Express is listening at http://localhost:${port}`);
});