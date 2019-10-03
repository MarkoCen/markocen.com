import { graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';

interface IProps {
    data: {
        markdownRemark: {
            frontmatter: { title: string };
            html: string;
        };
    };
}

const BlogPostTemplate: FunctionComponent<IProps> = ({ data }) => {
    const { markdownRemark } = data;
    return (
        <div className='blog-post-container'>
            <div className='blog-post'>
                <h1>{markdownRemark.frontmatter.title}</h1>
                <div className='blog-post-content' dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
            </div>
        </div>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;

export default BlogPostTemplate;
