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

const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>
` <h2><img class="logo_sm" src="../img/logo_thin.png"> Hey <b>${display_name}</b>, welcome! </h2>
  <!--div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix"></dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
    </div>
  </div-->`


if (!access_token || (state == null || state !== storedState)) {
  window.location = "/";
} else {
  SpotifyAPI.getUserData(access_token).then(data => {
    USER_PROFILE.innerHTML = outputTemplate(data);
  });
  // SpotifyAPI.getSongs(access_token).then(data => {
  //   SONGS.innerHTML = outputTemplate(data);
  // });
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
var timeout = null;

//
// GET FIRST ARTIST NAME AFTER TYPING THEN SHOW NAME AND IMAGE
//
firstTypedArtist.onkeyup = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function (e) {
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
         };
   }, 500);
}

//
// GET SECOND ARTIST NAME AFTER TYPING THEN SHOW NAME AND IMAGE
//
secondTypedArtist.onkeyup = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function (e) {
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
         };
   }, 300);
}

//
// FUNCTION FOR COMPARING THE TWO ARTISTS POPULARITY SCORE
//
 async function checkPopularity() {

   // again - get first artist name
   var firstName = firstTypedArtist.value.toLowerCase();
   // again - get second artist name
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
   } else {
     secondArtistImg.style.opacity = "1";
     firstArtistName.classList.remove("rainbow");
   }
   if (secondArtistPopularity > firstArtistPopularity) {
     firstArtistImg.style.opacity = "0.3";
     secondArtistName.classList.add("rainbow");
   } else {
     firstArtistImg.style.opacity = "1";
     secondArtistName.classList.remove("rainbow");
   }
 }

 //
 // CALLING THE POPULARITY FUNCTION WHEN PRESS THE MAIN BUTTON
 //
firstArtistName.addEventListener('click', checkPopularity);
secondArtistName.addEventListener('click', checkPopularity);


//  *---- EVERYTHING FROM HERE IS A TEST TO ADD FEATURES ----* //

//
// FUNCTION FOR GETTING THE ARTISTS SONGS
//
// async function getSongsForArtist() {
//     // var songs = await SpotifyAPI.getSongs(access_token, firstArtist.id);
//     songs.tracks.forEach((song) => {
//       var list = document.createElement('li');
//       list.appendChild(document.createTextNode(song.name));
//       var input = document.createElement('input');
//       input.class = 'song';
//       input.type = "radio";
//       input.name = "song";
//       input.value = song.id;
//         // input.addEventListener('change', function prova() {
//         //   input.checked ? (checkedSong = input.value) : null;
//         // })
//       document.getElementById('firstArtistTopTracks').appendChild(list).appendChild(input);
//     })
//
//     //TRYING TO SOLVE WITH FILTER
//     // const radioButtons = document.getElementsByName("song");
//     // const button = radioButtons.filter(function(button) {
//     // return button.checked;
//     // })[0]
//
//     // TRYING TO SOLVE WITH FIND
//     var radioButtons = document.getElementsByName("song");
//     // radioButtons.addEventListener('change', (button) => { console.log(button.value)});
//     // console.log(radioButtons);
//     // radioButtons.addEventListener('change', () => {
//       const songsList = Array.from(radioButtons);
//       var checkedSong = songsList.find(button => button.checked === true);
//     // })
//
//     // CREATING A STATIC LIST
//     // var songsList = document.querySelectorAll( 'input[name=song]');
//
//     //  CREATING A LIVE/DYNAMIC LIST
//     // var radioButtons = document.getElementsByName("song");
//
//     // Using click() to watch on radio button
//     // var checked = songsList.click();
//
//     //  Can't remember what this does
//     // var checked = Array.prototype.forEach.call(songsList, function (item) {
//     //   item.checked = true;
//     // });
//
//     // Next step -> Take info of the SELECTED/CHECKED track
//     // if ( button.checked === true) {
//     //   var trackInfo = await SpotifyAPI.getTrackDetails(access_token, button.id, songs.tracks[0].id);
//     // }
//     // else {
//     //
//     // }
// }
