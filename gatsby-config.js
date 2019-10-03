module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-typescript',
            options: {},
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                commonmark: true,
                footnotes: true,
                pedantic: true,
                gfm: true,
                plugins: [],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src`,
                name: 'src',
            },
        },
    ],
};
