import { ImagePost, ImagePostDetail } from '../../../models/image-post';
import { graphqlClient } from '../client';

const parseIssueComment = (commentText: string): { thumbnail: string } => {
  const regex = /\[thumbnail\]{.+}\[thumbnail\]/im;
  const match = commentText.match(regex);
  const result = { thumbnail: '' };
  if (match && match[1]) {
    result.thumbnail = match[1].trim();
  }
  return result;
};

export const getImagePostBatch = async (
  cursor?: string,
): Promise<{
  cursor?: string;
  posts: ImagePost[];
}> => {
  const imagePostLabelName = 'ziran';
  const orderBy = '{field: CREATED_AT, direction: DESC}';
  const batchCount = 100;
  const baseQuery = `first: ${batchCount}, labels: "${imagePostLabelName}", orderBy: ${orderBy}`;
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
              comments(first: 1) {
                edges {
                  node {
                    bodyText
                  }
                }
              }
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
      thumbnail: parseIssueComment((edge.node.comments.edges || [])[0]?.node.bodyText).thumbnail,
    })),
  };
};

export const getAllImagePosts = async (): Promise<ImagePost[]> => {
  let posts: ImagePost[] = [];
  let cursor = '';

  const res = await getImagePostBatch();

  cursor = res.cursor;
  posts = [...posts, ...res.posts];

  while (cursor) {
    const { posts: nextPosts, cursor: nextCursor } = await getImagePostBatch(cursor);
    cursor = nextCursor;
    posts = [...posts, ...nextPosts];
  }

  return posts;
};

export const getImagePostDetail = async (number: number): Promise<ImagePostDetail> => {
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
          comments(first: 1) {
            edges {
              node {
                bodyText
              }
            }
          }
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
  issue.thumbnail = parseIssueComment((issue.comments.edges || [])[0]?.node.bodyText).thumbnail;

  return { ...issue };
};
