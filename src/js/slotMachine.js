const playButton = document.getElementById("play");
const numbersTags = document.querySelectorAll("div.numbers");
const inputTag = document.querySelector("input");
const errorTag = document.querySelector("small");
const resultTag = document.getElementById("result");
const extractedNumbers = new Array(4);
let convertedInputValue;

playButton.addEventListener("click", play);

function play() {
  removeButtonListener();
  hideError();
  hideResult();
  convertedInputValue = Number(inputTag.value);
  if (inputTag.value !== "" && !Number.isNaN(convertedInputValue) && convertedInputValue >= 0 && convertedInputValue <= 9 && Number.isInteger(convertedInputValue)) {
    //estraggo un numero intero casuale per stabilire un numero minimo di giri
    const count = Math.floor(Math.random() * 4) + 2;
    console.log(`Numero di giri della slot: ${count}`);

    //estraggo quanttro numeri casuali
    for(let i = 0; i < extractedNumbers.length; i++) {
      extractedNumbers[i] = Math.floor(Math.random() * 10);
    }

    console.log(`Numeri estratti: ${extractedNumbers}`);
    const maxExtractedNumber = Math.max(...extractedNumbers);
    const DURATION = 2000 * (count + maxExtractedNumber * 0.111);
    console.log(`Durata del gioco: ${DURATION} ms`);

    resetAnimations();
    requestAnimationFrame(function() {
      for(let i = 0; i < numbersTags.length; i++) {
        numbersTags[i].classList.remove("animation-reset");
        numbersTags[i].style.animationIterationCount = count + extractedNumbers[i] * 0.111;
        if (extractedNumbers[i] != 0) {
          numbersTags[i].classList.add("animation-forwards");
        }
        numbersTags[i].classList.add("animation-start");
      }
    });
    setTimeout(calculateResult, DURATION);
  } else {
    displayError();
    addButtonListener();
  }
 
}

function resetAnimations() {
  for(let i = 0; i < numbersTags.length; i++) {
    numbersTags[i].style = "none";
    numbersTags[i].classList.remove("animation-forwards");
    numbersTags[i].classList.remove("animation-start");
    numbersTags[i].classList.add("animation-reset");
  }
}

function displayError() {
  errorTag.classList.add("display");
  errorTag.classList.remove("hide");
}

function hideError() {
  errorTag.classList.remove("display");
  errorTag.classList.add("hide");
}

function hideResult() {
  resultTag.classList.remove("display");
  resultTag.classList.add("hide");
}

function displayResult() {
  resultTag.classList.remove("hide");
  resultTag.classList.add("display");
}

function calculateResult() {
  resultTag.classList.remove("victory");
  resultTag.classList.remove("defeat");
  if (extractedNumbers.includes(convertedInputValue)) {
    resultTag.textContent = "Hai vinto!";
    resultTag.classList.add("victory");
  } else {
    resultTag.textContent = "Hai perso!";
    resultTag.classList.add("defeat");
  }
  displayResult();
  addButtonListener();
}

function addButtonListener() {
  playButton.addEventListener("click", play);
  playButton.classList.add("pointer");
}

function removeButtonListener() {
  playButton.removeEventListener("click", play);
  playButton.classList.remove("pointer");
}



