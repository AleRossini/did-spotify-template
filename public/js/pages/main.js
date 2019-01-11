import {generateRandomString} from "../helpers/url.js";
import {STATE_KEY, BASE_URL, CLIENT_ID} from "../helpers/constants.js";

document.getElementById('login-button').addEventListener('click', () => {
    const redirect_uri = `${BASE_URL}battle/`; // Your redirect uri
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    localStorage.setItem(STATE_KEY, state);

    // This is how we authorize spotify
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`

    window.location = url;
}, false);
