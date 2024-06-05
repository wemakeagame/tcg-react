import express, { Request, Response } from 'express';
const app = express()
const port = 5500

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World TCG! paulo ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})