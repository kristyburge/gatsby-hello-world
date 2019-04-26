// Used to create dynamic pages
const path = require('path'); 

// REQUIRED FOR MARKDOWN, but WE NO LONGER NEED WHEN USING CONTENTFUL SINCE WE CREATED SLUG IN THERE
// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions
//   // Transform the new node here and create a new node or
//   // create a new node field.

//   if (node.internal.type === 'MarkdownRemark') {
//   	const slug = path.basename(node.fileAbsolutePath, '.md');


//   	createNodeField({
// 	  node,
// 	  name: 'slug',
// 	  value: slug
// 	}); 

// // The field value is now accessible at node.fields.slug
  
//     // check to make sure it works 
//   	// console.log('@@@@@@@@@@@@@@@@@@@', slug); 
//   	// pretty print the node
//   	// console.log(JSON.stringify(node, undefined, 4)); 
//   }

  
// }

module.exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions; 

	// 1. get path to template
	// 2. get markdown data / contentful data 
	// 	// query {
		//  	allMarkdownRemark {
		// 	  	edges {
		// 	      node {
		// 	        fields {
		// 	          slug
		// 	        }
		// 	      }
		// 	    }
		//  	} 
		// }
	// 3. create new pages 
	
	const blogTemplate = path.resolve('./src/templates/blog.js'); 

	const res = await graphql(`
		query {
			allContentfulBlogPost {
				edges {
					node {
						slug
					}
				}
			}
		}
	`); 

	res.data.allContentfulBlogPost.edges.forEach( (edge) => {
		createPage({
			component: blogTemplate,
			path: `/blog/${edge.node.slug}`,
			context: {
				slug: edge.node.slug
			}
		});
	}); 
};