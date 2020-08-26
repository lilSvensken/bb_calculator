const arithmeticRunesMap = {
  plus: '+',
  minus: '-',
  factor: '*',
  delimiter: '/',
  dot: '.',
  open: '(',
  close: ')',
  square: '√',
  power: '²',
}

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const rulesKeysMap = {
  ['+']: [...numbers, ')', '²'],
  ['-']: ['', ...numbers, ')', '²'],
  ['*']: [...numbers, ')', '²'],
  ['/']: [...numbers, ')', '²'],
  ['.']: [...numbers],
  ['(']: ['', '+', '-', '*', '/', '√', '('],
  [')']: [...numbers, '²', ')'],
  ['√']: ['', '+', '-', '*', '/', '('],
  ['²']: [...numbers, ')'],
  ['0']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['1']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['2']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['3']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['4']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['5']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['6']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['7']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['8']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
  ['9']: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
}

class Calculator {
  boardValueElem;
  btnsKeyboard;
  operatingStrElem;
  resultElem;
  historyOperation;
  enabledCalc = false;
  currentString = '';
  currentResult = '';
  countBracketNotClosed = 0;
  dotNotSet = true;

  constructor() {
    this.boardValueElem = document.querySelectorAll('.board-value-wrapper');
    this.btnsKeyboard = document.querySelectorAll('.btn');
    this.operatingStrElem = document.querySelector('#operating-str');
    this.resultElem = document.querySelector('#result');
    this.historyOperation = document.querySelector('#history-operation');

    this.btnsKeyboard.forEach(elem => {
      elem.onclick = () => {
        const nameKey = elem.getAttribute('data-val');
        switch (nameKey) {
          case '=':
            this.calculateResult();
            break;
          case '(стереть)':
            this.clearLastSymbol();
            break;
          case '(выход)':
            this.toggleCalc();
            break;
          default:
            this.inputNewSymbol(nameKey);
        }
      }
    });

    window.onkeydown = (e) => {
      let nameKey = e.key
      if (this.enabledCalc) {
        switch (nameKey) {
          case '=':
          case 'Enter':
            this.calculateResult();
            break;
          case 'Backspace':
            this.clearLastSymbol();
            break;
          case 'Delete':
            this.clearAllCalculations();
            break;
          case 'Escape':
            this.toggleCalc();
            break;
          default:
            this.inputNewSymbol(nameKey);
        }
      } else if (nameKey === 'Escape') {
        this.toggleCalc();
      }
    }
  }

  inputNewSymbol(nameKey) {
    let isValid = false;
    if (rulesKeysMap[nameKey] && rulesKeysMap[nameKey].includes(this.getLastSymbol())) {
      switch (nameKey) {
        case arithmeticRunesMap.open:
          this.countBracketNotClosed++;
          isValid = true;
          break;
        case arithmeticRunesMap.close:
          if (this.countBracketNotClosed) {
            this.countBracketNotClosed--;
            isValid = true;
          }
          break;
        case arithmeticRunesMap.dot:
          if (this.dotNotSet) {
            this.dotNotSet = false;
            isValid = true;
          }
          break;
        case '0':
          const correctZero = [
            !this.getBeforeLastSymbol() && !this.getLastSymbol(),
            this.getBeforeLastSymbol() === '0' && this.getLastSymbol() === '.',
            +this.getLastSymbol(),
            !!this.getBeforeLastSymbol() && this.getBeforeLastSymbol() !== '0' && this.getLastSymbol() === '0',
            this.getBeforeLastSymbol() === '0' && this.getLastSymbol() === '0'
          ]
          if (correctZero.some(elem => elem)) {
            isValid = true;
          }
          break;
        default:
          isValid = true;
      }
      if (isValid) {
        this.addNewSymbol(nameKey);
        this.showOperatingStr();
      }
    }
  }

  getLastSymbol() {
    return this.currentString.slice(-1);
  }

  getBeforeLastSymbol() {
    return this.currentString.slice(-2, -1);
  }

  addNewSymbol(nameKey) {
    this.currentString += nameKey;
  }

  showOperatingStr() {
    this.operatingStrElem.innerHTML = this.currentString;
  }

  calculateResult() {
    if (this.currentString.includes(arithmeticRunesMap.square)) {
      this.currentString = this.getRadicand();
    }
    if (this.currentString.includes(arithmeticRunesMap.power)) {
      this.currentString = this.getSquareNum();
    }
    if (this.currentString) {
      try {
        this.currentResult = window.eval(this.currentString);
        this.showResult();
        this.showHistoryOperation();
      } catch {
        // Ошибка
      }
    } else {
      this.currentResult = '0';
      this.showResult();
    }
  }

  showResult() {
    this.resultElem.innerHTML = this.currentResult;
  }

  showHistoryOperation() {
    this.historyOperation.innerHTML += `${ this.currentString } = <br>${ this.currentResult }<br><br>`;
  }

  clearLastSymbol() {
    switch (this.currentString.slice(-1)) {
      case ')':
        this.countBracketNotClosed++;
        break;
      case '(':
        this.countBracketNotClosed--;
        break;
      case '.':
        this.dotNotSet = true;
    }
    this.currentString = this.currentString.slice(0, -1);
    this.showOperatingStr();
  }

  clearAllCalculations() {
    if (this.currentString.includes('(') || this.currentString.includes(')')) {
      this.countBracketNotClosed = 0;
    }
    if (this.currentString.includes('.')) {
      this.dotNotSet = true;
    }

    this.currentString = '';
    this.showOperatingStr();
    this.currentResult = '';
    this.showResult()
  }

  toggleCalc() {
    if (this.enabledCalc) {
      this.currentString = '';
      this.showOperatingStr();
      this.currentResult = '';
      this.showResult();
      this.enabledCalc = false;
      this.historyOperation.innerHTML = '';
      this.boardValueElem.forEach(elem => elem.classList.remove('mod-active'));
      this.btnsKeyboard.forEach(elem => elem.classList.remove('mod-active'));
    } else {
      this.boardValueElem.forEach(elem => elem.classList.add('mod-active'));
      this.btnsKeyboard.forEach(elem => elem.classList.add('mod-active'));
      this.enabledCalc = true;
    }
  }

  getRadicand() {
    const indexRoot = this.currentString.indexOf(arithmeticRunesMap.square);
    let indexNextSign = '';

    for (let i = 0; i < this.currentString.length; i++) {
      Object.keys(arithmeticRunesMap).forEach(key => {
        if (!indexNextSign && this.currentString[i] === arithmeticRunesMap[key] && i > indexRoot) {
          indexNextSign = i;
        }
      })
    }
    const extractedNum = window.eval(this.currentString.substring(indexRoot + 1, indexNextSign)); // извлеченное число (9)
    const substr = this.currentString.substring(indexRoot, indexNextSign); // субстрока (√9);
    const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
    return this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }

  getSquareNum() {
    const indexPower = this.currentString.indexOf(arithmeticRunesMap.power);
    let indexPrevSign = '';

    for (let i = 0; i < this.currentString.length; i++) {
      Object.keys(arithmeticRunesMap).forEach(key => {
        if (this.currentString[i] === arithmeticRunesMap[key] && i < indexPower) {
          indexPrevSign = i;
        }
      })
    }

    const extractedNum = window.eval(this.currentString.substring(+indexPrevSign + 1, indexPower)); // извлеченное чило (2)
    const substr = this.currentString.substring(+indexPrevSign + 1, indexPower + 1); // субстрока (2²)
    const resultSubstr = Math.pow(extractedNum, 2); // результат субстроки (4)
    return this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }
}

window.onload = () => {
  new Calculator();
}