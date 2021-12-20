window.onload = function() {

	function updateReviews() {
		
		document.getElementById('review_btn').addEventListener('click', async () => {

			/* Sending review data to the server */
			const name = document.getElementById('name').value;
			const desc = document.getElementById('roast').value;
			const time = Date.now();

			const data = {name, desc, time};
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};

			/* Posting review and grabbing the whole database */
			const review = await fetch('/reviews', options);
			const r_json = await review.json();
			console.log(r_json);
		});
	}

	function searchReviews() {

		document.getElementById('search_reviews').addEventListener('click', async () => {

			/* Sending query data to the server */
			const query = document.getElementById('query').value;

			const data = { query };
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};

			/* Trying to retrieve data */
			const reviews = await fetch('/search_reviews', options);
			const r_json = await reviews.json();
			console.log(r_json);

			/* Creating HTML to display results */
			const results_div = document.getElementById('search_results');
			results_div.innerHTML = ""; /* note: innerHTML should be safe here
			because the site is not receiving data from the user */
			
			if (r_json.length == 0) {
				results_div.textContent = `Sorry, we could not find any reviews containing ${query}.`
			} else {
				for (r of r_json) {
					const newrev = document.createElement('div');
					const h = document.createElement('p');
					const d = document.createElement('p');
					const localT = new Date(r.time).toLocaleString();
					h.textContent = `${r.name} posted on ${localT}:`;
					d.textContent = r.desc;

					newrev.append(h, d);
					results_div.append(newrev);
				}
			}
		});
	}

	/* End of contact.html-specific functions */

	searchReviews();
	handleDropdowns();
	updateReviews();
}
