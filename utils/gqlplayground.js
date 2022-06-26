import { GraphQLClient, gql } from 'graphql-request';
import 'dotenv/config';

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
  console.log(process.env.API_URL);
const client = new GraphQLClient(process.env.API_URL)

const data = await client.request(query, {
  limit: 5,
})

console.log(data); 
