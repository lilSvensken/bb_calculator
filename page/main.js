const arithmeticRunesMap = {
  plus: '+',
  minus: '-',
  factor: '*',
  delimiter: '/',
  dot: '.',
  open: '(',
  close: ')',
  powerRoot: '√',
  root: '²',
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

class Main {
  btnsKeyboard;
  boardElems;
  enabledCalc = false;
  countBracketNotClosed = 0;
  dotNotSet = true;
  currentString = '';
  currentResult = '';

  boardValue = new BoardValue();
  boardHistory = new BoardHistory();

  constructor() {
    this.btnsKeyboard = document.querySelectorAll('.btn');
    this.boardElems = document.querySelectorAll('.board');

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
            this.resetCalculations();
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
          ];
          if (correctZero.some(rule => rule)) {
            isValid = true;
          }
          break;
        default:
          isValid = true;
      }
      if (isValid) {
        this.addNewSymbol(nameKey);
        this.boardValue.showOperatingStr(this.currentString);
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

  calculateResult() {
    let unmodifiedStr = '';
    if (this.currentString.includes(arithmeticRunesMap.powerRoot)) {
      unmodifiedStr = this.currentString;
      this.countPowerRoot();
    }
    if (this.currentString.includes(arithmeticRunesMap.root)) {
      unmodifiedStr = this.currentString;
      this.countRoot();
    }
    if (this.currentString) {
      try {
        this.currentResult = window.eval(this.currentString);
        this.boardValue.showResult(this.currentResult);
        if (unmodifiedStr) {
          this.boardHistory.showHistoryOperation(unmodifiedStr, this.currentResult)
        } else {
          this.boardHistory.showHistoryOperation(this.currentString, this.currentResult)
        }
        this.currentString = '';
        this.boardValue.showOperatingStr(this.currentString)
      } catch {
        // Ошибка
      }
    } else {
      this.currentResult = '0';
      this.boardValue.showResult(this.currentResult);
    }
  }

  clearLastSymbol() {
    switch (this.getLastSymbol()) {
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
    this.boardValue.showOperatingStr(this.currentString);
  }

  resetCalculations() {
    this.countBracketNotClosed = 0;
    this.dotNotSet = true;
    this.currentString = '';
    this.currentResult = '';
    this.boardValue.clearBordValue();
  }

  toggleCalc() {
    if (this.enabledCalc) {
      this.resetCalculations()
      this.boardHistory.clearShowHistory();
      this.btnsKeyboard.forEach(elem => elem.classList.remove('mod-active'));
      this.boardElems.forEach(elem => elem.classList.remove('mod-active'))
      this.enabledCalc = false;
    } else {
      this.btnsKeyboard.forEach(elem => elem.classList.add('mod-active'));
      this.boardElems.forEach(elem => elem.classList.add('mod-active'))
      this.enabledCalc = true;
    }
  }

  countPowerRoot() {
    const indexPowerRoot = this.currentString.indexOf(arithmeticRunesMap.powerRoot);
    let indexNextSign;

    for (let i = 0; i < this.currentString.length; i++) {
      Object.keys(arithmeticRunesMap).forEach(key => {
        if (!indexNextSign && this.currentString[i] === arithmeticRunesMap[key] && i > indexPowerRoot) {
          indexNextSign = i;
        }
      })
    }

    const extractedNum = window.eval(this.currentString.substring(indexPowerRoot + 1, indexNextSign)); // извлеченное число (9)
    const substr = this.currentString.substring(indexPowerRoot, indexNextSign); // субстрока (√9);
    const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
    this.currentString = this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }

  countRoot() {
    const indexRoot = this.currentString.indexOf(arithmeticRunesMap.root);
    let indexPrevSign;

    for (let i = 0; i < this.currentString.length; i++) {
      Object.keys(arithmeticRunesMap).forEach(key => {
        if (this.currentString[i] === arithmeticRunesMap[key] && i < indexRoot) {
          indexPrevSign = i;
        }
      })
    }
    const extractedNum = window.eval(this.currentString.substring(+indexPrevSign + 1, indexRoot)); // извлеченное чило (2)
    const substr = this.currentString.substring(+indexPrevSign + 1, indexRoot + 1); // субстрока (2²)
    const resultSubstr = Math.pow(extractedNum, 2); // результат субстроки (4)
    this.currentString = this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
  }
}

window.onload = () => {
  new Main();
}