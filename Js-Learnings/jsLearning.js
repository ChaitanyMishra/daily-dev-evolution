// Selecting Elements
const heading = document.getElementById('heading');
console.log(heading);
const infoHeading = document.querySelectorAll('.info');
console.log(infoHeading);
const button = document.querySelector('button');
console.log(button);

// Modifying Heading
heading.innerText = 'Welcome to the DOM Manipulation Lecture';
heading.style.color = 'darkblue';
heading.style.backgroundColor = "lightgray";
heading.style.fontSize = "40px";
heading.style.padding = "10px";
heading.style.borderRadius = "5px";

// Styling Multiple Elements
infoHeading.forEach(f => {
    f.style.color = 'orange';
    f.style.fontSize = '1.65rem';
});

// Styling Button
button.style.padding = '1.2rem';
button.style.backgroundColor = 'lightblue';
button.style.borderRadius = '1rem';
button.innerText = 'Tap me';

// Changing Button Color on Click
const changeColor = () => {
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.style.backgroundColor = 'lightblue';
        button.style.color = 'black';
    }, 2000);
};
button.addEventListener('click', changeColor);

// Handling Input Change
const input = document.getElementById('input');
const display = document.getElementById('inputChange');
const output = document.getElementById('outputWindow');

const changeName = () => {
    const namE = input.value.trim();
    output.value = `hello ${namE}`;
    output.style.backgroundColor = 'pink';
    output.style.color = 'black';
};
display.addEventListener('click', changeName);

// Handling List Item Addition
const inputCity = document.getElementById('inputItem');
const listItem = document.getElementById('cityList');
const addNewItem = document.getElementById('addItem');
const delItem = document.getElementById('delCity');

let newItem = () => {
    const cityName = inputCity.value.trim();
    if (!cityName) return;

    const newItem = document.createElement('li'); 
    newItem.textContent = cityName;
    newItem.classList.add('list'); 

    listItem.appendChild(newItem); 
    inputCity.value = ''; 
};
addNewItem.addEventListener('click', newItem);

const removeItem = () =>{
    listItem.lastElementChild.remove()
}
delItem.addEventListener('click' , removeItem);




// Selecting and Highlighting City
const city = document.querySelectorAll('.list');
const cityButton = document.querySelector('#selectCity');
let selectCity = () => {
    if (city.length > 0) {
        city[0].classList.add('heading');
    }
};
cityButton.addEventListener('click', selectCity);





// Order Confirmation
const getOrder = document.getElementById('confirfOrder');
const confirmOrder = document.getElementById('confirm');

const temp = () => {
    getOrder.innerText = 'Order Placed Successfully';
    getOrder.style.backgroundColor = 'red';
    getOrder.style.color = 'white';
    getOrder.style.fontSize = '2rem';
    getOrder.style.borderRadius = '0.7rem';
    getOrder.style.padding = '1rem';
};
confirmOrder.addEventListener('click', temp);




// ----------------------------------------------------------

const feedbackContainer = document.querySelector('#feedback');
const feedbackInput = document.querySelector('#feedBackInput')
const feedbackSubmitButton = document.querySelector('.feedbackSubmit')
const feedbackDisplayArea = document.querySelector('#feedbackDisplay')


showFeedback = () =>{
    feedbackDisplayArea.innerText = feedbackInput.value.trim()
}
feedbackSubmitButton.addEventListener('click' , showFeedback);
// ==================================================================

const newBtn = document.createElement('button')
newBtn.innerText = 'Click Me';
newBtn.style.backgroundColor = 'red'
newBtn.style.color = 'white'
newBtn.style.margin = '1rem'
newBtn.style.padding = '1rem'
newBtn.style.textAlign = 'center'; 
newBtn.style.borderRadius = '0.7rem'
newBtn.style.fontSize = '1.1rem'
newBtn.style.boxShadow = 'red'
feedbackContainer.prepend(newBtn)
newBtn.classList.add('feedbackSubmit')
newBtn.type = 'button'
//===============================================
const body = document.querySelector('html');
const changeTheam = document.querySelector('#darkMode');

let currentMode = 'light'; // Default mode

const changeBackgroundColor = () => {
    if(currentMode === 'light'){
        body.style.backgroundColor = 'black'
        changeTheam.innerText = 'dark Mode'
        changeTheam.style.color='white'
        currentMode = 'dark'

    }
    else{
        body.style.backgroundColor = 'white'
        changeTheam.style.color='darkred'
        changeTheam.innerText = 'light Mode'
        currentMode = 'light'
    }
};

changeTheam.addEventListener('click', changeBackgroundColor);

