/* eslint-env jquery */

$(document).ready(function () {
  // Get restaurants list
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&start=0&count=100',
    headers: { 'user-key': '0049a4d76f9eb8a49b40a324517aa27f' },
    type: 'GET',
    success: function (result) {
      console.log(result)
      displayRestaurants(result)
    },
    error: function (error) {
      console.log(error)
    }
  })
})

function displayRestaurants (restaurant) {
  console.log(restaurant.restaurants[1].restaurant.name)
  let newlist = ''
  for (var i = 0; i < restaurant.restaurants.length; i++) {
    newlist = newlist + '<div class="restaurants__restaurant">' + restaurant.restaurants[i].restaurant.name + '</div>'
  }
  $('.restaurants__list').html(newlist)
}
