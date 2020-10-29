/** Zomato Project
 *
 */

/* eslint-env jquery */
const apiKey = '0049a4d76f9eb8a49b40a324517aa27f'
var categoriesId = []
var cuisinesId = []
var restaurantList = '<h5>RESULTS</h5>'
var start = 0

$(document).ready(function () {
  // Setup the default restaurants list.
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&start=0',
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      displayRestaurants(result)
    },
    error: function (error) {
      console.log(error)
    }
  })

  // Setup categories.
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/categories',
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      displayCategories(result)
    },
    error: function (error) {
      console.log(error)
    }
  })

  // Setup cuisines.
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=297',
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      displayCuisines(result)
    },
    error: function (error) {
      console.log(error)
    }
  })

  // Get new list of restaurant when the user selected the category.
  $('.header__categories input').change(function () {
    if ($(this).is(':checked')) {
      categoriesId.push($(this).attr('id'))
    } else {
      for (var i = 0; i < categoriesId.length; i++) {
        if (categoriesId[i] === $(this).attr('id')) {
          categoriesId.splice(i, 1)
          break
        }
      }
    }
    restaurantList = '<h5>RESULTS</h5>'
    start = 0
    $('.restaurants__list').animate({
      scrollTop: 0
    }, 500)
    getNewRestaurantList()
  })

  // Get new list of restaurant when the user selected the cuisine.
  $('.header__cuisines input').change(function () {
    if ($(this).is(':checked')) {
      cuisinesId.push($(this).attr('id'))
    } else {
      for (var i = 0; i < cuisinesId.length; i++) {
        if (cuisinesId[i] === $(this).attr('id')) {
          cuisinesId.splice(i, 1)
          break
        }
      }
    }
    restaurantList = '<h5>RESULTS</h5>'
    start = 0
    $('.restaurants__list').animate({
      scrollTop: 0
    }, 500)
    getNewRestaurantList()
  })
})

// If the user reached the end of the list, load a new list (limited to 100).
$('.restaurants__list').scroll(function () {
  if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
    if (start < 100) {
      start += 20
      getNewRestaurantList()
    }
  }
})

// Display the list of restaurant.
function displayRestaurants (restaurant) {
  for (var i = 0; i < restaurant.restaurants.length; i++) {
    if (!restaurantList.includes(restaurant.restaurants[i].restaurant.id)) {
      restaurantList = restaurantList + '<div class="restaurants__restaurant" data-cost="' + restaurant.restaurants[i].restaurant.price_range + '" data-rating="' + restaurant.restaurants[i].restaurant.user_rating.aggregate_rating + '" id="' + restaurant.restaurants[i].restaurant.id + '">' + restaurant.restaurants[i].restaurant.name + '</div>'
    }
  }
  $('.restaurants__list').html(restaurantList)
  // Get the selected restaurant details.
  $('.restaurants__restaurant').click(function () {
    getRestaurantDetails($(this))
  })
}

// Setup ID for categories.
function displayCategories (categories) {
  for (var i = 0; i < categories.categories.length; i++) {
    if (categories.categories[i].categories.name === 'Dinner') {
      $('input[name="dinner"').attr('id', categories.categories[i].categories.id)
    } else if (categories.categories[i].categories.name === 'Takeaway') {
      $('input[name="takeaway"').attr('id', categories.categories[i].categories.id)
    } else if (categories.categories[i].categories.name === 'Delivery') {
      $('input[name="delivery"').attr('id', categories.categories[i].categories.id)
    } else if (categories.categories[i].categories.name === 'Pubs & Bars') {
      $('input[name="pubsbars"').attr('id', categories.categories[i].categories.id)
    }
  }
}

// Setup ID for cuisines.
function displayCuisines (cuisines) {
  for (var i = 0; i < cuisines.cuisines.length; i++) {
    if (cuisines.cuisines[i].cuisine.cuisine_name === 'Others') {
      $('input[name="other"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Pub Food') {
      $('input[name="pubfood"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Chinese') {
      $('input[name="chinese"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Sandwich') {
      $('input[name="sandwich"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Italian') {
      $('input[name="italian"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Bakery') {
      $('input[name="bakery"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Asian') {
      $('input[name="asian"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Fast Food') {
      $('input[name="fastfood"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Pizza') {
      $('input[name="pizza"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Coffee and Tea') {
      $('input[name="coffeeandtea"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    } else if (cuisines.cuisines[i].cuisine.cuisine_name === 'Cafe Food') {
      $('input[name="cafefood"').attr('id', cuisines.cuisines[i].cuisine.cuisine_id)
    }
  }
}

// Retrieve a new list of restaurant when user select a category or cuisines.
// Or user has scrolled to the bottom of the list on the site (limited to 100).
function getNewRestaurantList () {
  let queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&start='
  queryURL = queryURL + start
  if (cuisinesId.length > 0) {
    queryURL = queryURL + '&cuisines=' + cuisinesId.join('%2C')
  }
  if (categoriesId.length === 0) {
    $.ajax({
      url: queryURL,
      headers: { 'user-key': apiKey },
      type: 'GET',
      success: function (result) {
        displayRestaurants(result)
      },
      error: function (error) {
        console.log(error)
      }
    })
  } else {
    categoriesId.forEach(categoryId => {
      const queryURLCategory = queryURL + '&category=' + categoryId
      $.ajax({
        url: queryURLCategory,
        headers: { 'user-key': apiKey },
        type: 'GET',
        success: function (result) {
          displayRestaurants(result)
        },
        error: function (error) {
          console.log(error)
        }
      })
    })
  }
}

// Retrieve the restaurant details from Zomato.
function getRestaurantDetails (restaurant) {
  const queryURL = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + $(restaurant).attr('id')
  $.ajax({
    url: queryURL,
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      console.log(result)
      displayRestaurantDetails(result)
    },
    error: function (error) {
      console.log(error)
    }
  })
}

// Display the restaurant details on the RHS.
function displayRestaurantDetails (restaurantDetails) {
  // Check for delivery.
  var delivery = restaurantDetails.highlights.indexOf('Delivery')
  if (delivery === -1) {
    delivery = 0
  } else {
    delivery = 1
  }
  const contextDetails = '<img src="' + restaurantDetails.thumb + '" class="restaurants_details__image"><div class="restaurants_details__content"><div class="restaurants_details__content_name">' + restaurantDetails.name + '</div><div class="restaurants_details__content_location">' + restaurantDetails.location.address + '</div><div class="restaurants_details__content_booking_' + restaurantDetails.has_table_booking + '"></div><div class="restaurants_details__content_delivery_' + delivery + '"></div><div class="restaurants_details__content_heading">CUISINES</div><div class="restaurants_details__content_cuisines">' + restaurantDetails.cuisines + '</div><div class="restaurants_details__content_heading">PHONE</div><div class="restaurants_details__content_phone">' + restaurantDetails.phone_numbers + '</div><div class="restaurants_details__content_heading">OPENING HOURS</div><div class="restaurants_details__content_openinghours">' + restaurantDetails.timings + '</div></div>'
  $('.restaurants_details').html(contextDetails)
  $('.restaurants_details__content_booking_0').html('<i class="fas fa-times"></i>No Bookings')
  $('.restaurants_details__content_booking_1').html('<i class="fas fa-check"></i>Bookings Available')
  $('.restaurants_details__content_delivery_0').html('<i class="fas fa-times"></i>No Delivery')
  $('.restaurants_details__content_delivery_1').html('<i class="fas fa-check"></i>Delivery Available')
  // Hide Restaurant details until the image is loaded.
  $('.restaurants_details').hide()
  $('.restaurants_details__image').on('load', function () {
    $('.restaurants_details').show()
  })
  $('.restaurants_details__image').on('error', function () {
    $('.restaurants_details').show()
  })
}
