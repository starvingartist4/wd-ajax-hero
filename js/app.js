(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let submit = document.getElementById('submit');
  submit.addEventListener('click', function(evt) {
    evt.preventDefault();
    let keyword = document.getElementById('search').value;
    console.log(keyword);
    if (keyword === '') {
      Materialize.toast("Please feed me a keyword before hitting the search button!")
    } else {
      let url = `http://www.omdbapi.com/?t=${keyword}&r=json`;
      let promise = fetch(url)
      .then(function(promiseResponse) {
        // get a responseObject from the promise response
        let responseObjectWithJSON = promiseResponse.json();
        console.log(responseObjectWithJSON);
        return responseObjectWithJSON;
      }).then(function(jsonObj) {
        // form a movie object with k/v pairs from the responseObject
        let movie = {};
        movie.id = jsonObj.imdbID;
        movie.poster = jsonObj.Poster;
        movie.title = jsonObj.Title;
        movie.year = jsonObj.Year;
        movie.plot = jsonObj.Plot;
        movies.push(movie);
        renderMovies();
      }).catch(function(error) {
        throw new error();
      });
    }
  });
})();
