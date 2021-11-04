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
  let inputValue = "";

  searchItem.addEventListener("keyup", (e) => {
    input = e.target.value;
    inputValue = input.trim();
    if (e.key === "Enter") {
      if (inputValue === "") {
        alert("You Must Search Something First!");
      } else {
        getApi();
      }
    }
  });
  searchButton.addEventListener("click", (e) => {
    e.stopPropagation();
    input = e.target.previousElementSibling.value;
    inputValue = input.trim();
    if (inputValue === "") {
      alert("You Must Search Something First!");
    } else {
      getApi();
    }
  });
  searchImg.addEventListener("click", (e) => {
    e.stopPropagation();
    input = e.target.parentElement.previousElementSibling.value;
    inputValue = input.trim();
    if (inputValue === "") {
      alert("You Must Search Something First!");
    } else {
      getApi();
    }
  });

  const showCard = (data, search) => {
    const desc = document.querySelector(".main__desc");
    const cardList = document.querySelector(".main__cardList");

    apiData = data;

    let arr = data.map((item) => {
      return `<div class="main__card">
            <img class="main__card--img" src="${item.artworkUrl100}">
            <div class="main__card--desc">${item.collectionCensoredName}</div>
        </div>`;
    });
    // if (arr.length >= 50) {
    //   arr = arr.splice(0, 50);
    // }
    desc.innerHTML = `${arr.length} results for "${search}"`;
    cardList.innerHTML = arr.join("");
  };

  function getApi() {
    fetchApiData(inputValue).then((data) => {
      showCard(data.results, inputValue);
    });
    document.querySelector(".header__input").value = "";
  }
})();
