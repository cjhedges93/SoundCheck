document.getElementById('login').addEventListener('click', function() {
      const clientId = '1a56f0ddf7e04b659519f1fcc5f622f8'; // Replace with your actual Spotify client ID
      const redirectUri = 'https://cjhedges93.github.io/soundcheck/callback'; // Replace 'YOUR_REDIRECT_URI' with your actual redirect URI
      const scopes = 'user-top-read';
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    });

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (code) {
      fetchAccessToken(code);
    }

    function fetchAccessToken(code) {
      const clientId = '1a56f0ddf7e04b659519f1fcc5f622f8'; // Replace with your actual Spotify client ID
      const clientSecret = 'e7866a85962a4fe89139d92bfd0cb6ef'; // Replace with your actual Spotify client secret
      const redirectUri = 'https://cjhedges93.github.io/soundcheck/callback'; // Replace 'YOUR_REDIRECT_URI' with your actual redirect URI

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
      })
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;
        fetchTopArtists(accessToken);
      })
      .catch(error => console.error('Error fetching access token:', error));
    }

    function fetchTopArtists(accessToken) {
      fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Display top artists data on the page
      })
      .catch(error => console.error('Error fetching top artists:', error));
    }
