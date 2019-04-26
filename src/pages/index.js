import React from 'react'; 
import { Link } from 'gatsby'; 

import Layout from '../components/layout'; 
import Head from '../components/head'; 


const IndexPage = () => {


	return (
		<Layout>
			<Head title="Home" />
			<h1>Hello.</h1>
			<p>I'm Kristy. A front-end developer, living in Oklahoma City.</p>

			<p>Need a developer? <Link to="/contact">Contact Me.</Link></p>
		</Layout>
	)
}; 

export default IndexPage; 