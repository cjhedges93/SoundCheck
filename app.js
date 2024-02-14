var client_id = '1a56f0ddf7e04b659519f1fcc5f622f8';
var redirect_uri = 'http://localhost:8888/callback';

var app = express();

document.getElementById('login') function{

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
}


}
