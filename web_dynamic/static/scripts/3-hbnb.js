$(document).ready(function () {
  let selected = {};
  $('input[type="checkbox"]').change(function () {
    const AmenityID = $(this).attr('data-id');
    const AmenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selected[AmenityID] = AmenityName;
    } else {
      delete selected[AmenityID];
    }
    const listofamenities = Object.values(selected).join(', ');
    $('div.amenities h4').text(listofamenities);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (request) {
    if (request.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        const article = $('<article></article>');
        const titleBox = $('<div class="title_box"></div>');
        const title = $('<h2></h2>').text(place.name);
        const price = $('<div class ="price_by_night"></div>').text(place.price_by_night);
        titleBox.append(title).append(price);
        const info = $('<div class="information"></div>');
        const maxGuests = $('<div class="max_guest">').text(place.max_guest);
        const numRooms = $('<div class="number_rooms"></div>').text(place.number_rooms);
        const numBathrooms = $('<div class="number_bathrooms"></div>').text(place.number_bathrooms);
        info.append(maxGuests).append(numRooms).append(numBathrooms);
        const description = $('<div class="description"></div>').html(place.description.replace(/\n/g, '<BR/>'));
        article.append(titleBox).append(info).append(description);
        $('section.places').append(article);
      }
    }
  });
});
