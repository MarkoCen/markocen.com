const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `blogs` });
        actions.createNodeField({
            node,
            name: `slug`,
            value: `blog${slug}`,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        actions.createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.tsx`),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};
