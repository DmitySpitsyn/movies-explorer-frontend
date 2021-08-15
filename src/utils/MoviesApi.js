class MoviesApi {
  constructor(options) {
      this._options = options;
      this._getDataFromServer = this._getDataFromServer.bind(this);
  }

  _getDataFromServer(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error('Произошла ошибка с кодом ', res.status));
};

  getMovies() {
      return fetch(this._options.baseUrl, {
          method: 'GET',
      }).then(res => { return this._getDataFromServer(res) });
  };
};

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      'Content-Type': 'application/json',
  }
});

export default moviesApi;