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
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <button type="button" class="favorite-button btn-light">a</button>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

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

/** on click of favorites button
 * add story instance to favorites list in memory
 * and append in favorite page on DOM
 */

// TODO: figure out how to get story ins from evt
// TODO: figure out how to toggle between addFavorite() & removeFavorite()

async function toggleFavorite(evt) {
  evt.preventDefault();
  console.log("storylist.stories", storyList.stories);
  currentUser.addFavorite(storyList.stories[1])

  const $parent = $(evt.target).closest("li");
  console.log($parent);
  $allFavoritesList.append($parent);
}

$allStoriesList.on("click", "button", toggleFavorite);


/** TODO: create function to add stories to mystories in memory
 * add mystories to DOM
*/
