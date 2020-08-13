//Clock
const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds);
    // clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

//name
const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');
const userLs = "currentUser";

function saveName(text){
    localStorage.setItem(userLs, text);
};

function handleSubmit(event){
    const currentValue = input.value;

    event.preventDefault();
    paintGreeting(currentValue);
    saveName(currentValue);
};

function askForName(){
    form.classList.add('showing');
    form.addEventListener('submit', handleSubmit)
};

function paintGreeting(text){
    form.classList.remove('showing');
    greeting.classList.add('showing');
    greeting.innerText = `Hello ${text}`;
};

function loadName(){
    const currentUser = localStorage.getItem(userLs);
    if (currentUser === null) {
        //없을때
        askForName();
    } else {
        //있을때
        paintGreeting(currentUser);
    };
};

function init(){
    getTime();
    setInterval(getTime, 1000);
    loadName();
}
init();