import React from 'react'; 
import Layout from '../components/layout'; 
import Head from '../components/head'; 


const ContactPage = () => {
	return (
		<Layout>
			<Head title="Contact" />
			<h1>Contact</h1>
			<address>
				1234 Main Street
				<br />
				Oklahoma City, OK 73127
			</address>
			<p>Phone: 555-123-4567</p>

			<p>Find me on <a href="https://github.com/kristyburge" target="_blank" rel="noopener noreferrer">GitHub</a></p>
			<p>Connect with me <a href="https://twitter.com/kristyburge" target="_blank" rel="noopener noreferrer">@kristyburge</a> on Twitter.</p>
		</Layout>
	); 

}; 

export default ContactPage; 