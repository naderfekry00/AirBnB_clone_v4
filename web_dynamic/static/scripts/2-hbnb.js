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
});
