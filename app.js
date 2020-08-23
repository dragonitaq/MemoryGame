document.addEventListener("DOMContentLoaded", () => {
  //Card options
  const cardArray = [
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "fries",
      img: "images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "ice-cream",
      img: "images/ice-cream.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
    {
      name: "pizza",
      img: "images/pizza.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
    {
      name: "hotdog",
      img: "images/hotdog.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
    {
      name: "milkshake",
      img: "images/milkshake.png",
    },
  ];

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let startTime, endTime, timeDiff;

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const result = document.querySelector("#result");
  const duration = document.querySelector("#duration");
  const start = document.querySelector("#start");
  const refresh = document.querySelector("#refresh");

  // Randomize starting cards
  function randomizeCards() {
    cardArray.sort(() => 0.5 - Math.random());
  }
  //Assign function to refresh game button
  refresh.addEventListener("click", () => {
    location.reload(false);
  });

  //Assign function to start game button
  start.addEventListener("click", createNewGame);

  function createNewGame() {
    randomizeCards();
    createBoard();
    startCountTime();
  }

  //Creat the board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipcard);
      grid.appendChild(card);
      start.removeEventListener("click", createNewGame);
    }
  }

  //Flip the cards
  function flipcard() {
    let cardId = this.getAttribute("data-id");
    this.removeEventListener("click", flipcard);
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 750);
    }
  }

  function checkForMatch() {
    let cards = document.querySelectorAll("img");
    if (cardsChosen[0] === cardsChosen[1]) {
      cards[cardsChosenId[0]].setAttribute("src", "images/white.png");
      cards[cardsChosenId[1]].setAttribute("src", "images/white.png");
      cardsWon.push(cardsChosen);
    } else {
      // setTimeout( function (){
      cards[cardsChosenId[0]].setAttribute("src", "images/blank.png");
      cards[cardsChosenId[0]].addEventListener("click", flipcard);
      cards[cardsChosenId[1]].setAttribute("src", "images/blank.png");
      cards[cardsChosenId[1]].addEventListener("click", flipcard);
      // }, 500);
    }
    cardsChosen = [];
    cardsChosenId = [];
    scoreDisplay.textContent = cardsWon.length + "/" + cardArray.length / 2;
    if (cardsWon.length === cardArray.length / 2) {
      endCountTime();
      result.textContent = "Congratulations! You have found them all!";
      scoreDisplay.textContent = "";
      timeDiff = (endTime - startTime) / 1000;
      duration.textContent = timeDiff + " seconds";
    }
  }

  function startCountTime() {
    startTime = new Date();
  }

  function endCountTime() {
    endTime = new Date();
  }

  scoreDisplay.textContent = "0/" + cardArray.length / 2;
});
