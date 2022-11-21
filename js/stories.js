"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;


/** gets story form data and prepends story to storylist
 * and stories area in DOM
 */

async function addAndShowStoryOnSubmit(evt) {
  evt.preventDefault();
  const newStory = {
    title: $("#story-title").val(),
    author: $("#story-author").val(),
    url: $("#story-url").val()
  };

  const storyIns = await storyList.addStory(currentUser, newStory);
  await currentUser.addOwnStory(storyIns);

  const $storyHTML = generateStoryMarkup(storyIns);

  $allStoriesList.prepend($storyHTML);

  $storyForm.hide();
  $storyForm.trigger("reset");
}

$storyForm.on("submit", addAndShowStoryOnSubmit);

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 * - favorite button's class is dependent on whether story is in favorites list
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let starClass = currentUser && currentUser.isFavorite(story) ? "bi-star-fill" : "bi-star";

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${currentUser ? `<i class="bi ${starClass}"></i>` : ''}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server,
 * generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** on click of favorites button,
 * change button to fill in main stories tab,
 * add story instance to favorites list in memory
 */

async function toggleFavorite(evt) {
  evt.preventDefault();
  const favoriteID = $(evt.target).parent().attr("id");

  if ($(evt.target).hasClass("bi-star")) {
    $(evt.target).removeClass("bi-star").addClass("bi-star-fill");
    const favoriteStory = await Story.getFavoriteStory(favoriteID);
    await currentUser.addFavorite(favoriteStory);

  } else {
    $(evt.target).removeClass("bi-star-fill").addClass("bi-star");
    const unFavoriteStory = await Story.getFavoriteStory(favoriteID);
    await currentUser.removeFavorite(unFavoriteStory);
  }
}

/** appends user's favorite stories to Favorites tab in DOM */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");
  $allFavoritesList.empty();

  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allFavoritesList.append($story);
  }
}

$("body").on("click", "i", toggleFavorite);



/** to add stories to mystories in memory
 * add mystories to DOM
*/

function putOwnStoriesOnPage() {
  $allOwnStoriesList.empty();

  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $allOwnStoriesList.append($story);
  }
}

//debug: does not show up on refresh
