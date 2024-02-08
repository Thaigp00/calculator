const displayNumberMax = 12;
let firstNumber = 0,
    secondNumber = 0,
    operator = "",
    calculationText = "",
    displayNumber = "",
    decimalActive = false;

function add(a, b) {
    return +(a + b).toFixed(2);
}

function subtract(a, b) {
    return +(a - b).toFixed(2);
}

function multiply(a, b) {
    return +(a * b).toFixed(2);
}

function divide(a, b) {
    if (b === 0) return undefined;
    return +(a / b).toFixed(2);
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "×":
            return multiply(firstNumber, secondNumber);
        case "÷":
            return divide(firstNumber, secondNumber);
    }
}

function populateDisplay() {
    const result = document.querySelector("#result");
    if (displayNumber === "WTF BRO") result.textContent = displayNumber;
    else if (displayNumber && !Number.isNaN(+displayNumber)) result.textContent = displayNumber;
    else result.textContent = "0";
    
    const calculation = document.querySelector("#calculation");
    calculation.textContent = calculationText;
}

function updateDisplay() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            if (e.target.classList.contains("number") 
            && displayNumber.toString().length <= displayNumberMax) 
            {
                displayNumber += e.target.id;
                populateDisplay();
            }
            else if (e.target.classList.contains("operator")) {
                const operation = `${calculationText} ${displayNumber}`.split(" ");
                if (operation.length === 3 && operation[2]) {
                    const result = operate(+operation[0], operation[1], +operation[2]);
                    calculationText += ` ${displayNumber} = `;
                    if (result === undefined) {
                        displayNumber = "WTF BRO";
                        populateDisplay();
                        displayNumber = "";
                    }
                    else {
                        displayNumber = result;
                        populateDisplay();
                    }
                }
                calculationText = `${+displayNumber} ${e.target.textContent}`;
                decimalActive = false;
                populateDisplay();
                displayNumber = "";
            }
            else if (e.target.id === "equal") {
                const operation = `${calculationText} ${displayNumber}`.split(" ");
                if (operation.length === 3 && operation[2]) {
                    const result = operate(+operation[0], operation[1], +operation[2]);
                    calculationText += ` ${displayNumber} = `;
                    if (result === undefined) {
                        displayNumber = "WTF BRO";
                        populateDisplay();
                        displayNumber = "";
                    }
                    else {
                        displayNumber = result;
                        populateDisplay();
                    }
                }
            }
            else if (e.target.id === "decimal" && !decimalActive) {
                displayNumber += ".";
                decimalActive = true;
                populateDisplay();
            }
        });
    });
}

function del() {
    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", () => {
        displayNumber = displayNumber.toString();
        if (displayNumber[displayNumber.length - 1]) {
            if (displayNumber[displayNumber.length - 1] === ".") decimalActive = false;
            displayNumber = displayNumber.slice(0, -1);
        }
        populateDisplay();
    })
}

function clear() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", () => {
        firstNumber = 0,
        secondNumber = 0,
        operator = "",
        calculationText = "",
        displayNumber = "",
        decimalActive = false;
        populateDisplay();
    })
}

populateDisplay();
updateDisplay();
del();
clear();