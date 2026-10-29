/**
 * If CORS problems appear, we may need to add headers:
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 */

import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { getJSON, pokemonProcessor, twoPokemonProcessor } from "./helpers.ts";

const app: Express = express();

app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

// load a pokemon
async function loadPokemon(req: Request, res: Response) {
  const name = req.query.name;

  if (!name) {
    res.status(422).send("Missing Pokemon name");
    return;
  }

  try{
    const data = await getJSON(name as string)
    res.send(pokemonProcessor(data))
  }
  catch(error) {
    res.send((error as Error).message);
  }

}

// load two pokemon
async function loadTwoPokemon(req: Request, res: Response) {
    res.send(await twoPokemonProcessor())
}

app.get("/pokemon", loadPokemon);
app.get("/2pokemon", loadTwoPokemon)
app.listen(3000);
