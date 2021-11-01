let apiData = [];

const fetchApiData = async (ARTIST_NAME) => {
  const url = `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`;
  const data = fetchJsonp(url).then((res) => res.json());
  return data;
};

const getData = (() => {
  const searchItem = document.querySelector(".header__input");
  const searchButton = document.querySelector(".header__button");
  const searchImg = document.querySelector(".header__img");
  let card = {
    text: "",
  };

  searchItem.addEventListener("keyup", (e) => {
    card.text = e.target.value;
    if (e.key === "Enter") {
      if (card.text == "") {
        alert("You Must Search Something First!");
      } else {
        getApi();
      }
    }
  });
  searchButton.addEventListener("click", (e) => {
    e.stopPropagation();
    card.text = e.target.previousElementSibling.value;
    if (card.text == "") {
      alert("You Must Search Something First!");
    } else {
      getApi();
    }
  });
  searchImg.addEventListener("click", (e) => {
    e.stopPropagation();
    card.text = e.target.parentElement.previousElementSibling.value;
    if (card.text == undefined) {
      alert("You Must Search Something First!");
    } else {
      getApi();
    }
  });

  const showCard = (data, search) => {
    const desc = document.querySelector(".main__desc");
    const cardList = document.querySelector(".main__cardList");

    let arr = data.map((item) => {
      return `<div class="main__card">
            <img class="main__card--img" src="${item.artworkUrl100}">
            <div class="main__card--desc">${item.collectionCensoredName}</div>
        </div>`;
    });
    if (arr.length >= 50) {
      arr = arr.splice(0, 50);
    }
    desc.innerHTML = `${arr.length} results for "${search}"`;
    cardList.innerHTML = arr.join("");

    data.length >= 50 ? (apiData = data.splice(0, 50)) : (apiData = data);
  };

  function getApi() {
    fetchApiData(card.text).then((data) => {
      showCard(data.results, card.text);
    });
    document.querySelector(".header__input").value = "";
  }
})();
