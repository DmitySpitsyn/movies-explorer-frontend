class Auth {
  constructor(options) {
      this._options = options;
      this._getDataFromServer = this._getDataFromServer.bind(this);
  }

  _getDataFromServer(res) {
      if (res.status === 200) {
       return res.json();
      }
      return Promise.reject(res);
  };

  onRegister(data) {
      return fetch(this._options.baseUrl + '/signup', {
          headers: this._options.headers,
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
              password: data.password,
              email: data.email,
              name: data.name
          }),
      }).then(res => { return this._getDataFromServer(res)});
  };

onLogin(data) {
  return fetch(this._options.baseUrl + '/signin', {
    headers: this._options.headers,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  }).then(res => {if (res.status === 200) {return 'autorized ok'} return this._getDataFromServer(res) });
};

  authorization() {
      return fetch(this._options.baseUrl + '/users/me', {
          method: 'GET',
          credentials: 'include',
          headers: this._options.headers,
      }).then(res => { return this._getDataFromServer(res) });
  }

  onLogOut() {
    return fetch(this._options.baseUrl + '/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: this._options.headers,
    }).then(res => {if (res.status === 200) {return 'logout ok'} return this._getDataFromServer(res) });
}

  
  editUser(name, email) {
    return fetch(this._options.baseUrl + '/users/me', {
        method: 'PATCH',
        credentials: 'include',
        headers: this._options.headers,
        body: JSON.stringify({
            name: name,
            email: email,
        })
    }).then(res => { return this._getDataFromServer(res) });
};

createMovies(data) {
  return fetch(this._options.baseUrl + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: 'https://api.nomoreparties.co' + data.image.url,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.trailerLink,
        movieId: data.id,
      })
  }).then(res => { return this._getDataFromServer(res) });
};

 getSavedMovies() {
  return fetch(this._options.baseUrl + '/movies', {
      method: 'GET',
      credentials: 'include',
      headers: this._options.headers,
  }).then(res => { return this._getDataFromServer(res) });
}

deleteMovie(movieId) {
  return fetch(this._options.baseUrl + '/movies/'+ movieId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._options.headers,
  }).then(res => { return this._getDataFromServer(res) });
}

};

const auth = new Auth({
  baseUrl: 'https://api.dvspicin.diploma.nomoredomains.monster',
  headers: {
      'Content-Type': 'application/json',
  }
});

export default auth;