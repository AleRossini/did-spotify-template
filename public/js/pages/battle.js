import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const SONGS = document.getElementById('songs');
const ARTISTS = document.getElementById('artists');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>`<h1>Logged in as </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
    </div>
    <a type ="button" href="">Go to the Battle!</a>
  </div>`


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


 //ARTISTS.innerHTML = artistsList.map((a)=> return a.name).join(',');
 // console.log(artistsList);
 //
 // function sendArtistName(value) {
 //
 //   console.log(value);
 // }

document.getElementById('sendArtistName').addEventListener('click', () => {
      var artistsName = document.getElementById('typedArtistName').value.toLowerCase();
      console.log(artistsName);
      // return artistsName;
       var artistsInfo = SpotifyAPI.getArtists(access_token, artistsName).then(data => {console.log(data)});
       // var artistId = artistsInfo.artists.id;
       console.log(artistId);
});

 // function getArtistsName() {
 //   var artistsName = document.getElementById('typedArtistName').value.toLowerCase();
 //   console.log(artistsName);
 //   return artistsName;
 // };

 // var artistsList = SpotifyAPI.getArtists(access_token, getArtistsName).then(data => {outputTemplate(data);});
 // console.log(artistsName);
 // console.log(artistsList);
 // // var artistId =
 // var songsList = SpotifyAPI.getSongs(access_token, id).then(data => {outputTemplate(data);});






 // console.log(value);

// var song1 = document.getElementById("song1").innerHTML =
