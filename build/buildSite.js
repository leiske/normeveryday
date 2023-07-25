import Mustache from "mustache";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');

const todaysJoke = JSON.parse(await fs.readFile(path.join(__dirname, 'todays_joke.json'), 'utf8'));
const {
    joke,
    post: {
        slug,
    },
} = todaysJoke;

const view = {
    joke,
    link: `${process.env.SOURCE_BASENAME}${slug}`
}

const renderedTemplate = Mustache.render(template, view);

// await fs.writeFile(path.join(__dirname, 'dist/index.html'), renderedTemplate);

console.log(renderedTemplate)
