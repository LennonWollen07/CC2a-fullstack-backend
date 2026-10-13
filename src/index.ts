/**
 * If CORS problems appear, we may need to add headers:
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 */

import express, { type Express, type Request, type Response } from "express";
import { getJSON, homeProcesser } from "./helpers.ts";

const app: Express = express();

app.use(express.static('public'));

function helloRequest(req: Request, res: Response) {
  console.log(req.query);
  res.send(`Hello ${req.query.name}`);
}

app.get("/", helloRequest);

async function loadPokemon(req: Request, res: Response) {
  const name = req.query.name;

  if (!name) {
    res.status(422).send("Missing Pokemon name");
    return;
  }

  try{
    const data = await getJSON(name as string)
    res.send(homeProcesser(data))
  }
  catch(error) {
    res.send((error as Error).message);
  }
}

app.get("/pokemon", loadPokemon);

app.listen(3000);
