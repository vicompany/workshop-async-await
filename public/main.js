const getJSON = (url, callback) => {
	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);

	xhr.onload = () => {
		if (xhr.status === 200) {
			return callback(null, JSON.parse(xhr.responseText));
		}

		return callback(new Error(`Request failed: ${xhr.statusText}`));
	};

	xhr.onabort = () => callback(new Error(`Request failed: ${xhr.statusText}`)); // Fake error

	xhr.send();

	// 20% error chance :p
	if (Math.floor(Math.random() * 5) === 0) {
		xhr.abort();
	}
};

const renderError = (el, msg = 'Oops!') => (el.textContent = msg);

const renderUsers = (el, users) => {
	const html = `
		<ol class="userlist">
			${users.map(u => `
				<li class="userlist__item">
					<a href="/users/${u.id}" class="userlist__link">
						<img class="avatar" src="${u.avatar}" alt="${u.name}" />${u.name} - ${u.job}
					</a>
					<div class="userlist__transactions"></div>
				</li>`).join('')}
		</ol>
	`;

	el.innerHTML = html;
};

const renderTransactions = (el, transactions) => {
	const html = `
		<dl class="transactionlist">
			<dt class="transactionlist__label">Bought</dt>
			${transactions.map(t => `
				<dd class="transactionlist__value">
					<a class="transactionlist__link" href="/transactions/${t.id}">${new Date(t.date).toLocaleDateString()}</a> -
					<a class="transactionlist__link" href="/products/${t.productId}">product: ${t.productId}</a>
					<b class="todo">TODO: product details</b>
				</dd>`).join('')}
			<dt>Total $</dt>
			<dd class="transactionlist_amount"><b class="todo">TODO: transaction amount</b></dd>
		</dl>
	`;

	el.innerHTML = html;
};

const toggleTransactions = (el) => {
	const { href } = el;
	const container = el.nextElementSibling;
	const list = container.querySelector('.transactionlist');

	if (href && !list) {
		getJSON(`${href}/transactions`, (err, transactions) => {
			if (err) {
				return renderError(container, 'Transaction unavailable!');
			}

			return renderTransactions(container, transactions);
		});
	} else {
		list.remove();
	}
};

// IIFE to kick it all off
(() => {
	const container = document.getElementById('users');

	getJSON('/users', (err, users) => {
		if (err) {
			renderError(container, 'Cannot retrieve users!');

			return;
		}

		renderUsers(container, users);

		container.addEventListener('click', (e) => {
			const userLink = e.target.closest('.userlist__link');

			if (userLink) {
				e.preventDefault();

				toggleTransactions(userLink);
			}
		});
	});
})();
