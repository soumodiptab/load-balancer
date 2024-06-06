import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('API2!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});