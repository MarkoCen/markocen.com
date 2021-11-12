import slug from 'slug';
import { BlogPost, BlogPostDetail } from '../../models/blog-post';
import { graphqlClient } from './client';

export const getBlogPosts = async (
  cursor?: string,
): Promise<{
  cursor?: string;
  posts: BlogPost[];
}> => {
  const baseQuery = `first: 100, labels: "blog-post", orderBy: {field: CREATED_AT, direction: DESC}`;
  const query = cursor ? `after: "${cursor}", ${baseQuery}` : baseQuery;

  const { repository } = await graphqlClient(`
    {
      repository(owner: "markocen", name: "my-blog") {
        issues(${query}) {
          edges {
            cursor
            node {
              createdAt
              updatedAt
              title
              id
              number
            }
          }
        }
      }
    }
  `);

  if (!repository.issues?.edges || repository.issues.edges.length <= 0) {
    return {
      cursor: undefined,
      posts: [],
    };
  }

  return {
    cursor: repository.issues.edges[repository.issues.edges.length - 1].cursor,
    posts: repository.issues.edges.map(edge => ({
      ...edge.node,
      slug: `${slug(edge.node.title)}__${edge.node.number}`,
    })),
  };
};

export const getBlogPostDetail = async (number: number): Promise<BlogPostDetail> => {
  const { repository } = await graphqlClient(`
    {
      repository(owner: "markocen", name: "my-blog") {
        issue(number: ${number}) {
          createdAt
          updatedAt
          title
          id
          number
          body
          bodyText
          labels (first: 100) {
            edges {
              node {
                color
                id
                name
              }
            }
          }
        }
      }
    }
  `);

  const { issue } = repository;
  issue.labels = (issue.labels?.edges || []).map(edge => ({
    ...edge.node,
  }));

  issue.slug = `${slug(issue.title)}__${issue.number}`;

  return { ...issue };
};
