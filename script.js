const calculatorButtons = document.querySelector('#calculator-buttons');
const currentOperand = document.querySelector('#screen-current');
const previousOperand = document.querySelector('#screen-previous');
const controlButtons = document.querySelector('#control-buttons');

calculatorButtons.addEventListener('click', (e) => {
    if (currentOperand.textContent) {
        if (e.target.classList.contains('value') && currentOperand.textContent.length < 13) {
            updateOperand(e.target);
        } else if (e.target.classList.contains('operator')) {
            storeOperand(e.target);
        } else if (e.target.id === 'all-clear') {
            allClear();
        } else if (e.target.id === 'clear' && currentOperand.textContent !== '0') {
            clear();
        } else if (e.target.id === 'decimal') {
            addDecimal();
        } else if (e.target.id === 'equals' && previousOperand.textContent) {
            calculate();
        }
    }
});

controlButtons.addEventListener('click', (e) => {
    const batteryLight = document.querySelector('#battery-light');

    if (e.target.id === 'reset') {
        powerDown(batteryLight);
    } else if (e.target.id === 'power') {
        powerSwitch(batteryLight);
    }
});

function powerSwitch(light) {
    if (currentOperand.textContent) {
        powerDown(light);
    } else {
        currentOperand.textContent = '0';
        light.style.backgroundColor = 'var(--screen-color)';
    }
}

function powerDown(light) {
    currentOperand.textContent = '';
    previousOperand.textContent = '';
    light.style.backgroundColor = 'var(--calculator-color)';
}

function updateOperand(value) {
    if (currentOperand.textContent === '0' || currentOperand.textContent === 'Error') {
        currentOperand.textContent = value.textContent;
    } else {
        currentOperand.textContent += value.textContent;
    }
}

function storeOperand(operator) {
    previousOperand.textContent = currentOperand.textContent + ' ' + operator.textContent;
    currentOperand.textContent = '0';
}

function allClear() {
    currentOperand.textContent = '0';
    previousOperand.textContent = '';
}

function clear() {
    currentOperand.textContent = currentOperand.textContent.slice(0, -1);
}

function addDecimal() {
    if (!currentOperand.textContent.includes('.')) {
        currentOperand.textContent += '.';
    }
}

function calculate() {
    const [firstOperand, operator] = previousOperand.textContent.split(' ');
    previousOperand.textContent += ' ' + currentOperand.textContent + ' =';
    let result = 0;

    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(currentOperand.textContent);
            break;

        case '-':
            result = parseFloat(firstOperand) - parseFloat(currentOperand.textContent);
            break;

        case '*':
            result = parseFloat(firstOperand) * parseFloat(currentOperand.textContent);
            break;

        case '/':
            if (currentOperand.textContent === '0') {
                currentOperand.textContent = 'Error';
                return;
            } else {
                result = parseFloat(firstOperand) / parseFloat(currentOperand.textContent);
            }
            break;
    }

    currentOperand.textContent = String(Math.round(result * 1000) / 1000).slice(0, 13);
}
