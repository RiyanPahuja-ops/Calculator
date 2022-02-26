let runningTotal = 0;
let buffer = '0' //Input displayed on the screen is of type 'string' so we are going to make buffer of type 'string' as well
let previousOperator = null;
let screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener("click", function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value);
    } else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0"){
        buffer = value
    } else{
        buffer += value; //adding a number at the end of the string => first click : "7" second Click : "5" -> "75"
    }
}

function handleSymbol(value){
    switch (value){
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer= ""+ runningTotal;
            runningTotal=0;
            break;
        case "◄":
            if (buffer.length === 1){
                buffer = "0";
            } else{
                buffer = buffer.substring(0, buffer.length-1) //removing one character from the end of buffer
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = '0';
}

function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    } else if (previousOperator === '-'){
        runningTotal -= intBuffer;
    } else if (previousOperator === '/'){
        runningTotal /= intBuffer;
    } else {
        runningTotal *= intBuffer;
    }
}

function rerender(){
    screen.innerText = buffer;
}