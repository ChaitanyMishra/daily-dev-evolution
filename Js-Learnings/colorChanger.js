document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.theme');
    const body = document.querySelector('body');

    const changeColor = (event) => {
        const selectedTheme = event.target.id;
        console.log(selectedTheme);

        if (selectedTheme === 'box1') {
            body.style.backgroundColor = 'royalblue';
        } else if (selectedTheme === 'box2') {
            body.style.backgroundColor = 'black';
        } else if (selectedTheme === 'box3') {
            body.style.backgroundColor = 'darkred';
        } else {
            body.style.backgroundColor = 'white';
        }

    };
    boxes.forEach(box => {
        box.addEventListener('click', changeColor);
    });

// =========================================================================================


const calculate = document.querySelector('#calculateBmi');
const yourBmi = document.querySelector('#ans');

const calculateBmi = () => {
    const heightInput = parseFloat(document.querySelector('#height').value);
    const weightInput = parseFloat(document.querySelector('#weight').value);

    if (isNaN(heightInput) || isNaN(weightInput) || heightInput <= 0 || weightInput <= 0) {
        yourBmi.innerHTML = "<span style='color:red;'>Please enter valid height and weight.</span>";
        return;
    }
    const heightInMeters = heightInput / 100;
    const calculatedBmi = weightInput / (heightInMeters ** 2);

    let category = "";
    let colorClass = "";

    if (calculatedBmi < 18.6) {
        category = "You Are Underweight";
        colorClass = "yellow-text"; 
    } else if (calculatedBmi >= 18.6 && calculatedBmi <= 24.9) {
        category = "Normal Weight";
        colorClass = "green-text";
    } else {
        category = "You Are Overweight";
        colorClass = "red-text";
    }
    yourBmi.innerHTML = "";
    const bmiResult = document.createElement('h3');
    bmiResult.textContent = `Your BMI: ${calculatedBmi.toFixed(2)}`;
    bmiResult.classList.add(colorClass); 

    const bmiCategory = document.createElement('p');
    bmiCategory.textContent = category;
    bmiCategory.classList.add(colorClass);

    yourBmi.appendChild(bmiResult);
    yourBmi.appendChild(bmiCategory);
}
calculate.addEventListener('click', calculateBmi);

// ===============================================================================

const clockBody = document.querySelector('.container2')
setInterval(function() {
let time = new Date();
clockBody.innerHTML = time.toLocaleTimeString();
},1000);
// ================================================================================
const input = document.querySelector('#guessInput');
const submitInput = document.querySelector('#submitGuess');
const previousGuesses = document.querySelector('#previousGuesses');
const remainingGuess = document.querySelector('#attempt');
const help = document.querySelector('#help');
const result = document.querySelector('.result');
const randomNumber = Math.floor(Math.random() * 100) + 1;
const guessArr = [];
let numGuesses = 10;
let playGame = true;
const guessNumber = (events) => {
    events.preventDefault();
    if(!playGame)return;
    let inputAns = parseInt(input.value)
    if(!validate(inputAns))return;
    guessPush(inputAns)
    numGuesses--;
   
    guessValidate(inputAns);
    remainingGuess.textContent = `Attempt Remaning ${numGuesses}`;
    previousGuesses.textContent = `Your Previous Guesses Are: ${guessArr.join(', ')}`;

    
    if(numGuesses === 0 && inputAns !== randomNumber){
        result.innerHTML = `<span style="color:red; font-size:2.3rem;"> Game Over! The correct number was ${randomNumber}.</span>`;
        playGame = false;
    }
    input.value = ""
}

const validate = (guess)=>{
    if (isNaN(guess)) {
        alert("Please enter a valid number!");
        return false;
    } else if (guess< 1) {
        alert("Please enter a number greater than 0!");
        return false;
    } else if (guess > 100) {
        alert("Please enter a number less than 101!");
        return false;
    }
    return true;
};

const guessPush = (guess) =>{
    guessArr.push(guess)
}

const guessValidate = (guess) => {
    if (guess === randomNumber){
        help.innerHTML = "<span style='color:green; font-size:2.3rem'> Correct! You guessed the number!</span>"
        playGame = false;
    }else if(guess > randomNumber){
        help.innerHTML = "<span style='color:yellow; font-size:1.5rem;'> Too high! Try a lower number.</span>  "
    }else if(guess < randomNumber){
        help.innerHTML = "<span style='color:red;font-size:1.5rem;'> Too Low! Try a higher number. </span> "
    }
};

submitInput.addEventListener('click', guessNumber);
// ==============================================================================================================
const stopWatch = document.querySelector('#stopWatch')
const start = document.querySelector('#start');

const stop = document.querySelector('#stop');
let time = 0 ;
let intervalId = null;
function startTime(){
    time++
    stopWatch.textContent = (time)
}
start.addEventListener('click', () => {
    if (!intervalId) {
        intervalId = setInterval(startTime, 1000);
    }
});

stop.addEventListener('click' , () =>{
    clearInterval(intervalId)
    intervalId = null
})
// ========================================================================================================
let intervalId2;
const startBtn = document.querySelector('#startBtn');
const stopBtn =  document.querySelector('#stopBtn');
function randomColorChange(){
let colorValue = '0123456789ABCDEF';
let colorToken ='#';
for(let i = 0 ; i<6 ;i++){
    colorToken += colorValue[Math.floor(Math.random()*16)]
}
return colorToken;
}
function backgroundChanger(){
    
    document.body.style.backgroundColor = randomColorChange();
}

const startChangingColor =  function(){
    if(!intervalId2){
intervalId2  =   setInterval(backgroundChanger , 400)
    }

    };

const stopColor = function(){
    clearInterval(intervalId2);
    intervalId2 = null;

}

startBtn.addEventListener('click', startChangingColor);
stopBtn.addEventListener('click' , stopColor)


// ======================================================================================

const newProject = document.querySelector('.project7');

function newFun(e) {
    newProject.innerHTML = `
    <div>
        <table style="margin:10rem auto; display:flex; justify-content:center; align-items:center;">
            <tr style="border:1px solid white;">
                <th>Key</th>
                <th>Key Code</th>
                <th>Code</th>
            </tr>
            <tr>
                <td>${e.key}</td>
                <td>${e.keyCode || 'N/A'}</td>
                <td>${e.code}</td>
            </tr>
        </table>  
    </div>  
`;

}

// ✅ Listen for keypress event
window.addEventListener('keydown', newFun);

});

