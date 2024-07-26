import view from './view';
import icons from 'url:../../img/icons.svg'; //parcel 2

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');
  addHndlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const btnGoto = +btn.dataset.goto;
      //temp
      handler(btnGoto);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return ` <button data-goto='${
        curPage + 1
      }'  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //other page
    if (curPage < numPages) {
      return `<button data-goto='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
           <button data-goto='${
             curPage + 1
           }'  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // page 1 , no other pages
    return '';
  }
}
/*<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button> */
export default new paginationView();
