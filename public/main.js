import cache from './cache.js';
import { errorTpl, orgTpl, reposTpl } from './templates.js';

const API_URL = 'https://api.github.com';
const USE_CACHE = true;

const render = (el, data, tpl = errorTpl, append = false) => {
	const html = tpl(data);

	if (append) {
		return el.insertAdjacentHTML('beforeend', html);
	}

	return (el.innerHTML = html);
};

// TODO: refactor
const getJSON = (url, callback) => {
	const isError = Math.floor(Math.random() * 5) === 0;

	if (isError) {
		return callback(new Error('Extreme network error!'));
	}

	const fromCache = USE_CACHE && cache.get(url);

	if (fromCache) {
		return callback(null, fromCache);
	}

	fetch(url)
		.then((res) => {
			res.json()
				.then((json) => {
					if (USE_CACHE) {
						cache.set(url, json);
					}

					callback(null, json)
				});
		});
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
				return render(reposEl, { message: 'They took my repos. Dook err derr!' });
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
