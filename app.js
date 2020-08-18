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

  // Randomize starting cards
  cardArray.sort(() => 0.5 - Math.random());

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");

  //Creat the board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipcard);
      grid.appendChild(card);
    }
  }

  //Flip the cards
  function flipcard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    console.log(cardsChosenId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 100);
    }
  }

  //Check for match
  /* Need to add 2 operattions:
  1) Prevent matched card being able to click again.
  2) Prevent clicking the same card twice. */
  function checkForMatch() {
    let cards = document.querySelectorAll("img");
    if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match!");
      cards[cardsChosenId[0]].setAttribute("src", "images/white.png");
      cards[[cardsChosenId[1]]].setAttribute("src", "images/white.png");
      cardsWon.push(cardsChosen);
    } else {
      cards[[cardsChosenId[0]]].setAttribute("src", "images/blank.png");
      cards[[cardsChosenId[1]]].setAttribute("src", "images/blank.png");
      alert("Wrong. Try again!");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations! You have found them all!";
    }
  }

  //Call the function to creat the board
  createBoard();
});
