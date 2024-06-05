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
});
