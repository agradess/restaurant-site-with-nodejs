function handleDropdowns() {

	/* Show/hide the dropdown if the button was clicked */

	console.log("page successfully loaded");
	document.getElementById('products_btn').onclick = function() {
		console.log("dropdown click registered");
		document.getElementById('dropdown').classList.toggle('show');
	}

	/*
		If user clicks outside of dropdown, hide the dropdown
	*/

	window.onclick = function(event) {
		if (!event.target.matches('#products_btn')) {
			console.log("clicked outside of dropdown");
			console.log("don't touch that");

			let dropdowns = document.getElementsByClassName("products_content");
			let i;
			for (i = 0; i < dropdowns.length; i++) {
				let openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}
}