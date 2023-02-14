let watchList=[];

const addToWatchList = (checkbox, id) => {
    if (checkbox.checked) {
      if (watchList.length < 5) {
        watchList.push(id);
      } else {
        $("#watchList").html("");
        watchList.forEach(coinId => {
          $("#watchList").append(`
          <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
          <label class="form-check-label" for="flexSwitchCheckChecked">${coinId}</label>
        </div>
          `);
        });
        $("#watchListModal").modal("show");
        checkbox.checked = false;
      }
    } else {
      let index = watchList.indexOf(id);
      if (index > -1) {
        watchList.splice(index, 1);
      }
    }
  };
  

  const search = () => {
    const searchValue = $('input[name="search"]').val();//get the search field value
    const filteredCoins = allCoins.filter(coin =>//filter the array by the searched value
       coin.id.includes(searchValue));
    $("#container").html("");//reset the container div
    filteredCoins.forEach(coin => {//check each coin if the value matches the search
      //show the card or cards by the search
      $("#container").append(`
      <div class="Box" id="box-${coin.id}">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <div class="form-check form-switch" id="addSwitch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
          onclick="addToWatchList(this, '${coin.id}')">
          </div>
          <h5 class="card-title">${coin.symbol}</h5>
          <p class="card-text">${coin.id}</p>
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" 
          data-bs-target="#collapseExample-${coin.id}"
          onclick="getCoinInfo('${coin.id}', '#collapseExample-${coin.id}')" 
          aria-expanded="false"
          aria-controls="collapseExample-${coin.id}">
            more info
          </button>
          <div class="collapse" id="collapseExample-${coin.id}">
            <div class="card card-body">
              <div id="coinInfo-${coin.id}"></div>
            </div>
          </div>
        </div>
    `);
    });
  };
  