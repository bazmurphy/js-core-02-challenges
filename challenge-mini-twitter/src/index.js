function populateTweets() {
  tweets.forEach(element => {
    // CREATE TWEET SECTION ONE
    const tweetSectionOne = document.createElement("div");
    tweetSectionOne.classList.add("tweet-section-one");

    const tweetSectionOneOne = document.createElement("div");
    tweetSectionOneOne.classList.add("tweet-section-one-one");

    const tweetSectionOneTwo = document.createElement("div");
    tweetSectionOneTwo.classList.add("tweet-section-one-two");

    const tweetProfilePhoto = document.createElement("img");
    tweetProfilePhoto.classList.add("tweet-profile-photo");
    tweetProfilePhoto.src = element.profilePhoto;

    const tweetNamesContainer = document.createElement("div");
    tweetNamesContainer.classList.add("tweet-names-container");

    const tweetNameContainer = document.createElement("div");
    tweetNameContainer.classList.add("tweet-name-container");

    const tweetName = document.createElement("span");
    tweetName.classList.add("tweet-name")
    tweetName.textContent = element.name;

    const tweetVerified = document.createElement("img");
    tweetVerified.classList.add("tweet-verified");
    tweetVerified.src = "twitter-verified.png";

    tweetNameContainer.appendChild(tweetName);
    tweetNameContainer.appendChild(tweetVerified);

    const tweetUsername = document.createElement("span");
    tweetUsername.classList.add("tweet-username");
    tweetUsername.textContent = element.username;

    tweetNamesContainer.appendChild(tweetNameContainer);
    tweetNamesContainer.appendChild(tweetUsername);

    tweetSectionOneOne.appendChild(tweetProfilePhoto);
    tweetSectionOneOne.appendChild(tweetNamesContainer);

    const twitterLogo = document.createElement("img");
    twitterLogo.classList.add("twitter-logo");
    twitterLogo.src = "twitter-logo.png";

    tweetSectionOneTwo.appendChild(twitterLogo);

    tweetSectionOne.appendChild(tweetSectionOneOne);
    tweetSectionOne.appendChild(tweetSectionOneTwo);

    // CREATE TWEET SECTION TWO
    const tweetSectionTwo = document.createElement("div");
    tweetSectionTwo.classList.add("tweet-section-two");

    const tweetContents = document.createElement("p");
    tweetContents.classList.add("tweet-contents");
    // tweetContents.textContent = element.tweet;

    // convert any Twitter Handles in the tweet string to <a> tags
    tweetContents.innerHTML = convertTwitterHandlesToLinks(element.tweet);   
    // ^ I do not want to use innerHTML here... what other way is there to do this?

    tweetSectionTwo.appendChild(tweetContents);

    // CREATE TWEET SECTION THREE
    const tweetSectionThree = document.createElement("div");
    tweetSectionThree.classList.add("tweet-section-three");

    const tweetTime = document.createElement("span");
    tweetTime.classList.add("tweet-time");
    tweetTime.textContent = element.time;

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.textContent = "·";

    const tweetDate = document.createElement("span");
    tweetDate.classList.add("tweet-date");
    tweetDate.textContent = element.date;

    tweetSectionThree.appendChild(tweetTime);
    tweetSectionThree.appendChild(dot);
    tweetSectionThree.appendChild(tweetDate);

    // CREATE TWEET SECTION FOUR
    const tweetSectionFour = document.createElement("div");
    tweetSectionFour.classList.add("tweet-section-four");

    // const replyLink = document.createElement("a");
    // replyLink.className = "tweet-reply-link"
    // replyLink.href = "#";

    const replyIcon = document.createElement("i");
    replyIcon.className = "fa-regular fa-comment";

    // replyLink.appendChild(replyIcon);

    const retweetIcon = document.createElement("i");
    retweetIcon.classList.add("fa-solid","fa-retweet");

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fa-regular","fa-heart");

    const shareIcon = document.createElement("i");
    shareIcon.classList.add("fa-solid", "fa-arrow-up-from-bracket");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("tweet-delete-icon","fa-solid","fa-trash-can")
    
    // add an eventListener for Deleting the Tweet
    deleteIcon.addEventListener("click", deleteTweet);

    tweetSectionFour.appendChild(replyIcon);
    tweetSectionFour.appendChild(retweetIcon);
    tweetSectionFour.appendChild(likeIcon);
    tweetSectionFour.appendChild(shareIcon);
    tweetSectionFour.appendChild(deleteIcon);

    // APPEND EVERYTHING TO THE INDIVIDUAL TWEET-CONTAINER
    const tweetContainer = document.createElement("div");
    tweetContainer.classList.add("tweet-container");
    // give the container a custom html attribute, pre-fixed with data- as per convention
    tweetContainer["data-id"] = element.id;

    tweetContainer.appendChild(tweetSectionOne);
    tweetContainer.appendChild(tweetSectionTwo);
    tweetContainer.appendChild(tweetSectionThree);
    tweetContainer.appendChild(tweetSectionFour);

    // APPENDING THE INDIVIDUAL TWEET TO THE ALL-TWEETS-CONTAINER
    document.getElementById("all-tweets-container").appendChild(tweetContainer);
  })
}


function addTweet() {
  // check the length of the tweet is between 1 and 280 characters
  if (tweetFormTextarea.value.length > 0 && tweetFormTextarea.value.length <= 280) {
    // create a new date object
    const dateObject = new Date();
    
    function convertHoursToTwelveHourWithLeadingZeros(hours) {
      if (hours > 12) {
        hours = hours - 12;
        if (hours < 10) {
          return `0${hours}`
        } else {
          return hours;
        }
      } else if (hours >= 10) {
        return hours;
      } else if (hours < 10) {
        return `0${hours}`;
      }
    }

    // then set all the various values with it
    const hours = convertHoursToTwelveHourWithLeadingZeros(dateObject.getHours());
    const minutes = dateObject.getMinutes() > 10 ? dateObject.getMinutes() : `0${dateObject.getMinutes()}`;
    const amOrPm = dateObject.getHours() < 12 ? "AM" : "PM"
    const time = `${hours}:${minutes} ${amOrPm}`;

    const day = dateObject.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    const date = `${month} ${day}, ${year}`
   
    // push the new tweet to the ""database"" (the tweets array)
    tweets.push(
      {
        id: tweets.length,
        name: "Baz",
        username: "@bazmurphy",
        profilePhoto: "profilephoto.jpg",
        tweet: tweetFormTextarea.value,
        time: time,
        date: date,
      }
    );
      
    // cleanup validation feedback
    tweetValidationFeedback.textContent = "";

    // remove all tweets
    clearAllTweets();
    // repopulate the tweets
    populateTweets();
  }
}


function deleteTweet(event) {
  // filter the tweets array to remove the array element whose id matches that of the custom "data-id" html attribute held by the parent node
  tweets = tweets.filter(element => element.id !== event.target.parentNode.parentNode["data-id"]);
  // remove all tweets
  clearAllTweets();
  // repopulate the tweets
  populateTweets();
}


function clearAllTweets() {
  // while there exists a lastElementChild keep removing it until there are none
  while (allTweetsContainer.lastElementChild) {
    allTweetsContainer.removeChild(allTweetsContainer.lastElementChild);
  };
}


function validateTweet(event) {
  tweetValidationFeedback.textContent = `Characters Used: ${event.target.value.length}`
  // provide visual feedback on the length of characters in the tweet

  // if the length is 0, reset all the classes, so the placeholder remains default colour
  if (event.target.value.length === 0) {
    tweetValidationFeedback.classList.remove("tweet-validation-true");
    tweetValidationFeedback.classList.remove("tweet-validation-false");
    tweetValidationFeedback.textContent = "";
    // if the length is within range, make the text green
  } else if (event.target.value.length <= 280 ) {
    tweetValidationFeedback.classList.remove("tweet-validation-false");
    tweetValidationFeedback.classList.add("tweet-validation-true");
    // if the length is above range, make the text red
  } else if (event.target.value.length > 280) {
    tweetValidationFeedback.classList.remove("tweet-validation-true");
    tweetValidationFeedback.classList.add("tweet-validation-false");
  }
}


function convertTwitterHandlesToLinks(tweet) {
  // https://stackoverflow.com/questions/8650007/regular-expression-for-twitter-username Answer Number 2
  // ^ found a regex which fulfills all the requirements/restrictions of Twitter Handles
  const regex = /(^|[^@\w])@(\w{1,15})\b/g;
  const replace = '$1<a href="http://twitter.com/$2" target="_blank">@$2</a>';
  return tweet.replace(regex, replace);
}


let tweets = [
  {
    id: 0,
    name: "Baz",
    username: "@bazmurphy",
    profilePhoto: "profilephoto.jpg",
    tweet: "Hello this is my first Tweet 🤩 Can we see how it looks across multiple lines? Hmmm, looks okay right?",
    time: "07:30 AM",
    date: "Sep 19, 2022",
  },
  {
    id: 1,
    name: "Baz",
    username: "@bazmurphy",
    profilePhoto: "profilephoto.jpg",
    tweet: "The whole page is written in JavaScript 😎 no HTML! Go look at the index.html file 🤓 Styling this page took a long time!! 😢 I wrote the structure and CSS from scratch! And tried to match Twitter 🙃",
    time: "08:30 AM",
    date: "Sep 20, 2022",
  },
  {
    id: 2,
    name: "Baz",
    username: "@bazmurphy",
    profilePhoto: "profilephoto.jpg",
    tweet: "testing the 280 character limit... one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twentyone twentytwo twentythree twentyfour twentyfive twentysix twentyseven twentyeight twentynine thirty thirtyo",
    time: "10:30 AM",
    date: "Sep 21, 2022",
  },
  {
    id: 3,
    name: "Baz",
    username: "@bazmurphy",
    profilePhoto: "profilephoto.jpg",
    tweet: "testing the conversion of twitter handles from basic string to elements upon render @codeyourfuture @freecodecamp @theodinproject @scrimba",
    time: "11:30 AM",
    date: "Sep 21, 2022",
  },
]


// CREATE THE NEW TWEET FORM
const tweetFormContainer = document.createElement("div");
tweetFormContainer.classList.add("tweet-form-container");

const tweetForm = document.createElement("form");
tweetForm.id = "tweet-form";

const tweetFormTextarea = document.createElement("textarea");
tweetFormTextarea.id = "tweet-form-textarea";
tweetFormTextarea.required = true;
tweetFormTextarea.placeholder = "Write your tweet here...";
tweetFormTextarea.addEventListener("input", validateTweet);

const tweetValidationFeedback = document.createElement("div");
tweetValidationFeedback.id = "tweet-validation-feedback";

const tweetFormButton = document.createElement("button");
tweetFormButton.id = "tweet-form-button";
tweetFormButton.type = "button";
tweetFormButton.textContent = "Tweet";
tweetFormButton.addEventListener("click", addTweet);

tweetForm.appendChild(tweetFormTextarea);
tweetForm.appendChild(tweetValidationFeedback);
tweetForm.appendChild(tweetFormButton);

tweetFormContainer.appendChild(tweetForm);

// CREATE THE ALL-TWEETS-CONTAINER
const allTweetsContainer = document.createElement("div");
allTweetsContainer.id = "all-tweets-container";

// CREATE THE APP CONTAINER
const appContainer = document.createElement("div");
appContainer.id = "app-container";

appContainer.appendChild(tweetFormContainer);
appContainer.appendChild(allTweetsContainer);

// APPEND APP CONTAINER TO BODY
document.body.appendChild(appContainer);

populateTweets();


// LAYOUT OF THE PAGE IN HTML BUT WRITTEN IN JAVASCRIPT
//
// <div id="app-container">
//  
//   <div class="tweet-form-container">
//
//     <form id="tweet-form">
//       <textarea name="tweet" id="tweet-form-textarea" required></textarea>
//       <div id="tweet-validation-feedback"></div>
//       <button type="button" id="tweet-form-button">Tweet</button>
//     </form>
//
//   </div>
//
//   <div id="all-tweets-container">
//
//     <div class="tweet-container">
//
//       <div class="tweet-section-one">
//         <div class="tweet-section-one-one">
//           <img class="tweet-profile-photo" src="profilephoto.png" alt="profile image">
//           <div class="tweet-names-container">
//             <div class="tweet-name-container">
//               <span class="tweet-name"></span>
//               <img src="tweet-verified" alt="verified logo">
//             </div>
//           </div>
//         </div>
//         <div class="tweet-section-one-two">
//           <span class="tweet-username"></span>
//         </div>
//       </div>
//       <img class="twiter-logo" alt="twitter logo">
//     </div>
//
//     <div class="tweet-section-two">
//       <p class="tweet-contents"></p>
//     </div>
//
//     <div class="tweet-section-three">
//       <span class="tweet-time"></span>
//       <span class="tweet-date"></span>
//     </div>
//
//     <div class="tweet-section-four">
//       <i class="">
//       <i class="">
//       <i class="">
//       <i class="">
//     </div>
//
//   </div>
//
// </div>