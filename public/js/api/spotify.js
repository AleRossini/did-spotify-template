const getUserData = (accessToken) => {
  return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

const getSongs = (accessToken, id) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=IE`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

const getTrackDetails = (accessToken, id) => {
  return fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

const getArtists = (accessToken, artist) => {
  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
  .then(response => response.artists.items[0])
};

export default {
  getUserData,
  getSongs,
  getArtists,
  getTrackDetails
}
