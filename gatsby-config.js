module.exports = {
    plugins: [
        { resolve: 'gatsby-plugin-sass' },
        {
            resolve: 'gatsby-plugin-typescript',
            options: {},
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Rubik'],
                },
            },
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
        {
            resolve: 'gatsby-plugin-react-helmet',
        },
        {
            resolve: 'gatsby-plugin-emoji-favicon',
            options: {
                emoji: '🦄',
            },
        },
    ],
};
