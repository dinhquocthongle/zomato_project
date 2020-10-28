/* eslint-env jquery */
const apiKey = '0049a4d76f9eb8a49b40a324517aa27f'
var categoriesId = []
var cuisinesId = []
$(document).ready(function () {
  // Get restaurants list
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&start=0&count=100&category=10&sort=rating',
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      console.log(result)
      displayRestaurants(result)
    },
    error: function (error) {
      console.log(error)
    }
  })

  // Get categories
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

  // Get cuisines
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
    categoriesId.forEach(element => {
      getNewRestaurantList()
    })
  })

  $('.header__cusines input').change(function () {
    if ($(this).is(':checked')) {
      cuisinesId.push($(this).attr('id'))
      console.log(cuisinesId)
    } else {
      for (var i = 0; i < cuisinesId.length; i++) {
        if (cuisinesId[i] === $(this).attr('id')) {
          cuisinesId.splice(i, 1)
          break
        }
      }
      console.log(cuisinesId)
    }
    getNewRestaurantList()
  })
})

function displayRestaurants (restaurant) {
  let newList = ''
  for (var i = 0; i < restaurant.restaurants.length; i++) {
    newList = newList + '<div class="restaurants__restaurant">' + restaurant.restaurants[i].restaurant.name + '</div>'
  }
  $('.restaurants__list').html(newList)
}

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

function getNewRestaurantList () {
  let queryURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city&start=0'
  if (cuisinesId.length > 0) {
    queryURL = queryURL + '&cuisines=' + cuisinesId.join('%2C')
  }
  $.ajax({
    url: queryURL,
    headers: { 'user-key': apiKey },
    type: 'GET',
    success: function (result) {
      console.log(result)
      displayRestaurants(result)
    },
    error: function (error) {
      console.log(error)
    }
  })
}
