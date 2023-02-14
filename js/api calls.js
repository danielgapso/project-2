const coinUrl = "https://api.coingecko.com/api/v3/coins/list";//first api to get all the coins
//const infoUrl = "https://api.coingecko.com/api/v3/coins/{id}";//secound api to get the coins data by its id

let allCoins = [];//an array of all the coins

$(document).ready(function () {//when document ready execute the function
  $.get(coinUrl).done(function (data) {//get the url and when done present the data
    allCoins = data;//the data that returned from the call
    getData();//invoke the function to show the coins in the cards
  });
});

const getCoinInfo = (id) => {//this function gets the clicked card id
  const url = infoUrl.replace("{id}", id);//the url is called the ending of the url is replaced with the clicked cards id
  $("#coinInfo-" + id).html("");//calls the cards id by button id sets inner html as empty string
  $("#loadingGif").css("display", "block");//sets the gif to take the whole screen width its given
 
  if ("caches" in window) {//Checks if there is a cache from the call
    caches.match(url).then(response => {// checks in the cace if there is a matching request then return a callback
      if (response) {//Check if there is a response in cache the execute
        response.json().then(json => {//parse the response as json and then return callback json
          let dateCached = new Date(response.headers.get("date"));//caches the date with the response
          let now = new Date();//date object of the click
          let differenceInMinutes = (now - dateCached) / 1000 / 60;//minuses dateCached from now dividing by 1000 and then 60 to get the minutes between
          if (differenceInMinutes < 2) {//checks if the time passed from the last click is 2 minutes
            data = json;//sets the data equal to the json
            $("#loadingGif").css("display", "none");//sets the gif to not be shown
            printinfo(id, json);//calls printinfo function to show the data
          } else {
            $.get(url, data => {//get the url and when done present the data
              caches.open("coinData").then(cache => {//opens the cache folder named coinData
                cache.put(url, new Response(JSON.stringify(data), {//adds the data to the cache with the clicked moments date and time
                  headers: {//records date and time
                    "Date": new Date().toUTCString()
                  }
                }));
                $("#loadingGif").css("display", "none");//sets the gif to not be shown
                printinfo(id, data);//calls printinfo function to show the data
              });
            });
          }
        });
      } else {// If there is no cache call the url 
        $.get(url, data => {//get the url and when done present the data
          caches.open("coinData").then(cache => {//opens the cache folder named coinData
            cache.put(url, new Response(JSON.stringify(data), {//adds the data to the cache with the clicked moments date and time
              headers: {//records date and time
                "Date": new Date().toUTCString()
              }
            }));
            $("#loadingGif").css("display", "none");//sets the gif to not be shown
            printinfo(id, data);//calls printinfo function to show the data
          });
        });
      }
    });

  } else {
    $.get(url, data => {//get the url and when done present the data
      $("#loadingGif").css("display", "none");//sets the gif to not be shown
      printinfo(id, data);//calls printinfo function to show the data
    });
  }
};

