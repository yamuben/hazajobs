import express from 'express';
import bodyParse from 'body-parser';
import config from './config/default';

const app = express();
app.use(bodyParse.json());

app.use('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome Hazajobs',
  });
});
const { port } = config;
app.listen(port, () => process.stdout.write(`Listening on port ${port}...`));
export default app;
