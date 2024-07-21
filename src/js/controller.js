import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // loading recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);
    const { recipe } = model.state;

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
    //`!!!!!!${err}!!!!!!`
  }
};
const init = function () {
  recipeView.addHendlerRender(controlRecipes);
};
init();
