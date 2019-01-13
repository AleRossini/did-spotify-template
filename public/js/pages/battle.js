import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);

//                                                                //
//  NOTES: I am well aware this code is full of repetitions.      //
//         Still trying to shrink and squeeze everything.         //
//                                                                //

const outputTemplate = ({display_name}) =>
`
    <img class="logo_sm" src="../img/logo_thin.png">
  <h2 class="self_end added_margin_side">
    Hey <b>${display_name}</b>, welcome!
  </h2>
  `


if (!access_token || (state == null || state !== storedState)) {
  window.location = "/";
} else {
  SpotifyAPI.getUserData(access_token).then(data => {
    USER_PROFILE.innerHTML = outputTemplate(data);
  });
}

//
// GET FEW ELEMENTS FROM HTML PAGE AND SET TIMEOUT
//
var firstTypedArtist = document.getElementById('firstTypedArtist');
var firstArtistImg = document.getElementById('firstArtistFigure');
var firstArtistName = document.getElementById('firstArtistName');
var secondTypedArtist = document.getElementById('secondTypedArtist');
var secondArtistImg = document.getElementById('secondArtistFigure');
var secondArtistName = document.getElementById('secondArtistName');
var firstArtistScore = document.getElementById('firstArtistScore');
var secondArtistScore = document.getElementById('secondArtistScore');
var timeout = null;

//
// GET FIRST ARTIST NAME AFTER TYPING THEN SHOW NAME AND IMAGE
//
firstTypedArtist.onkeyup = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
       var firstName = firstTypedArtist.value.toLowerCase();
       if (firstName) {
         var firstArtist = SpotifyAPI.getArtists(access_token, firstName).then(function (result) {
           firstArtistName.innerHTML = result.name;
           firstArtistName.style.border = "1px solid";
           firstArtistImg.style.backgroundImage = "url('" + result.images[0].url + "')";
         })}
         else {
           firstArtistName.innerHTML = "";
            firstArtistImg.style.backgroundImage = "none";
            firstArtistImg.style.opacity = "1";
            firstArtistName.classList.remove("rainbow");
            firstArtistName.style.border = "none";
            firstArtistScore.innerHTML = "";
            secondArtistScore.innerHTML = "";
         };
   }, 300);
}

//
// GET SECOND ARTIST NAME AFTER TYPING THEN SHOW NAME AND IMAGE
//
secondTypedArtist.onkeyup = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
       var secondName = secondTypedArtist.value.toLowerCase();
       if (secondName) {
         var secondArtist = SpotifyAPI.getArtists(access_token, secondName).then(function (result) {
         secondArtistName.innerHTML = result.name;
         secondArtistName.style.border = "1px solid";
         secondArtistImg.style.backgroundImage = "url('" + result.images[0].url + "')";
         })}
         else {
           secondArtistName.innerHTML = "";
           secondArtistName.style.border = "none";
           secondArtistImg.style.backgroundImage = "none";
           secondArtistImg.style.opacity = "1";
           secondArtistName.classList.remove("rainbow");
           firstArtistScore.innerHTML = "";
           secondArtistScore.innerHTML = "";
         };
   }, 300);
}

//
// FUNCTION FOR COMPARING THE TWO ARTISTS POPULARITY SCORE
//
 async function checkPopularity() {

   // get first artist name
   var firstName = firstTypedArtist.value.toLowerCase();
   // get second artist name
   var secondName = secondTypedArtist.value.toLowerCase();

   // get values only if something is typed
   if (firstName) {
     var firstArtist = await SpotifyAPI.getArtists(access_token, firstName);
     var firstArtistPopularity = firstArtist.popularity;
   }
   // get values only if something is typed
   if (secondName) {
     var secondArtist = await SpotifyAPI.getArtists(access_token, secondName);
     var secondArtistPopularity = secondArtist.popularity;
   }

   // compare the popularity and modify page style
   if (firstArtistPopularity > secondArtistPopularity) {
     secondArtistImg.style.opacity = "0.3";
     firstArtistName.classList.add("rainbow");
     firstArtistScore.innerHTML = "In a scale of 1 to 100, the artist's popularity is <b>" + firstArtistPopularity + "</b>"
     secondArtistScore.innerHTML = "The loser popularity is <b>" + secondArtistPopularity + "</b>"
   } else {
     secondArtistImg.style.opacity = "1";
     firstArtistName.classList.remove("rainbow");
     secondArtistScore.innerHTML = ""
     firstArtistScore.innerHTML = ""
   }
   if (secondArtistPopularity > firstArtistPopularity) {
     firstArtistImg.style.opacity = "0.3";
     secondArtistName.classList.add("rainbow");
     secondArtistScore.innerHTML = "In a scale of 1 to 100, the artist's popularity is <b>" + secondArtistPopularity + "</b>"
     firstArtistScore.innerHTML = "The loser popularity is <b>" + firstArtistPopularity + "</b>"
   } else {
     firstArtistImg.style.opacity = "1";
     secondArtistName.classList.remove("rainbow");
     secondArtistScore.innerHTML = ""
     firstArtistScore.innerHTML = ""
   }
   if (firstArtistPopularity === secondArtistPopularity) {
     secondArtistScore.innerHTML = "<b>DRAW!</b> The artists popularity is the same: <b>" + secondArtistPopularity + "</b>"
     firstArtistScore.innerHTML = "<b>DRAW!</b> The artists popularity is the same: <b>" + firstArtistPopularity + "</b>"
   }
 }

 //
 // CALLING THE POPULARITY FUNCTION WHEN PRESS THE MAIN BUTTON
 //
firstArtistName.addEventListener('click', checkPopularity);
secondArtistName.addEventListener('click', checkPopularity);
