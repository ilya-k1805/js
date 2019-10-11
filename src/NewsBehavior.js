import newsServiceModule from './NewsService';

const newsService = newsServiceModule();
const form = document.forms['newsControls'];
const newsContainer = document.querySelector('.news-container .row');
const countrySelect = form['country'];
const categorySelect = form['category'];
const sourcesSelect = form['sources'];
const searchInput = form['search'];

function loadNews() {
    newsService.topHeadlines(countrySelect.value, categorySelect.value, onGetNewsResponse);
}

function onGetNewsResponse(err, res) {
    hideLoader();

    if (!handleErrors(err, res.articles, 'Новости по вашему запросу не найдены!')) {
        return;
    }

    renderNews(res.articles);
}

function onGetSourcesResponse(err, res) {
    hideLoader();

    if (!handleErrors(err, res.sources, 'Ресурсы по вашему запросу не найдены!')) {
        return;
    }

    renderSourcesSelect(res.sources);
}

function handleErrors(err, data, dataErrMessage) {
    if (err) {
        console.warn(err);
        return false;
    }

    if (!data.length) {
        M.toast({ html: dataErrMessage });
        return false;
    }

    return true;
}

function renderNews(news) {
    clearContainer();

    let fragment = '';
    news.forEach(item => {
        const template = newsTemplate(item);
        fragment += template;
    });

    newsContainer.insertAdjacentHTML('afterbegin', fragment);
}

function renderSourcesSelect(sources) {
    let fragment = '';
    sources.forEach(item => fragment += getOptionTemplate(item.id, item.name));

    sourcesSelect.insertAdjacentHTML('beforeend', fragment);
    M.FormSelect.init(sourcesSelect);
}

function getOptionTemplate(value, content) {
    return `<option value="${value}">${content}</option>`;
}

function clearContainer() {
    newsContainer.innerHTML = '';
}

function newsTemplate({ title, urlToImage, url, description }) {
    return `
  <div class="col s12">
    <div class="card">
      <div class="card-image">
        <img src="${urlToImage}">
        <span class="card-title">${title || ''}</span>
      </div>
      <div class="card-content">
        <p>${description || ''}</p>
      </div>
      <div class="card-action">
        <a href="${url}">Read more</a>
      </div>
    </div>
  </div>
  `;
}

function showLoader() {
    const template = `
  <div class="progress">
    <div class="indeterminate"></div>
  </div>
  `;

    document.body.insertAdjacentHTML('afterbegin', template);
}

function hideLoader() {
    const loader = document.querySelector('.progress');
    if (loader) {
        loader.remove();
    }
}

export default function init() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showLoader();

        if (searchInput.value) {
            newsService.everything(searchInput.value, onGetNewsResponse);
        } else if (sourcesSelect.value !== 'all') {
            newsService.topHeadlinesBySources(sourcesSelect.value, onGetNewsResponse)
        } else {
            newsService.topHeadlines(countrySelect.value, categorySelect.value, onGetNewsResponse);
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        M.AutoInit();
        showLoader();
        loadNews();
        newsService.sources(onGetSourcesResponse);
    });
}

