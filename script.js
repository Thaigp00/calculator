let firstNumber = 0,
    secondNumber = 0,
    operator = "+";

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
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}