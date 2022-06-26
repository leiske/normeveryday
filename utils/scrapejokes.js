import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const query = gql`query Jokes($limit: Int!, $offsetMultiplier: Int) {
    jokes(limit: $limit, offsetMultiplier: $offsetMultiplier) {
      jokes {
        id
        joke
        post {
            id
            description
            slug
        }
        __typename
      }
      hasMore
      offsetMultiplier
      __typename
    }
  }
  `
const client = new GraphQLClient(process.env.API_URL)
let jokes = [];
let hasMore = true;
let offsetMultiplier = 0;
const maxIterations = 50;
const limit = 50;
const sleepTimeMs = 30000; // 30 seconds. I want to be invisible to this guy while scraping
for (let i = 0; i < maxIterations && hasMore; i++) {
    console.log(`Requesting ${limit} jokes with offsetMultiplier: ${offsetMultiplier}`)
    const data = await client.request(query, {
        limit,
        offsetMultiplier,
    })
    hasMore = data.jokes.hasMore;
    offsetMultiplier = data.jokes.offsetMultiplier;
    jokes = [
        ...jokes,
        ...data.jokes.jokes, //intentional double. I named the query jokes
    ];
    await delay(sleepTimeMs);
}
console.log(JSON.stringify(jokes)); // just pipe it wherever you want man
