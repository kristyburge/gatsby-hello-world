module.exports = {
	siteMetadata: {
		title: 'First Gatsby Site',
		author: 'Kristy Burge',
		description: 'Demonstrating a really fast site using Gatsby'

	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass', 
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`
			}
		}, 
		'gatsby-plugin-sharp', 
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-relative-images',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 800,
							linkImagesToOriginal: false
						}
					}
				]
			}
		},
	    {
	      resolve: 'gatsby-source-contentful',
	      options: {
	        spaceId: process.env.CONTENTFUL_SPACE_ID,
	        // Learn about environment variables: https://gatsby.dev/env-vars
	        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	      },
	    },
	]
}; 