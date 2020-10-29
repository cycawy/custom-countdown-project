const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('count-down');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEL = document.getElementById('complete');
const completeELInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//set today's date as the Date input min
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);



//populate countdown days/hours/minutes/seconds, and update UI
function updateDOM(){
    countdownActive = setInterval(()=>{
        const now = new Date().getTime();
        const difference = countdownValue - now;
        
        const days = Math.floor(difference/day);
        const hours = Math.floor((difference%day)/hour);
        const minutes = Math.floor((difference%hour)/minute);
        const seconds = Math.floor((difference%minute)/second);
        console.log(difference, days, hours, minutes, seconds);
    
        //Hide input UI
        inputContainer.hidden = true;

        if(difference < 0){
            console.log('hit 1');
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeELInfo.textContent = `${countdownTitle} completed on ${countdownDate}`;
            completeEL.hidden = false;
        }else{
            console.log('hit 2');
            //populate countdown 
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEL.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
    
}

//take values from Form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    
    if(countdownDate === ''){
        alert("please select a date!");
    }
    else{
        //Get number of version of current date, and updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
}

//reset
function reset(){
    //hide countdown, show input UI
    countdownEl.hidden = true;
    completeEL.hidden = true;
    inputContainer.hidden = false;
    //stop countdown
    clearInterval(countdownActive);
    //reset values
    countdownTitle = '';
    countdownDate = '';

}

// //Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
