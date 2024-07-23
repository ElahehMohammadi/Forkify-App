import view from './view';
import icons from 'url:../../img/icons.svg'; //parcel 2

class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. please try another one!';
  _message;
  _generateMarkup() {
    return this._data.map(el => this._generateMarkupPreview(el)).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
            <a class="preview__link" href="${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt=">${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
  }
}
export default new resultsView();
