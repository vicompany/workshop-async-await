import { errorTpl, orgTpl, reposTpl } from './templates.js';

const API_URL = 'https://api.github.com';
const CACHE_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const render = (el, data, tpl = errorTpl, append = false) => {
	const html = tpl(data);

	if (append) {
		return el.insertAdjacentHTML('beforeend', html);
	}

	return (el.innerHTML = html);
};

// Use some client-side caching, otherwise Githubs ratelimiter will kick our asses.
const cache = {
	get(url) {
		const item = JSON.parse(localStorage.getItem(url) || false);

		if (item && item.timestamp) {
			if (Date.now() - item.timestamp > CACHE_TIMEOUT) {
				return item.response;
			}

			// Outdated
			cache.remove(url);
		}

		return item;
	},

	set(url, response) {
		const data = {
			timestamp: Date.now(),
			response,
		};

		try {
			localStorage.setItem(url, JSON.stringify(data));
		} catch (err) {
			console.error(err);
		}
	},

	remove(url) {
		localStorage.removeItem(url);
	},
};

const getJSON = (url, callback) => {
	const fromCache = cache.get(url);

	if (fromCache) {
		return callback(null, fromCache);
	}

	const xhr = new XMLHttpRequest();

	xhr.open('GET', url);

	xhr.onload = () => {
		if (xhr.status === 200) {
			cache.set(url, xhr.responseText);

			return callback(null, JSON.parse(xhr.responseText));
		}

		return callback(new Error(`Request failed: ${xhr.statusText}`));
	};

	xhr.onabort = () => callback(new Error(`Request failed: ${xhr.statusText}`)); // Use abort as fake error

	xhr.send();

	// 20% error chance :p
	if (Math.floor(Math.random() * 5) === 0) {
		xhr.abort();
	}
};

// IIFE to kick it all off
(() => {
	const main = document.querySelector('#org');

	getJSON(`${API_URL}/orgs/vicompany`, (err, org) => {
		if (err) {
			return render(main, err);
		}

		render(main, org, orgTpl);

		const { repos_url: reposUrl } = org;
		const reposEl = document.querySelector('#repos');

		getJSON(reposUrl, (err, repos) => {
			if (err) {
				render(reposEl, { message: 'They took my repos. Dook err derr!' });
			}

			console.log('repos', repos);

			render(reposEl, repos, reposTpl);
		});
	});

	// getJSON('/users', (err, users) => {
	// 	if (err) {
	// 		renderError(container, 'Cannot retrieve users!');

	// 		return;
	// 	}

	// 	renderUsers(container, users);

	// 	container.addEventListener('click', (e) => {
	// 		const link = e.target.closest('.js-load-transactions');

	// 		if (link) {
	// 			e.preventDefault();

	// 			loadTransactions(link);
	// 		}
	// 	});
	// });
})();
