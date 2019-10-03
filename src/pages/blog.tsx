import { graphql, Link } from 'gatsby';
import React, { FunctionComponent } from 'react';

interface IProps {
    data: {
        allMarkdownRemark: {
            totalCount: number;
            edges: Array<{
                node: {
                    id: string;
                    frontmatter: { title: string; date: string };
                    fields: { slug: string };
                    excerpt: string;
                };
            }>;
        };
    };
}

const BlogPage: FunctionComponent<IProps> = ({ data }) => {
    return (
        <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
                <div key={node.id}>
                    <Link to={node.fields.slug}>
                        <h3>
                            {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
                        </h3>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`;

export default BlogPage;
