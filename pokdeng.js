function randomCard(deck, numToExtract) {
  var extracted = [];
  for (var i = 0; i < numToExtract; i++) {
    extracted.push(deck.splice(Math.floor(Math.random() * deck.length, 1), 1));
  }
  return extracted;
}

function getDeck() {
  var suits = ["spades", "diamonds", "clubs", "hearts"];
  var values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = suits[i] + "-" + values[x];
      deck.push(card);
    }
  }
  // console.log(deck)
  return deck;
}

function checkResult(myHand, oppHand) {
  let oppScore = 0;
  let myScore = 0;
  const number = ["2", "3", "4", "5", "6", "7", "8", "9"];
  if (myHand.includes("A")) {
    myScore += 1;
  } else if (oppHand.includes("A")) {
    oppScore += 1;
  }
  for (i = 0; i < number.length; i++) {
    if (myHand.includes(number[i])) {
      myScore += number[i];
    }
    if (oppHand.includes(number[i])) {
      oppScore += number[i];
    }
  }
  if (myScore > oppScore) {
    return 1;
  } else if (myScore === oppScore) {
    return 2;
  } else {
    return 0;
  }
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let totalChip = 0;
let betMoney = 0;

const startPokdeng = async () => {
  return new Promise(async (resolve, reject) => {
    readline.question("Please put your bet", async (bet) => {
      betMoney = bet;
      const deck = getDeck();
      let get4Cards = randomCard(deck, 4);
      let myHand = get4Cards[0] + "," + get4Cards[1];
      let oppHand = get4Cards[2] + "," + get4Cards[3];
      console.log(`You got ${myHand}`);
      console.log(`You got ${oppHand}`);
      let result = checkResult(myHand, oppHand);
      if (result === 1) {
        totalChip += parseInt(bet);
        console.log(`You won!!!, received ${betMoney} chips`);
      } else if (result === 0) {
        totalChip -= parseInt(bet)
        console.log(`You lose!!!, lose ${betMoney} chips`);
      } else {
        console.log(`You tie!!!, gain 0 chips`);
      }
      await continuePokdeng();
      resolve();
    });
  });
};

const continuePokdeng = async () => {
  return new Promise(async (resolve, reject) => {
    readline.question("Wanna play more (Yes/No)?", async (answer) => {
      if (answer === "Yes") {
        await startPokdeng();
      } else {
        console.log(`You got total ${totalChip} chips`);
        totalChip = 0;
      }
      resolve();
    });
  });
};

const pokdeng = async () => {
  await startPokdeng();
  readline.close();
};

pokdeng();
