const CALCULATION_TEXT_DEFAULT = "",
    DISPLAY_NUMBER_DEFAULT = "0",
    DISPLAY_NUMBER_MAX = 14,
    DECIMAL_ACTIVE_DEFAULT = false,
    DECIMAL_PLACES_MAX = 4,
    OPERATE_ACTIVE_DEFAULT = false;
    ERROR_MESSAGE = "WTF BRO";

let calculationText,
    displayNumber,
    decimalActive,
    operateActive

function setToDefault() {
    calculationText = CALCULATION_TEXT_DEFAULT;
    displayNumber = DISPLAY_NUMBER_DEFAULT;
    decimalActive = DECIMAL_ACTIVE_DEFAULT;
    operateActive = OPERATE_ACTIVE_DEFAULT;
}

function add(first, second) {
    return (+(first + second).toFixed(DECIMAL_PLACES_MAX)).toString();
}

function subtract(first, second) {
    return (+(first - second).toFixed(DECIMAL_PLACES_MAX)).toString();
}

function multiply(first, second) {
    return (+(first * second).toFixed(DECIMAL_PLACES_MAX)).toString();
}

function divide(first, second) {
    if (second === 0) return ERROR_MESSAGE;
    return (+(first / second).toFixed(DECIMAL_PLACES_MAX)).toString();
}

function operate(first, operator, second) {
    switch (operator) {
        case "+": return add(first, second);
        case "-": return subtract(first, second);
        case "×": return multiply(first, second);
        case "÷": return divide(first, second);
    }
}

function checkDecimalActive() {
    if (displayNumber.includes(".")) decimalActive = true;
    else decimalActive = false;
}

function checkDecimalZero() {
    if (decimalActive && +decimalActive === 0) return true;
    return false; 
}

function checkDecimalPlaces(number=displayNumber) {
    if (decimalActive) {
        const decimalPoint = number.indexOf(".");
        return number.length - decimalPoint;
    }
    return 0;
}

function formatDisplayNumber() {
    if (displayNumber === "-") displayNumber = DISPLAY_NUMBER_DEFAULT;
    else if (decimalActive) {
        const lastChar = displayNumber[displayNumber.length - 1];
        if (displayNumber === ".") displayNumber = "0.";
        else if (lastChar !== "." && !checkDecimalZero) displayNumber = (+displayNumber).toString();
    }
    else if (displayNumber !== ERROR_MESSAGE) displayNumber = (+displayNumber).toString();
}

function getExponentialPart(number) {
    const indexOfExponential = number.indexOf("e");
    return (+number.slice(indexOfExponential + 1)).toString();
}

function limitNumberLength(number=displayNumber) {
    if (number.length > DISPLAY_NUMBER_MAX) {
        let limitedNumber = `${number[0]}.`;
        for (let i = 1; i <= DECIMAL_PLACES_MAX; i++) {
            if (number[i] === ".") {
                number = number.slice(0, i) + number.slice(i + 1);
                i--;
                continue;
            }
            limitedNumber += number[i];
        }

        let exponent;
        if (number.includes("e")) exponent = getExponentialPart(number);
        else exponent = number.length - 1;

        if (decimalActive) exponent -= checkDecimalPlaces(number);
        limitedNumber += `e+${exponent}`;
        return limitedNumber;
    };
    return number;
}

function limitCalculationLength() {
    const calculationTextArray = calculationText.split(" ");
    let limitedCalculation = "";
    if (calculationTextArray[0]) limitedCalculation += `${limitNumberLength(calculationTextArray[0])} ${calculationTextArray[1]}`;
    if (calculationTextArray[2]) limitedCalculation += ` ${limitNumberLength(calculationTextArray[2])} ${calculationTextArray[3]}`;
    return limitedCalculation;
}

function populateDisplay() {
    formatDisplayNumber();

    const result = document.querySelector("#result");
    result.textContent = limitNumberLength();

    const calculation = document.querySelector("#calculation");
    calculation.textContent = limitCalculationLength(calculationText);
}

function changeOperator(newOperator) {
    const number = calculationText.split(" ")[0];
    displayNumber = number;
    calculationText = number;
    calculationText += ` ${newOperator}`;
    populateDisplay();
    displayNumber = DISPLAY_NUMBER_DEFAULT;
}

function updateDisplay() {
    const buttons = document.querySelector("#buttons");
    let operation,
        operationResult;

    buttons.addEventListener("click", e => {
        if (e.target.classList.contains("number") 
        && displayNumber.length <= DISPLAY_NUMBER_MAX && checkDecimalPlaces() <= DECIMAL_PLACES_MAX) {
            displayNumber += e.target.id;
            operateActive = true;
            populateDisplay();
        }
        else if (e.target.id === "decimal" && !decimalActive) {
            displayNumber += ".";
            decimalActive = true;
            populateDisplay();
        }
        else if (e.target.classList.contains("operator")) {
            if (operateActive) {
                operation = `${calculationText} ${displayNumber}`.split(" ");

                if (operation.length === 3 && operation[2]) {
                    operationResult = operate(+operation[0], operation[1], +operation[2]);
                    calculationText += ` ${displayNumber} = `;
                    displayNumber = operationResult;
                    populateDisplay();
                    if (operationResult === ERROR_MESSAGE) displayNumber = DISPLAY_NUMBER_DEFAULT;
                }

                if (e.target.id !== "equal") {
                    calculationText = `${displayNumber} ${e.target.textContent}`;
                    populateDisplay();
                    displayNumber = DISPLAY_NUMBER_DEFAULT;
                }
            }
            else if (e.target.id !== "equal") changeOperator(e.target.textContent);

            if (e.target.id !== "equal") operateActive = false;
        }
        checkDecimalActive();
    });
}

function del() {
    const deleteButton = document.querySelector("#delete");
    deleteButton.addEventListener("click", () => {
        const lastChar = displayNumber[displayNumber.length - 1];
        if (lastChar) displayNumber = displayNumber.slice(0, -1);
        populateDisplay();
    })
}

function clear() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", () => {
        setToDefault();
        populateDisplay();
    })
}

function run() {
    setToDefault();
    populateDisplay();
    updateDisplay();
    del();
    clear();
}

run();
