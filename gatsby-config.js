module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-typescript',
            options: {},
        },
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.ts',
                omitGoogleFont: true,
            },
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Rubik', 'sans-serif'],
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
    ],
};
