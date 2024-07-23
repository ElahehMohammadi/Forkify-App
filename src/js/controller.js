import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
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
    console.log(model.state.search);
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};
controlSearchResults();
const init = function () {
  recipeView.addHendlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
