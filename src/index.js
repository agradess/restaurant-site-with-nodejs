const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(8080, () => console.log("Listening at port 8080..."));
app.use(express.static('public')); // hosting static webpages
app.use(express.json({ limit: '1mb'})); // allows server to parse incoming data as json

const orders = new Datastore('orders.db'); // needs nedb
orders.loadDatabase();
const reviews = new Datastore('reviews.db');
reviews.loadDatabase();

/* Recieving and storing orders */

app.post('/api', (request, response) => {
	console.log('POST: Server recieved an order request:');
	const order = request.body;
	orders.insert(order);
	response.json(order);
});

/* Recieving and storing reviews */

app.post('/reviews', (request, response) => {
	console.log('POST: Server recieved a review:');
	const review = request.body;
	reviews.insert(review);
	response.json(review);
});

/* 
	Retrievs search queries for reviews.
	The database is first searched by name, then by description.
*/

app.post('/search_reviews', (request, response) => {
	console.log(`GET: Searching for reviews containing '${request.body.query}'...`);
	const query = request.body.query;
	/* Searching by name */
	reviews.find({name: query}, (err, revs) => {
		if (err) { console.log(err); }

		console.log("Searching by name:");
		console.log(revs);
		/* If nothing was found, search by description */
		if (revs.length > 0) {
			response.json(revs);
		} else {
			/* Grab all database entries and sort through */
			reviews.find({}, (err, database) => {
				if (err) { console.log(err); }

				const result = [];
				for (r of database) {
					if (r.desc.includes(query)) {
						result.push(r);
					}
				}

				console.log("Searching by description:");
				console.log(result);
				response.json(result);
			});
		}
	});
});

function testDatabases() {
	orders.insert({name: 'Tashi', mood: 'furious'});
	orders.find({}, (err, data) => {
		console.log(data);
	});

	reviews.insert({name: 'Biff', review: 'disgusting'});
	reviews.find({}, (err, data) => {
		console.log(data);
	});
}

		// navbar = document.getElementById('navbar');
	// navbar.addEventListener('mouseenter', () => {
	// 	navbar.setAttribute('background-color','gray');
	// });
	// navbar.addEventListener('mouseleave', () => {
	// 	navbar.setAttribute('background-color','white');
	// });

/**
 * DESIGN PLAN
 * 
 * index.html:
 * 
 * 		main page
 * 		add links for contact us and menu
 * 		all html pages have the title, navbar and sidebar and content
 * 
 * products.html
 * 
 * 		has the html for all types of products, but
 * 		depending on the link clicked, different content/products
 * 		are shown
 * 			similar mechanism to dropdown
 * 			have a bunch of products in a list with different classes
 * 			be able to filter by type or go back to all
 * 			elements have classes that can be added
 * 			only one type can be shown at a time
 * 		add links for home, products, contact us, and menu
 * 
 * menu.html
 * 
 * 		interact with menu
 * 			dropdowns for each menu section
 * 			sections go top down, once clicked on, dropdown opens up
 * 			user has to unclick section to close it
 * 		place orders
 * 			form with name, items, credit card type, submit order button
 * 			once submit button clicked, data sent to the server
 * 			when an input is clicked, the color gets darker
 * 
 * index.js
 * 		
 * 		server code (get and post requests)
 * 		hosts static webpages
 * 		holds and updates databases orders.db and reviews.db
 * 
 * home.js (currently index.js)
 * 
 * 		styling and animation for index.html
 * 		communication with server
 * 
 * products.js
 * 
 * 		make a list of snarky comments, and the website spits out a random one
 * 		make bad reviews of the restaurant with random names
 * 		handles showing and hiding products based on filter
 * 		shouldn't need any database
 * 
 * style.css
 * 
 * 		styling for all the html pages
 * 		remember to link this to all the pages
 * 
 * orders.db
 * 
 * 		keeps track of online orders in json? format
 * 		fields:
 * 			user-given: name, items, payment type 
 * 			internal: timestamp, wait time (random), price (random)
 * 
 * reviews.db
 * 
 * 		keeps track of reviews given through the menu page
 */

/* RANDOM CSS/JAVASCRIPT NOTES */

/* 
	toggle between display: none and display: initial to hide and show elements
	visibility: hidden, means the element still takes up space, toggle btwn
	hidden and visible

	display: block means the element takes up as much width as possible and
	makes a new line, and display: inline takes up as much width as needed
	and stays in the same line
*/

/*
	go to https://developer.mozilla.org/en-US/docs/Web/Events
	for more DOM events
*/

/* 
	in css, text-decoration: none, to remove lines under <a> tags
	to center elements, use
*/

