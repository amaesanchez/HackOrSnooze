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

  // not sure if currentUser.username is what's used here
  // const response = await axios.get(`${BASE_URL}/users/${currentUser.username}`,
  //   {params:{token}});

  // const userInfo = {
  //   username: response.data.user.username,
  //   name: response.data.user.name,
  //   createdAt: response.data.user.createdAt,
  //   favorites: response.data.user.favorites,
  //   stories: response.data.user.stories
  // }

  // const user = new User(userInfo, token);

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

async function toggleFavorite(evt) {
  evt.preventDefault();
  console.log("evt.target", evt.target);
  // currentUser.add()

}

$allStoriesList.on("click", "button", toggleFavorite);
