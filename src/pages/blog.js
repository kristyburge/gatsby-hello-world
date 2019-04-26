import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import Head from '../components/head'; 
import blogStyles from './blog.module.scss'; 

const BlogPage = () => {
	// // MARKDOWN QUERY
 	//    const data = useStaticQuery(graphql `
	// 		query {
	// 		  allMarkdownRemark {
	// 				edges {
	// 			      node {
	// 			        frontmatter {
	// 			          title
	// 			          date
	// 			        }
	// 			        fields {
	// 			        	slug
	// 			        }
	// 			      }
	// 		    	}
	// 		  	}
	// 		}
	// 	`);

    // CONTENTFUL QUERY
    const data = useStaticQuery(graphql`
		query {
		  allContentfulBlogPost (
		    sort: {
		      fields:publishedDate,
		      order:DESC
		    }
		  ){
		    edges {
		      node {
		        title
		        slug
		        publishedDate(formatString:"MMMM Do, YYYY")
		      }
		    }
		  }
		  
		}
    `);

    // console.log(data);

    return (
        <Layout>
        	<Head title="Blog" />
        	<h1>Blog</h1>
        	<ol className={blogStyles.posts}>
				
				{data.allContentfulBlogPost.edges.map( (edge) => {
					return (
						<li className={blogStyles.edge}>
							<h2>
								<Link to={`/blog/${edge.node.slug}`}>
									{edge.node.title}
								</Link>
							</h2>
							<p>Posted on {edge.node.publishedDate}</p>
						</li>
					)		
				})} 
				
			</ol>
		</Layout>
    )
};

export default BlogPage;