import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // loading recipe
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
    //`!!!!!!${err}!!!!!!`
  }
};
const controlSearchResults = async function () {
  try {
    //1)get query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    //2)load search results
    await model.loadSearchResults(query);

    //3)render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getsearchResultsPage());
    //4) render initial pagination and buttons

    // /// SUB SECTION not sure
    // resultsView.ActiveLink(model.state.search);
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};
const controlPagination = function (gotoPage) {
  //3)render new results
  resultsView.render(model.getsearchResultsPage(gotoPage));
  //4) render new pagination and buttons
  paginationView.render(model.state.search);
};
//temp (so you dont have to search every time...)
controlSearchResults();
const init = function () {
  recipeView.addHendlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHndlerClick(controlPagination);
};
init();
