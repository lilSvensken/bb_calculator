const arithmeticRunesMap = { // todo
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

const rulesMap = {
  ['+']: {
    last: [...numbers, ')', '²'],
    prev: []
  },
  ['-']: {
    last: ['', ...numbers, ')', '²'],
    prev: []
  },
  ['*']: {
    last: [...numbers, ')', '²'],
    prev: []
  },
  ['/']: {
    last: [...numbers, ')', '²'],
    prev: []
  },
  ['.']: {
    last: [...numbers],
    prev: []
  },
  ['(']: {
    last: ['+', '-', '*', '/', '√'],
    prev: []
  },
  [')']: {
    last: [...numbers, '²'],
    prev: ['(']
  },
  ['√']: {
    last: ['+', '-', '*', '/', '('],
    prev: []
  },
  ['²']: {
    last: [...numbers],
    prev: []
  },
  ['0']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['1']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['2']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['3']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['4']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['5']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['6']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['7']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['8']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
  ['9']: {
    last: ['', ...numbers, '+', '-', '*', '/', '.', '(', '√'],
    prev: []
  },
}

class Calculator {
  boardValueElem;
  btnsKeyboard;
  operatingStrElem;
  resultElem;
  historyOperation;
  enabledCalc = false;
  arithmeticSigns = [ // todo удалить
    arithmeticRunesMap.plus,
    arithmeticRunesMap.minus,
    arithmeticRunesMap.factor,
    arithmeticRunesMap.delimiter,
    arithmeticRunesMap.dot,
    arithmeticRunesMap.open,
    arithmeticRunesMap.close,
    arithmeticRunesMap.square,
    arithmeticRunesMap.power
  ];
  enterFirstKey = false;
  lastNameKey = '';
  currentString = '';

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
            this.showResult();
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
      switch (nameKey) {
        case '=':
        case 'Enter':
          this.showResult();
          break;
        case 'Backspace':
          this.clearLastSymbol();
          break;
        case 'Delete':
          if (this.enabledCalc) { // todo прибраться
            this.clearAllCalculations();
          }
          break;
        case 'Escape':
          this.toggleCalc();
          break;

        default:
          if (this.enabledCalc) {
            this.inputNewSymbol(nameKey);
          }
      }
    }
  }

  inputNewSymbol(nameKey) {
    if (rulesMap[nameKey] && rulesMap[nameKey].last.includes(this.lastNameKey)) {

      if (this.currentString && rulesMap[nameKey].prev.length) {
        for (let i = this.currentString.length - 1; i >= 0; i--) {
          if (rulesMap[nameKey].prev.includes(this.currentString[i])) {
            this.addNewSymbol(nameKey);
            this.showOperatingStr();
          }
        }
      } else {
        this.addNewSymbol(nameKey);
        this.showOperatingStr();
      }
    }
  }

  addNewSymbol(nameKey) {
    this.currentString += nameKey;
    this.lastNameKey = nameKey;
    this.enterFirstKey = true;
  }

  showOperatingStr() {
    this.operatingStrElem.innerHTML = this.currentString;


    // if (this.enterFirstKey) {
    //
    //   // todo проставить скобки
    //   if ((Number(this.lastNameKey) || this.lastNameKey === '0') && nameKey !== '(' && nameKey !== ')' && nameKey !== '√' ||
    //     this.lastNameKey === '(' && (Number(nameKey) || nameKey === '-' || nameKey === '√') ||
    //     this.lastNameKey === '-' && (Number(nameKey) || nameKey === '(' || nameKey === '√') ||
    //     this.lastNameKey === '²' && (Number(nameKey) || nameKey === '+' || nameKey === '-' || nameKey === '*' || nameKey === '/') ||
    //     this.lastNameKey === ',' && Number(nameKey) ||
    //     this.lastNameKey === '+' && nameKey === '√' ||
    //     this.lastNameKey === '-' && nameKey === '√' ||
    //     this.lastNameKey === '*' && nameKey === '√' ||
    //     this.lastNameKey === '/' && nameKey === '√') {
    //     this.operatingStrElem.innerHTML += nameKey;
    //     this.lastNameKey = nameKey;
    //   }
    //   this.arithmeticSigns.forEach(sign => {
    //     if (this.lastNameKey === sign && Number(nameKey) ||
    //       this.lastNameKey === sign && nameKey === '(' && this.lastNameKey !== '(' && this.lastNameKey !== '²' ||
    //       this.lastNameKey === ')' && nameKey === sign && nameKey !== ')' && nameKey !== '√') {
    //       this.operatingStrElem.innerHTML += nameKey;
    //       this.lastNameKey = nameKey;
    //     }
    //   })
    // } else if (Number(nameKey) || nameKey === '(' || nameKey === '-' || nameKey === '√') {
    //   this.operatingStrElem.innerHTML += nameKey;
    //   this.lastNameKey = nameKey;
    //   this.enterFirstKey = true;
    // }
  }

  showResult() {
    let arithmeticStr = this.operatingStrElem.innerHTML;

    for (let i = 0; i < arithmeticStr.length; i++) {
      if (arithmeticStr[i] === '√') {
        arithmeticStr = this.getRadicand(arithmeticStr);
      }
      if (arithmeticStr[i] === '²') {
        arithmeticStr = this.getSquareNum(arithmeticStr);
      }
    }

    if (arithmeticStr) {
      try {
        this.resultElem.innerHTML = window.eval(arithmeticStr);
        this.showHistoryOperation(this.operatingStrElem.innerHTML, this.resultElem.innerHTML);
      } catch {
        // при ошибке не считаем. catch - что бы js Не ругался
      }
    } else {
      this.resultElem.innerHTML = '0';
    }
  }

  showHistoryOperation(operatingStr, result) {
    this.historyOperation.innerHTML += `${ operatingStr } = <br>${ result }<br><br>`;
  }

  clearLastSymbol() {
    this.currentString = this.currentString.slice(0, -1);
    this.lastNameKey = this.currentString.slice(-1);
    this.enterFirstKey = this.currentString.length === 1;
    this.showOperatingStr();
  }

  clearAllCalculations() {
    this.currentString = '';
    this.lastNameKey = '';
    this.enterFirstKey = false;
    this.showOperatingStr();
    this.resultElem.innerHTML = '';
  }

  toggleCalc() {
    if (this.enabledCalc) {
      this.currentString = '';
      this.lastNameKey = '';
      this.enabledCalc = false;
      this.resultElem.innerHTML = '';
      this.historyOperation.innerHTML = '';
      this.showOperatingStr();
      this.boardValueElem.forEach(elem => elem.classList.remove('mod-active'));
      this.btnsKeyboard.forEach(elem => elem.classList.remove('mod-active'));
    } else {
      this.boardValueElem.forEach(elem => elem.classList.add('mod-active'));
      this.btnsKeyboard.forEach(elem => elem.classList.add('mod-active'));
      this.enabledCalc = true;
    }
  }

  getRadicand(arithmeticStr) {
    let indexNextSignsArr = [];
    let openingBracketArr = [];
    let closingBracketArr = [];
    let extractedNum;
    let substr;

    const indexRoot = arithmeticStr.indexOf('√');

    for (let i = 0; i < arithmeticStr.length; i++) {
      if (arithmeticStr[i] === '(' && i > indexRoot) {
        openingBracketArr.push(i);
      }
      if (arithmeticStr[i] === ')' && i > indexRoot) {
        closingBracketArr.push(i);
      }
      this.arithmeticSigns.forEach(sign => {
        if (arithmeticStr[i] === sign && i > indexRoot && arithmeticStr[i] !== '(' && arithmeticStr[i] !== ')') {
          indexNextSignsArr.push(i);
        }
      })
    }

    if (openingBracketArr.length) {
      extractedNum = eval(arithmeticStr.substring(openingBracketArr[0] + 1, closingBracketArr[0])); // извлеченное число (9)
      substr = arithmeticStr.substring(indexRoot, closingBracketArr[0] + 1); // субстрока (√(7+2));
    } else {
      extractedNum = arithmeticStr.substring(indexRoot + 1, indexNextSignsArr[0]); // извлеченное число (9)
      substr = arithmeticStr.substr(indexRoot, extractedNum.length + 1); // субстрока (√9);
    }
    const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
    return arithmeticStr.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }

  getSquareNum(arithmeticStr) {
    const indexSquareNum = arithmeticStr.indexOf('²');
    let indexPrevSignsArr = [];
    let openingBracketArr = [];
    let closingBracketArr = [];
    let extractedNum;
    let substr;

    for (let i = 0; i < arithmeticStr.length; i++) {
      if (arithmeticStr[i] === '(' && i < indexSquareNum) {
        openingBracketArr.push(i);
      }
      if (arithmeticStr[i] === ')' && i < indexSquareNum) {
        closingBracketArr.push(i);
      }
      this.arithmeticSigns.forEach(sign => {
        if (arithmeticStr[i] === sign && i < indexSquareNum && arithmeticStr[i] !== '²' && arithmeticStr[i] !== '(' && arithmeticStr[i] !== ')') {
          indexPrevSignsArr.push(i)
        }
      })
    }

    if (openingBracketArr.length) {
      extractedNum = eval(arithmeticStr.substring(openingBracketArr[0] + 1, closingBracketArr[0])); // извлеченное чило (2)
      substr = arithmeticStr.substring(openingBracketArr[0], indexSquareNum + 1); // субстрока (1+1)²
    } else {
      extractedNum = arithmeticStr.substring(indexPrevSignsArr[indexPrevSignsArr.length - 1] + 1, indexSquareNum) // извлеченное чило (2)
      substr = arithmeticStr.substr(indexSquareNum - extractedNum.length, extractedNum.length + 1); // субстрока (2²)
    }

    const resultSubstr = Math.pow(extractedNum, 2); // результат субстроки (4)
    return arithmeticStr.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }
}

window.onload = () => {
  new Calculator();
}