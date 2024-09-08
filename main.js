

let gameName="Guess The Word"

document.title=gameName;

document.querySelector("h1").innerHTML=gameName;

document.querySelector("footer").innerHTML= `${gameName} Game Greated By Awad Reda`;



// setting Game Options

let numberOfTries =6;

let numberOFLetters =6;

let currentTry=1;
let numberOfHints=2;


let wordToGuess ="";

const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];

wordToGuess =words[Math.floor(Math.random() * words.length)].toLowerCase();

let messageArea = document.querySelector(".message");


document.querySelector(`.hint span`).innerHTML=numberOfHints;
const getHintButton = document.querySelector(`.hint`);
getHintButton.addEventListener("click",getHint);

function generateInput() {

  const inputsContainer=document.querySelector(".inputs");

  for(let i=1 ; i<=numberOfTries;i++)
  {
    const  tryDiv =document.createElement("div");

    tryDiv.classList.add(`try-${i}`);

    tryDiv.innerHTML=`<span>Try ${i}</span>`;

    if(i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j=1 ;j<= numberOFLetters;j++)
    {
      const input =document.createElement("input");
      input.id=`guess-${i}-letter${j}`;
      input.setAttribute("maxlength","1");
  

      tryDiv.appendChild(input); 

    }
    inputsContainer.appendChild(tryDiv);


  }

  
  inputsContainer.children[0].children[1].focus();
  


  let inputsInDisableddiv = document.querySelectorAll(".disabled-inputs input");
  
    inputsInDisableddiv.forEach((input) => (input.disabled = true));
  

    const inputs =document.querySelectorAll("input");

    inputs.forEach((input,index)=> {
      
      input.addEventListener("input",function(){

        this.value=this.value.toUpperCase();
        const nextInput =inputs[index +1];

        if(nextInput) nextInput.focus();
      });

      input.addEventListener("keydown",function(event) {

        const currentIndex=Array.from(inputs).indexOf(event.target);

        if(event.key==="ArrowRight"){

          const nextInput =currentIndex +1;

          if (nextInput < inputs.length) inputs[nextInput].focus();


        }

        if(event.key==="ArrowLeft"){

          const nextInput =currentIndex -1;

          if (nextInput >0 ) inputs[nextInput].focus();


        }
      })


    
})

}




const guessButton = document.querySelector(".check");

console.log(wordToGuess);
guessButton.addEventListener("click",handleGuesses);

function handleGuesses(){

  let successGuess= true;

    for (let i=1;i<= numberOFLetters;i++)
    {

    const inputField = document.querySelector(`#guess-${currentTry}-letter${i}`);

      const letter = inputField.value.toLowerCase();
     
      const actualLetter =wordToGuess[i-1];

      if(letter === actualLetter){

        inputField.classList.add("yes-in-place");
      }else if (wordToGuess.includes(letter) && letter !="") 
        {

          inputField.classList.add("not-in-place")
          successGuess=false;


      }else
      {

        inputField.classList.add("no")
        successGuess=false;
      }

      
      
    }
    
          if(successGuess){
    
              messageArea.innerHTML = `you win the word is <span>${wordToGuess}</span>`;
              let allteris = document.querySelectorAll(".inputs > div");  
              allteris.forEach((trydiv) => trydiv.classList.add("disabled-inputs")); 
              guessButton.disabled=true;
            
            }else {
              

              document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
              
              let currentTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
              
              currentTryInputs.forEach((input) => (input.disabled=true));
              currentTry++;
              
              let nextTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
              
              nextTryInputs.forEach((input) => (input.disabled = false));
              
              
              let el = document.querySelector(`.try-${currentTry}`);
              // console.log(el)
              if(el)
                {
                  
                  document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
                  
                  el.children[1].focus();
              }
              else
              {
                              guessButton.disabled = true;

                              messageArea.innerHTML = `you Lose the word is <span>${wordToGuess}</span>`;

              }
          
              


              
            }
            
         


          }


          function getHint()
          {

            if(numberOfHints > 0) {

              numberOfHints--;
              document.querySelector(".hint span").innerHTML= numberOfHints; 

              
            }

            if(numberOfHints===0){

              getHintButton.disabled=true;
            }

            const enabledInputs =document.querySelectorAll('input:not([disabled])');
            // console.log(enabledInputs);

            const EmptyEnabledInputs= Array.from(enabledInputs).filter((input) => input.value==="");

            // console.log(EmptyEnabledInputs);

            if(EmptyEnabledInputs.length > 0) {

              const randomIndex= Math.floor(Math.random() *EmptyEnabledInputs.length)

                const randomInput=EmptyEnabledInputs[randomIndex];

              const indexTofill =Array.from(enabledInputs).indexOf(randomInput);

                console.log(indexTofill);

                console.log(randomInput);
              console.log(randomIndex);

              if(indexTofill !== -1)
              {
                randomInput.value =wordToGuess[indexTofill].toUpperCase();
              }
            }

          }


          function handleBacksapce(event) {

            console.log(event)
            if (event.key === "Backspace") {

              const inputs = document.querySelectorAll("input:not([disabled])");

              const currentIndex = Array.from(inputs).indexOf(
                document.activeElement
              );

              if (currentIndex > 0) {
                const currentInput = inputs[currentIndex];
                console.log(currentIndex)
                const prev = inputs[currentIndex - 1];
                currentInput.value = "";
                prev.value = "";
                if(currentIndex >0)
                {
                  prev.focus();
                }
              }
            }

          }

          document.addEventListener("keydown", handleBacksapce);

window.onload = function(){
  
  generateInput();
}









