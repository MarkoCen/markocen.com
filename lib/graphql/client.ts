import { graphql } from '@octokit/graphql';

export const graphqlClient: typeof graphql = graphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});
