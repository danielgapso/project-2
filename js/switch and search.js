let watchList = []; //an array of the watched coins

const addToWatchList = (checkbox, id) => {
  // a function that will add a coin that was switched on to the watch list
  const modalCheckbox = document.querySelector(`#coin-${id}`);
  if (checkbox.checked) {
    if (watchList.length < 5) {
      //the array is limited to 5 coins
      watchList.push({ id: id, name: id }); //the passed parametars are coins id and coins name to be showen in show watched function
    } else {
      $("#watchList").html("");
      watchList.forEach((coinId) => {
        const isChecked = watchList.some((coin) => coin.id === coinId.id);
        $("#watchList").append(`
          <div class="form-check form-switch">
            🪙<input class="form-check-input" type="checkbox" role="switch" id="coin-${
              coinId.id
            }" data-id="${coinId.id}" 
            ${isChecked ? "checked" : ""}>
              <label class="form-check-label" for="coin-${coinId.id}">${
          coinId.id
        }</label>
          </div>
        `);
      }); //shows the modal when the limit is exceeded
      $("#watchListModal").modal("show");
      checkbox.checked = false;
      $("#watchListModal input[type='checkbox']").on("change", function () {
        const id = $(this).data("id");
        // remove coin from watchList array and update card switch state
        if (!this.checked) {
          let index = watchList.findIndex((coin) => coin.id === id);
          if (index > -1) {
            watchList.splice(index, 1);
          }
          const cardSwitch = document.querySelector(
            `#box-${id} .form-check-input`
          );
          if (cardSwitch) {
            cardSwitch.checked = false;
          }
        }
        console.log(watchList);
        showWatched(watchList);
      });
    }
  } else {
    let index = watchList.findIndex((coin) => coin.id === id);
    if (index > -1) {
      watchList.splice(index, 1);
    }
  }
  if (modalCheckbox) {
    modalCheckbox.checked = checkbox.checked;
  }
  console.log(watchList);
  showWatched(watchList);
};

const showWatched = (watchList = []) => {
  //a function that shown the selected coins in the watch list array
  $("#chartsContinter").html("");
  watchList.forEach((coin) => {
    //it will show the passed parameters
    const html = `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Coin ID : ${coin.id}</h3>
          <h4 class="card-text">Coin Name : ${coin.name}</h4>
        </div>
      </div>
    `;
    $("#chartsContinter").append(html);
  });
};

const search = () => {
  const searchValue = $('input[name="search"]').val(); //get the search field value
  if (searchValue === "") {
    window.location.href = "/"; // reload the page to return to the home screen
    return; // exit the function
  }
  const filteredCoins = allCoins.filter((coin) => {
    //filter the array by the searched value
    return coin.symbol === searchValue;
  });
  $("#container").html(""); //reset the container div
  filteredCoins.forEach((coin) => {
    //check each coin if the value matches the search
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
  $('input[name="search"]').val("");
};
