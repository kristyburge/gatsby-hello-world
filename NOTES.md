# Getting Started with Gatsby

- Gatsby is a static site generator based on React, GraphQL, and Node.js. 

- a react framework for building complex websites and web applications. 

- data storage, authentication, & more... 

- Why? fast & easy to work with, build tools not required, supports plugins

- Gatsby plugins can allow data to come in from other CMS

## How to install: 
- Need Node & NPM
- Install [gastby-cli package](https://www.npmjs.com/package/gatsby-cli)

- use `gatsby new project-name starter-url` command
	- project name (this will create a new folder/directory)
	- url to [starters](https://www.gatsbyjs.org/starters/?v=2) like `https://github.com/gatsbyjs/gatsby-starter-hello-world`

- start the server `gatsby develop`
- `npm run develop` 


## Gatsby Pages
- `src/pages` - renders a component
1. `import React from 'react';` 
	* dependency of Gatsby, so we don't need to install separately .


- Create optimized links when changing pages INSIDE gatsby. If you link externally, the `<a>` is fine.
`import { Link } from 'gatsby';`
`<Link to="/contact">Contact Me.</Link>`

- Link is a React component (optimize)
- Gatsby will preload page content so the page loads instantly (no more flash of content)
	- Link takes the `to` prop

## Shared Content (like headers and footers)
- create a separate react component for each page to use and render 
- Create a compononents directory 
`src/components` 
This is where the footer and header files live
`src/components/footer.js` and `src/components/header.js`

1. IMPORT: `import Footer from '../components/footer';` 
2. USE: `<Footer />` 


## Gatsby Page Layouts 
- create a page layout component

pass in props to the layout
`{props.children}` will render the JSX inside the <Layout> tags

### Styling Gatsby Projects 
 -create a `styles/` directory inside `src/`
 - import stylesheet into the layout component (since all pages use Layout)
 - Use a plugin for Sass/SCSS -- https://www.gatsbyjs.org/plugins/

 - Create `gatsby-config.js` and use 
~~~~
 module.exports = {
 	plugins: [
		// plugins here
 	]
}; 
~~~~

* Update the import in layout to use the SCSS file

### CSS MODULES to STYLE GATSBY/REACT COMPONENTS: 
- CSS modules are supported by default; best practices for Gatsby projects 

* Inside `components/` add `components/header.scss`
* Import `import ./header.scss` inside of `header.js`

#### NOTE: 
Styles are not scoped to the header. If we change links, ALL links will change

#### How to fix?
**Old way:** target by classname (make it really unique)

**Module way:** CSS modules make all class selectors locally scoped. A CSS module contains a default export that we can call when importing. 

Pro: CSS modules are very explicit

1. rename scss/css file to `header.module.scss`
2. Fix the import statement
3. Import the module with default import
	- `import headerStyles from './header.module.scss';`
	- make sure to use the headerStyles object inside curly braces to access the className: `					<li><Link className={headerStyles.link} to="/">Home</Link></li>`
4. If you inspect the className, you will see that the CSS module has made our class name unique with the `module-name--genericClass--randChar`
5. Remember, that if you create a class in CSS/SCSS file like `nav-list`, when you use it inside of the React component, you must reference the class as `navList` or React will throw an error!
6. To set `active` links, use: 
	~~~~
	<li><Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/">Home</Link></li>
	~~~~
	- This is a feature of React. React knows when links are active using the LINK tag
	[Read more...](https://github.com/reactjs/react-router-tutorial/blob/master/lessons/05-active-links/README.md)

## GRAPHQL: Take data from another API instead of directly from the JSX
- helps us create more complex, dynamic sites.

1. Add property to the `gatsby-config.js` file. 
- [Read More...](https://www.gatsbyjs.org/tutorial/part-four/#your-first-graphql-query)
~~~~
siteMetadata: {
	title: 'Your Site Name',
	author: 'Your name' 

}
~~~~ 
2. Fetch this data using GRAPHQL API
-  `localhost:8000/___graphql`
-  this URL is ONLY available in DEV mode! 
- same idea as POSTMAN, except an interface for the GRAPHQL api
- uses an explicit schema; graphiql shows you what data you have access to

Three types of operations in graphql: 
1. queries
2. mutations
3. subscriptions

Inside gatsby, we just use queries to fetch data from external sources. 

Check out the **DOCS** when inside the GraphIQL tool. 
- We MUST be explicit and grab a particular item (you can't take the whole object, you must get the property from the object)
~~~~
query {
  site {
    siteMetadata {
			title, 
      author
    }
  }
}
~~~~


3. We must import from the Gatsby library: 
	- qraphql
	- useStaticQuery
`import { Link, graphql, useStaticQuery } from 'gatsby'; `

4. Inject the data: 
	- create a variable to store the data received from the query 
	- use a tagged template literal (graphql is a function)
	~~~~ 
	const data = useStaticQuery(graphql`
		query {
		  site {
		    siteMetadata {
			  title, 
		      author
		    }
		  }
		}
	`); 


### Alternative to GraphiQL ... Introducing the GraphQL playground
- set an environment variable. 
- Instead of inside **package.json** scripts, create a .env file that sets the environment variable with cross-browser compatibility
1. create `.env.development` file in the root.
2. Add `GATSBY_GRAPHQL_IDE=playground`
3. Run `npm install --save-dev env-cmd` 
4. Update the develop script to use the new playground: `
"develop": "env-cmd .env.development gatsby develop",`


## Retrieving Content From the File System
- Create a directory inside `src` called `posts/`
- Create Markdown files

Create "front matter": 

	---
	title: ""
	author: ""
	date: ""
	---- 

Then, write your posts in markdown

- Install a plugin (search "source")
https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=source

`npm install --save gatsby-source-filesystem`

- Inside `gatsby-config.js`
	~~~~ 
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`
			}
		}, 
	]
	~~~~

- Restart development server
- Refresh GraphQL playground 
- Check docs & we'll find two new queries: File and AllFile


#### Working with MD Files. 
- set up gatsby-source-filesystem (loads md files)
- target just md posts & parse into a react component
- set up a second plugin that will parse md files into useful data 
	`npm install --save gatsby-transformer-remark`
	- this plugin doesn't require any additional options, so just add it to the `gatsby-config.js` file under `plugins` as a string
	- Restart dev server `npm run develop` 
	- When we restart, we can check the GraphQL playground and get access to the front matter and post body from the MD files
- Now, we have access to "markdownRemark" (single posts) and "allMarkdownRemark" (list of posts) queries in GraphQL

**Example:**
~~~~ 
# Write your query or mutation here
query {
  allMarkdownRemark {
		edges {
      node {
        frontmatter {
          title
        }
        html 
        excerpt
      }
    }
  }
}
~~~~ 

Search: 'render array of objects react' to show how to complete this blog challenge
- HINT: When mapping over an array of objects, the .map() function MUST RETURN (in this case, returns JSX), so inside the callback function, we need to use return like this: 

~~~~
  return (
        <Layout>
        	<h1>Blog</h1>
        	<ol>
				{data.allMarkdownRemark.edges.map( (post) => {
					return (
						<li>
							<h2>{post.node.frontmatter.title}</h2>
							<p>{post.node.frontmatter.date}</p>
						</li>
					)		
				})} 
			</ol>
		</Layout>
    )
};
~~~~

#### RECAP: 
1. Source plugin to source content from another source
2. Use a Transformer plugin to parse that content into useful datas

## Generate Post Slugs Dynamically (02:19:00)
- create a post template
- dynamic link to the post (based on an id)

GOAL 1: Generate a slug for each post based on filename
gatsyby.md -> gatsby -> /gatsby -> /blog/gatsby 

GOAL 2: Generate the blog post page template 
- another react component 

GOAL 3: Generate a new page for each post based on the slug and post template

*Definition:* NODE 
	- a data structure for storing gatsby data

1. Create a new file in the root
`gatsby-node.js` 
 		* The *gatsby-node* config file that lets us tap into node APIs that gatsby exposes
 		* [Learn More](https://www.gatsbyjs.org/docs/node-apis/)
	 		a) *onCreateNode* - used to attach additional data to the new node
	 		b) then, use *createNodeField* to make the field available on the node.

## gatsyby-node.js
~~~~ 
const path = require('path'); 

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  // Transform the new node here and create a new node or
  // create a new node field.

  if (node.internal.type === 'MarkdownRemark') {
  	const slug = path.basename(node.fileAbsolutePath, '.md');


  	createNodeField({
	  node,
	  name: 'slug',
	  value: slug
	}); 

// The field value is now accessible at node.fields.slug
  
    // check to make sure it works 
  	// console.log('@@@@@@@@@@@@@@@@@@@', slug); 
  	// pretty print the node
  	// console.log(JSON.stringify(node, undefined, 4)); 
  }

  
}
~~~~

* check your work in GraphQL playground to make sure that this is now appearing :) 

2. Create a new directory `src/templates/`
* create a new file inside `templates` called `blog.js` where we will export a react component with the post template
~~~~
import React from 'react'; 
import Layout from '../components/layout'; 

const BlogPost = () => {

	return (
		<Layout>
			This is the blog template
		</Layout>		
	);
};

export default BlogPost; 
~~~~

3. Go back to the `gatsby-node.js` config file and use the **createPages** api
* This API dynamically creates pages for the site (https://www.gatsbyjs.org/docs/node-apis/#createPages)

-- fetch data from markdown nodes (using graphql)
-- this qraphql function uses a template string to write the query. the function returns a PROMISE
~~~~
 graphql(`
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
	`)
~~~~	
-- either chain .then() or use async/await

~~~~ 
module.exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions; 

	// 1. get path to template
	// 2. get markdown data
	// 3. create new pages 
	
	const blogTemplate = path.resolve('./src/templates/blog.js'); 

	const res = await graphql(`
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

	res.data.allMarkdownRemark.edges.forEach( (edge) => {
		createPage({
			component: blogTemplate,
			path: `/blog/${edge.node.fields.slug}`;
			context: {
				slug: edge.node.fields.slug
			}
		});
	}); 
};
~~~~ 

Inside 	`templates/blog.js`: 
~~~~
import { Link } from 'gatsby'; 
<Link to={`/blog/${post.node.fields.slug}`}>
	{post.node.frontmatter.title}
</Link>
~~~~

4. Generate a DYNAMIC GraphQL query that takes the slug and gives back the blog post data. 
- use GraphQL variables and arguments to intergrate into the blog post template
- arguments will help us to target the post that we are trying to fetch 
- target by 'fields'

####SAMPLE QUERY using ARGUMENTS: 
- if nothing is found, will return 'null'
~~~~
query {
  markdownRemark (
    fields: {
      slug: {
        eq: "react"
      }
    }
  ) {
    frontmatter {
      title
    }
  }
}
~~~~


-- Use QUERY VARIABLES in GraphQL Playground: 
(set up as JSON, the same way Gatsby will )
~~~~
{
	"slug": "react"
}
~~~~

####Revised Query Passing in variables for the argument: 
* set the variables in parens after query() 
* variable is $varName: type
* then, you can use the variable in the query arguments `markdownRemark(args){ // query }` 
~~~~
query (
  $slug:String
) {
  markdownRemark (
    fields: {
      slug: {
        eq: $slug
      }
    }
  ) {
    frontmatter {
      title
    }
  }
}
~~~~

inside the blog template, export const query = graphql` // query goes here `; 

then, we can use the query as props

~~~~ 
const BlogPost = (props) => {
	return (
		<Layout>
			<h1>{props.data.markdownRemark.frontmatter.title}</h1>
			<p>{props.data.markdownRemark.frontmatter.date}</p>
			<div dangerouslySetInnerHTML={{
				__html: props.data.markdownRemark.html 
			}}></div>
		</Layout>		
	);
};
~~~~

## Adding Images to Posts 
- must install & configure plugins 

### 3 Must-Have Plugins: 
`npm install --save gatsby-remark-images gatsby-plugin-sharp`
- helper plugin (-sharp) & (remark-images) to process images in MD 
`npm install --save gatsby-remark-relative-images`
- source images relative to the MD file

Update the `gatsby-config.js` file: 
~~~~
plugins: [
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
	}
]	
~~~~	

You can further organize the posts by creating a directory and saving the images for that post inside the directory. 
ex: posts > gatsby > gatsby.md and grass.png


## Sourcing Content from a CMS (Contentful)
- Create posts in a Contentful account
- install Contenful plugin from Gatsby 
`npm install --save gatsby-source-contentful`
- add the plugin to gatsby-config.js
// In your gatsby-config.js
~~~~
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `your_space_id`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
~~~~

Add environment variables to secure info in the .env.development file
CONTENTFUL_SPACE_ID=spaceid
CONTENTFUL_ACCESS_TOKEN=token

in gatsby-config.js
~~~~ 
plugins: [
	{
	  resolve: 'gatsby-source-contentful',
	  options: {
	    spaceId: process.env.CONTENTFUL_SPACE_ID,
	    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	  },
	},
]
~~~~

--NOW, restart dev server & check in GraphQL Playground and check for the data from contentful

- You should get your content back when running this query in the playground! 
~~~~ 
query {
  allContentfulBlogPost {
    edges {
      node {
        title
        slug
        publishedDate
      }
    }
  }
  
}
~~~~ 

### Rendering the posts from a CMS
- query from contentful (use arguments)
- sort posts
- update the date format
	- see the docs in the GraphQL playground publishedDate() can use certain tmethdos from the mob

- Render posts from Contentful instead of Markdown posts

~~~~ 
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
~~~~ 


## Render single posts from Contentful 
1. Create dynamic pages from contentful posts
2. Render that page to the blog post template

When we use a CMS, there's less configuration in the gatsby-node.js file. Here's what we're left with: 
~~~~
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
~~~~


To see ways to target what we want, look in the docs at arguments (eq, etc.)
- to get the post content (rich text), we want to get the `body { json }`

--- INSTALL an NPM package from CONTENTFUL that will convert the JSON to a set of react components (that way we don't have to figure out how to render all the differnt types like images, bold, italics, headings and more)

Library: `npm install @contentful/rich-text-react-renderer`

In the blog post template: `templates/blog.js`: 
`import { documentToReactComponents } from '@contentful/rich-text-react-renderer';`

This will parse the JSON and convert it into react components that we can render where we want to. 
IN the component that gets returned, use the package like so: 
`			{documentToReactComponents(props.data.contentfulBlogPost.body.json)}
`

###Displaying Images from Contentful (04:02:00)
In order to access IMAGES (they will not show up by default), we need to create an OPTIONS object inside templates/blog.js inside the BlogPost component. 

Second, we have to pass the options object into the 
`documentToReactComponents(props.data.contentfulBlogPost.body.json, object)`

This object will customize how certain node types show up and override how specific nodes are rendered. 

The renderNode property is an Object. 

We want to customize the type "embedded-asset-block"
The value for this is a function that returns some JSX (our image markup in this case).
The 'node' data is passed into this function as an argument
~~~~
const options = {
	renderNode: {
		"embedded-asset-block": (node) => {
			const alt = node.data.target.fields.title['en-US']; 
			const url = node.data.target.fields.file['en-US'].url; 
			return <img alt={alt} src={url} />
		}
	}
}; 
~~~~


## 404 Pages and React Helmet:
Create a new page in 'pages/' directory
`404.js`
In Development Mode, Gatsby makes sure that you see all the pages in case you didn't mean to go to 404. 

### Setting page headers
- use the react library "helmet" 
- customize head of doc like page title, etc. 
- use the gatsby plugin: `npm install --save gatsby-plugin-react-helmet react-helmet`
1. Configure the gatsby plugin in `gatsby-config.js` under "plugins"
* Create a component for the Head

Inside each page: 
* `import { Helmet } from 'react-helmet';`
* Set a title on the Head in each page and customize the title

Back inside of `components/head.js`: 
* pass that prop into the Head component and destructure { title } so we can use it in the JSX

~~~~ 
// destructure props to pull out the title
const Head = ({ title }) => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	
	`);

	return (
		<Helmet title={`${title} | ${data.site.siteMetadata.title}`} />
	)
}; 
~~~~ 


- To change the favicon, go to "static/"


## Deploy the Site with Netlify (04:25:40)
- Rename `.env.development` to `.env`
- make sure to update `package.json` scripts to use the new `.env` file
- .env file is automatically ignored by gatsby's hello-world project

- Create a Netlify account (awesome for static sites)
- connect to the github repo
- leave defaults (gatsby build and public/)
- click "advanced" to set the contentful environment variables
- note: graphql is NOT available in production, so ignore

### Updating from a CMS: 
- When Contentful is updated, we have to run the build again because Netlify only fetched the content once. 

-- go to "deploys" tab in Netlify
Click "trigger deploy" -> "clear cache and deploy site"

1. Update Contentful
2. Trigger a new build in Netlify manually
3. Refresh the site and your new content appears! 

### Updating Files / Code Changes: 
1. When any files are updated and you need to use Git to commit the changes, push the changes to GitHub. 
-- An automatic re-build will be created by Netlify and deployed
*By default, Netlify will publish any changes detected from master*


### Recap:
The ONLY time you have to manually trigger a rebuild is when the CMS has been updated.