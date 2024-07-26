import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';
import bookmarksView from './Views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //update results to mark the selected recipe
    resultsView.update(model.getsearchResultsPage());
    //update bookmarks to mark the selected recipe
    bookmarksView.update(model.state.bookmark);

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
const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  //add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  // update recipe views
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmark);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHendlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHndlerClick(controlPagination);
};
init();
