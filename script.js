const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.querySelector('.clear')

let firstNum = 0
let operatorValue = ''
let awaitingVal = false

function sendNum (num) {
        // replace current value once inputed
        if (awaitingVal) {
            calculatorDisplay.textContent = num
            awaitingVal = false
        }else {
            const displayValue = calculatorDisplay.textContent
            calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num        
        }    
}

// adding decimal function
function addDecimal () {
    // is operator is pressed, prevent decimal addition
    if (awaitingVal) return
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// calcution logic
const calculate = {
    '/' : (firstNumber, secondNum) => firstNumber / secondNum,
    '*' : (firstNumber, secondNum) => firstNumber * secondNum,
    '+' : (firstNumber, secondNum) => firstNumber + secondNum,
    '-' : (firstNumber, secondNum) => firstNumber - secondNum,
    '=' : (firstNumber, secondNum) =>  secondNum,
}

function useOperator (operator) {
    // prevent multiple operators
    if (operatorValue && awaitingVal){
        operatorValue = operator
        return
    } 
const currentValue  = Number (calculatorDisplay.textContent)
// assign first value if no value 
if (!firstNum) {
    firstNum = currentValue
} else {
const calculation = calculate[operatorValue](firstNum, currentValue)
calculatorDisplay.textContent = calculation
firstNum = calculation
}
// second value
awaitingVal = true
operatorValue = operator
}

// add eventlisteners
inputBtns.forEach ((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNum(inputBtn.value))
    }else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

// rest all
function resetAll () {
    calculatorDisplay.textContent = '0'
     firstNum = 0
     operatorValue = ''
     awaitingVal = false
}

clearBtn.addEventListener('click', resetAll)
 
// function sum (a, b) {
//     return a + b
// } 
// function subtract (a, b) {
//     return a - b
// } 
// function multiply (a, b) {
//     return a * b
// } 
// function divide (a, b) {
//     return a / b
// } 
// const add =multiply(2, 4)

// console.log(add)

// const two = document.querySelector('#two') 


// two.addEventListener('click', () => {
//     let newTwo = two.value
//     console.log(newTwo)
// })