import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scrapedJokes = JSON.parse(await fs.readFile(path.join(__dirname, 'scraped_jokes.json'), 'utf8'));
const chosenJokes = JSON.parse(await fs.readFile(path.join(__dirname, 'chosen_jokes.json'), 'utf8'));

const onlyNewJokes = scrapedJokes.filter(({ id }) => !chosenJokes.includes(id));
const todaysJoke = onlyNewJokes[Math.floor(Math.random() * onlyNewJokes.length)];

//update chosenJokes to include the newly picked joke
const { id: newJokeId } = todaysJoke;
chosenJokes.push(newJokeId);
await fs.writeFile(path.join(__dirname, 'chosen_jokes.json'), JSON.stringify(chosenJokes));

// write-out new joke for build process
await fs.writeFile(path.join(__dirname, 'todays_joke.json'), JSON.stringify(todaysJoke));
