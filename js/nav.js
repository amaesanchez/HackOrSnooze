"use strict";

const $navSubmit = $("#nav-submit");
const $navFavorite = $("#nav-favorites");
const $navMyStories = $("#nav-my-stories")


function navMyStories(evt) {
  console.log(evt);
  evt.preventDefault();
  hidePageComponents();
  putOwnStoriesOnPage();
  $allOwnStoriesList.show();
}

$navMyStories.on("click", navMyStories);


/** on click of favorites link in navbar
 * hides page components, and shows favorites area with favorite
 * stories on page
 */

function navOnFavorites(evt) {
  console.log(evt);
  evt.preventDefault();
  hidePageComponents();
  putFavoritesOnPage();
  $allFavoritesList.show();
}

$navFavorite.on("click", navOnFavorites);

/** on click of submit link in navbar
 * hides page components and reveals new story form
 */

function navOnSubmit(evt) {
  evt.preventDefault();
  hidePageComponents();
  $storyForm.show();
  $allStoriesList.show();
}

$navSubmit.on("click", navOnSubmit);

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
