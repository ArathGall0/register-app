import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(express.json()); // for parsing application/json

app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Add validation logic here
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Mock database logic
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  const exists = users.find((user: any) => user.username === username);
  if (exists) {
    return res.status(409).send('User already exists');
  }

  users.push({ username, password }); // you should never store passwords in plain text in production
  fs.writeFileSync(usersFilePath, JSON.stringify(users));

  res.status(201).send('User registered');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
