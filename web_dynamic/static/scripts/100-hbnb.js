$(document).ready(function () {
  let selected_amenities = {};
  $('.amenityCheckBox').change(function () {
    const AmenityID = $(this).attr('data-id');
    const AmenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selected_amenities[AmenityID] = AmenityName;
    } else {
      delete selected_amenities[AmenityID];
    }
    const listofamenities = Object.values(selected_amenities).join(', ');
    $('div.amenities h4').text(listofamenities);
  });
  let selected_states = {};
  $('.stateCheckBox').change(function () {
    const StateID = $(this).attr('data-id');
    const StateName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selected_states[StateID] = StateName;
    } else {
      delete selected_states[StateID];
    }
    updateLocations();
  });
  let selected_cities = {};
  $('.cityCheckBox').change(function () {
    const CityID = $(this).attr('data-id');
    const CityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selected_cities[CityID] = CityName;
    } else {
      delete selected_cities[CityID];
    }
    updateLocations();
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (request) {
    if (request.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });


  loadplaces({});

  $('button').click(function () {
    const amenities = Object.keys(selected_amenities);
    const states = Object.keys(selected_states);
    const cities = Object.keys(selected_cities);
    loadplaces({ amenities, states, cities });
  })

  function loadplaces(selection) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(selection),
      success: function (data) {
        $('section.places').empty();
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
  }

  function updateLocations() {
    const listofstates = Object.values(selected_states);
    const listofcities = Object.values(selected_cities);
    const listoflocations = listofstates.concat(listofcities).join(', ');
    $('div.locations h4').text(listoflocations);
  }
});
