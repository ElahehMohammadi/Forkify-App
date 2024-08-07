import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js';
// import { search } from 'core-js/fn/symbol';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmark: [],
};

//not pure function
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //temp
    console.error(`!!!!${err}!!!!`);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`!!!!${err}!!!!`);
    throw err;
  }
};
export const getsearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9(slice dosend count the last one so we use 10)
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.serving;
    //new q = old q *new ser /old ser
  });

  state.recipe.serving = newServings;
};
const presistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};
export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmark.push(recipe);
  //mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmarks();
};
export const deleteBookmark = function (id) {
  //delete bookmark
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  //mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmarks();
};
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};
init();
// clearBookmarks();
