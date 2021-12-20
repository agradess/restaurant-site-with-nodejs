window.onload = function() {

	async function getFormData() {

		document.getElementById('order_button').addEventListener('click', async () => {
			
			/* Sending order data to the server */
			const name = document.getElementById('name').value;
			const items = document.getElementById('items').value;
			const type = document.getElementById('type').value;
			const pay = document.getElementById('pay').value;
			const time = Date.now();

			console.log("Getting form data...");
			const order = { name, time, items, type, pay }
			const data = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(order)
			};
			const response = await fetch('/api', data);
			const r_json = await response.json();
			console.log(r_json);

			/* Printing order summary */
			const summary = document.createElement('div');
			const o_name = document.createElement('p');
			const o_time = document.createElement('p');
			const o_items = document.createElement('p');
			const o_type = document.createElement('p');
			const o_pay = document.createElement('p');
			const o_wait = document.createElement('p');

			waittime = (Math.ceil((Math.random() * 10)) + 15).toString();
			o_name.textContent = `Order Summary: Name: ${r_json.name}`;
			o_time.textContent = new Date(r_json.time).toLocaleString();
			o_items.textContent = r_json.items;
			o_type.textContent = `For ${r_json.type}`;
			o_pay.textContent = `Paid with ${r_json.pay}`;
			o_wait.textContent = `Your approximate wait time is ${waittime} minutes.`;
			
			summary.append(o_name, o_time, o_items, o_type, o_pay, o_wait);
			document.getElementById('menu').append(summary);
		});
	}

	handleDropdowns();
	getFormData();

	// Tried to add a 'Sorry your order was rejected' message
	// but I got some karma

	// window.onclick = function(e) {
	// 	form = document.getElementsByTagName('form')[0];
		
	// 	if (e.target.matches('#order_button')) {
	// 		console.log('button clicked');
	// 		const oopsie = document.createElement('p');
	// 		oopsie.textContent = 'Sorry, your order was rejected.';
	// 		form.append(oopsie);
	// 	} else {
	// 		if (!document.lastElementChild.matches('#order_button')) {
	// 			console.log('removing last element');
	// 			document.removeChild(form.lastElementChild);
	// 		}
			
	// 	}
	// }
}
