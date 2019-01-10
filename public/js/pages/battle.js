import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const SONGS = document.getElementById('songs');
const ARTISTS = document.getElementById('artists');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>`<h1>Hey <b>${display_name}</b>, <br/> do you know who's the best ...??</h1>
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


 //ARTISTS.innerHTML = artistsList.map((a)=> return a.name).join(',');
 // console.log(artistsList);
 //
 // function sendArtistName(value) {
 //
 //   console.log(value);
 // }
async function getSongsForArtist() {
  var artistsName = document.getElementById('typedArtistName').value.toLowerCase();
  var artist = await SpotifyAPI.getArtists(access_token, artistsName);
  var songs = await SpotifyAPI.getSongs(access_token, artist.id);
  // var checkedSong = 'valore iniziale';

    songs.tracks.forEach((song) => {
      var list = document.createElement('li');
      list.appendChild(document.createTextNode(song.name));
      var input = document.createElement('input');
      input.class = 'song';
      input.type = "radio";
      input.name = "song";
      input.value = song.id;
        // input.addEventListener('change', function prova() {
        //   input.checked ? (checkedSong = input.value) : null;
        //   console.log(checkedSong);
        // })
      document.getElementById('artistTopTracks').appendChild(list).appendChild(input);
    })
    // prova();
    // console.log(checkedSong);


    // Trying to solve with FILTER
    // const radioButtons = document.getElementsByName("song");
    // const button = radioButtons.filter(function(button) {
    // return button.checked;
    // })[0]

    // Trying to solve with FIND
    var radioButtons = document.getElementsByName("song");
    // radioButtons.addEventListener('change', (button) => { console.log(button.value)});
    // console.log(radioButtons);
    // radioButtons.addEventListener('change', () => {
      const songsList = Array.from(radioButtons);
      var checkedSong = songsList.find(button => button.checked === true);
    // })

    console.log(radioButtons);
    console.log(songsList);
    console.log(checkedSong);


    // Create a static list
    // var songsList = document.querySelectorAll( 'input[name=song]');

    //  Create a live/dynamic list
    // var radioButtons = document.getElementsByName("song");

    // Using click() to watch on radio button
    // var checked = songsList.click();

    //  Can't remember what this does
    // var checked = Array.prototype.forEach.call(songsList, function (item) {
    //   item.checked = true;
    // });

    // Next step -> Take info of the SELECTED/CHECKED track
    // if ( button.checked === true) {
    //   var trackInfo = await SpotifyAPI.getTrackDetails(access_token, button.id, songs.tracks[0].id);
    //   console.log(trackInfo);
    // }
    // else {
    //
    // }

}

document.getElementById('sendArtistName').addEventListener('click', getSongsForArtist);
