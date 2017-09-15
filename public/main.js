const getJSON = (url, callback) => {
	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);

	xhr.onload = () => {
		if (xhr.status === 200) {
			return callback(null, JSON.parse(xhr.responseText));
		}

		return callback(new Error(`Request failed: ${xhr.statusText}`));
	};

	xhr.onabort = () => callback(new Error('There was a network error.')); // Fake error
	xhr.onerror = () => callback(new Error('There was a network error.'));

	xhr.send();

	// 20% error chance :p
	if (Math.floor(Math.random() * 5) === 0) {
		xhr.abort();
	}
};

const renderError = (el, msg = 'FML!') => (el.textContent = msg);

const renderUsers = (el, users) => {
	const html = `
		<ol class="userlist">
			${users.map(u => `
				<li class="userlist__item">
					<a href="/users/${u.id}" class="userlist__link"><img class="avatar" src="${u.avatar}" alt="${u.name}" />${u.name} - ${u.job}</a>
					<div class="userlist__body"></div>
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
					<a class="transactionlist__link" href="/transactions/${t.id}">transaction: ${t.id}</a> -
					<a class="transactionlist__link" href="/products/${t.productId}">product: ${t.productId}</a> <b>TODO: product details</b>
				</dd>`).join('')}
			<dt>Total $</dt>
			<dd class="transactionlist_amount"><b>TODO: transaction amount</b></dd>
		</dl>
	`;

	el.innerHTML = html;
};

// IIFE to kick it all off
(() => {
	const container = document.getElementById('users');

	getJSON('/users', (err, users) => {
		if (err) {
			return renderError(container, 'Cannot retrieve users!');
		}

		return renderUsers(container, users);
	});

	container.addEventListener('click', (e) => {
		const { target, target: { href = null } } = e;

		if (target.classList.contains('userlist__link')) {
			e.preventDefault();

			const body = target.closest('li').querySelector('.userlist__body');
			const list = body.querySelector('.transactionlist');

			if (href && !list) {
				getJSON(`${href}/transactions`, (err, transactions) => {
					if (err) {
						return renderError(body, 'Transaction unavailable!');
					}

					return renderTransactions(body, transactions);
				});
			} else {
				list.remove();
			}
		}
	});
})();
