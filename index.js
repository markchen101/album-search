const fetchApiData = async (ARTIST_NAME) => {
  const url = `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`;
  const data = fetchJsonp(url).then((res) => res.json());
  return data;
};

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

  let arr = data.map(item => {
    return `<div class="main__card">
            <img class="main__card--img" src="${item.artworkUrl100}">
            <div class="main__card--desc">${item.collectionName}</div>
        </div>`;
  });

  desc.innerHTML = `${arr.length} results for "${search}"`;
  cardList.innerHTML = arr.join("");

  cardList.addEventListener("click", function (e) {
    let arrList = data.map(item =>{
      return ` <div>${item.artistName}</div>
      <div>${item.releaseDate}</div>
      <div>${item.collectionPrice}</div>`
    })
    let popup="";

    for(let i = 0; i < data.length; i++){
      if (data[i].collectionName === e.target.outerText) {
        popup = arrList[i];
        console.log("outside",popup);
        myFunction(popup);
      }
    }  

    function myFunction(popup) {
      console.log("inside",popup)
      var myWindow = window.open("", "MsgWindow", "width=200,height=100");
      myWindow.document.open();
      myWindow.document.write(popup);
      myWindow.document.close();
    }


  });}

function getApi() {
  fetchApiData(inputValue).then((data) => {
    showCard(data.results, inputValue);
  });
  document.querySelector(".header__input").value = "";
}
