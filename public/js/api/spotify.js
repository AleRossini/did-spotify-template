const getUserData = (accessToken) => {
  return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
  }).then(response => response.json())
};

const getSongs = (accessToken) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
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
};

export default {
  getUserData,
  getSongs,
  getArtists
}
