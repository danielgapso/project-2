const coinUrl = "https://api.coingecko.com/api/v3/coins/list"; //first api to get all the coins
const infoUrl = "https://api.coingecko.com/api/v3/coins/{id}"; //secound api to get the coins data by its id
const topCoinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD"; //top coins

let allCoins = []; //an array of all the coins

$(document).ready(function () {
  //when document ready execute the function
  $.get(topCoinsUrl).done(function (data) {
    //get the url and when done present the data
    allCoins = data; //the data that returned from the call
    getData(); //invoke the function to show the coins in the cards
  });
});

const getCoinInfo = (id) => {//a funcion that will replace {id} in the url with the clicked coin id
  const url = infoUrl.replace("{id}", id);//the replacement 
  const cacheExpireTime = 2 * 60 * 1000;//12000 miliseconds is 2 minutes
  $("#coinInfo-" + id).html("");
  $("#loadingGif").css("display", "block");
  if ("caches" in window) {//checks if cache exists and if so it will update the info according to the passed time
    caches.match(url).then((response) => {
      if (response) {
        const lastUpdated = new Date(
          response.headers.get("last-modified")
        ).getTime();
        const currentTime = Date.now();
        if (currentTime - lastUpdated < cacheExpireTime) {
          response.json().then((data) => {
            $("#loadingGif").css("display", "none");
            printinfo(id, data);
          });
          return;
        }
      }//if cache is not exists it will open a new one
      $.get(url, (data) => {
        $("#loadingGif").css("display", "none");
        printinfo(id, data);
        if ("caches" in window) {
          caches.open("coinData").then((cache) => {
            cache.put(url, new Response(JSON.stringify(data)));
          });
        }
      });
    });
  } else {
    $.get(url, (data) => {
      $("#loadingGif").css("display", "none");
      printinfo(id, data);
    });
  }
};
