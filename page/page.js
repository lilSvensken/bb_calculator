class Calculator {
  btnsKeyboard;
  historyElem;
  btnResult;
  resultElem;
  btnClear;
  toggleOnOff;
  includedCalc = false;
  arithmeticSigns = ['+', '-', '*', '/', '.', '(', ')', '√', '²'];

  // enterNumberKey = false;
  enterFirstKey = false;
  canEnterKey = false;
  lastKey;

  btnAddKeypad;
  additionalKeypadElem;
  showAdditionalKeypad = false;

  constructor() {
    this.btnsKeyboard = document.querySelectorAll('.btn');
    this.historyElem = document.querySelector('#history-operation');
    this.btnResult = document.querySelector('#btn-result');
    this.resultElem = document.querySelector('#result');
    this.btnClear = document.querySelector('#clear');
    this.toggleOnOff = document.querySelector('#toggle-on-off');
    this.btnAddKeypad = document.querySelector('#btn-add-keypad');
    this.additionalKeypadElem = document.querySelector('#additional-keypad-wrapper');

    this.btnsKeyboard.forEach(elem => {
      elem.onclick = () => {
        const nameKey = elem.getAttribute('data-val');
        this.showHistory(nameKey);
      }
    })

    this.btnResult.onclick = () => {
      this.showResult();
    }

    this.btnClear.onclick = () => {
      this.clearLastSymbolHistory();
    }

    this.btnClear.ondblclick = () => {
      this.clearAllCalculations();
    }

    this.toggleOnOff.onclick = () => {
      this.toggleCalc();
    }

    this.btnAddKeypad.onclick = () => {
      this.toggleAdditionalKeypad();
    }

    window.onkeydown = (e) => {
      let nameKey = e.key
      switch (nameKey) {
        case '=':
        case 'Enter':
          this.showResult();
          break;
        case 'Backspace':
          this.clearLastSymbolHistory();
          break;
        case 'Delete':
          if (this.includedCalc) {
            this.clearAllCalculations();
          }
          break;
        case 'Escape':
          this.toggleCalc();
          break;
        default:
          if (this.includedCalc) {
            if (Number(nameKey) || nameKey === '0' || this.checkForArithmeticSign(nameKey)) {
              this.showHistory(nameKey);
            }
          }
      }
    }
  }

  showHistory(nameKey) {
    if (this.enterFirstKey) {
      if ((Number(this.lastKey) || this.lastKey === '0') && nameKey !== '√' && nameKey !== '(') {
        this.historyElem.innerHTML += nameKey;
        this.lastKey = nameKey;
      }
      this.arithmeticSigns.forEach(sign => {
        if (this.lastKey === sign && Number(nameKey) ||
          this.lastKey === sign && nameKey === '(' && this.lastKey !== '(' && this.lastKey !== '²' ||
          this.lastKey === ')' && nameKey === sign && nameKey !== ')'){
          this.historyElem.innerHTML += nameKey;
          this.lastKey = nameKey;
        }
      })
      if (this.lastKey === '(' && (Number(nameKey) || nameKey === '-' || nameKey === '√') ||
        this.lastKey === '-' && (Number(nameKey) || nameKey === '(' || nameKey === '√') ||
        this.lastKey === '²' && (Number(nameKey) || nameKey === '+' || nameKey === '-' || nameKey === '*' || nameKey === '/') ||
        this.lastKey === ',' && Number(nameKey)) {
        this.historyElem.innerHTML += nameKey;
        this.lastKey = nameKey;
      }
    }

    if (!this.enterFirstKey && (Number(nameKey) || nameKey === '(' || nameKey === '-' || nameKey === '√')) {
      console.log(this.lastKey, nameKey)
      this.historyElem.innerHTML += nameKey;
      this.lastKey = nameKey;
      this.enterFirstKey = true;
    }
  }

  showResult() {
    let arithmeticStr = this.historyElem.innerHTML;
    if (arithmeticStr) {
      for (let i = 0; i < arithmeticStr.length; i++) {
        let calculatedNum;
        let resultCalculatedNum;
        let substr;
        if (arithmeticStr[i] === '√') {
          calculatedNum = this.getRadicand(arithmeticStr)
          substr = arithmeticStr.substr(i, calculatedNum.length + 1);
          resultCalculatedNum = Math.sqrt(calculatedNum);
        }
        if (arithmeticStr[i] === '²') {
          calculatedNum = this.getSquareNum(arithmeticStr);
          substr = arithmeticStr.substr(i - calculatedNum.length, calculatedNum.length + 1);
          resultCalculatedNum = Math.pow(calculatedNum, 2);
        }
        arithmeticStr = arithmeticStr.replace(substr, String(resultCalculatedNum))
      }
    }
    this.resultElem.innerHTML = window.eval(arithmeticStr);
  }

  clearLastSymbolHistory() {
    let historyStr = this.historyElem.innerHTML;
    this.historyElem.innerHTML = historyStr.substr(0, historyStr.length - 1);
    this.lastKey = historyStr.substr(historyStr.length - 1, 1);
    this.arithmeticSigns.forEach(sign => {
      if (this.lastKey === sign) {
        this.lastKey = historyStr.substr(historyStr.length - 2, 1);
      }
    });
    if (historyStr.length === 1) {
      this.enterFirstKey = false;
    }
  }

  clearAllCalculations() {
    this.historyElem.innerHTML = '';
    this.resultElem.innerHTML = '0';
    this.enterFirstKey = false;
  }

  toggleCalc() {
    if (this.includedCalc) {
      this.resultElem.innerHTML = '';
      this.historyElem.innerHTML = '';
      this.historyElem.classList.remove('mod-active');
      this.resultElem.classList.remove('mod-active');
      this.btnsKeyboard.forEach(elem => {
        elem.classList.remove('mod-active');
      })
      this.includedCalc = false;
    } else {
      this.resultElem.innerHTML = '0';
      this.historyElem.classList.add('mod-active');
      this.resultElem.classList.add('mod-active');
      this.btnsKeyboard.forEach(elem => {
        elem.classList.add('mod-active');
      })
      this.includedCalc = true;
    }
  }

  toggleAdditionalKeypad() {
    if (this.showAdditionalKeypad) {
      this.additionalKeypadElem.classList.remove('mod-show')
      this.btnAddKeypad.innerText = '>';
      this.showAdditionalKeypad = false;
    } else {
      this.additionalKeypadElem.classList.add('mod-show')
      this.btnAddKeypad.innerText = '<';
      this.showAdditionalKeypad = true;
    }
  }

  checkForArithmeticSign(nameKey) {
    let enterArithmeticSign = false;
    if (this.arithmeticSigns.some((sign) => nameKey === sign)) {
      enterArithmeticSign = true;
    }
    return enterArithmeticSign;
  }

  getRadicand(arithmeticStr) {
    const indexRoot = arithmeticStr.indexOf('√');
    let indexNextSignsArr = [];

    for (let i = 0; i < arithmeticStr.length; i++) {
      this.arithmeticSigns.forEach(sign => {
        if (arithmeticStr[i] === sign && i > indexRoot) {
          indexNextSignsArr.push(i)
        }
      })
    }

    let indexNextSign = indexNextSignsArr[0];
    indexNextSignsArr.forEach(elem => {
      if (indexNextSign > elem) {
        indexNextSign = elem;
      }
    })

    return arithmeticStr.substring(indexRoot + 1, indexNextSign)
  }

  getSquareNum(arithmeticStr) {
    const indexSquareNum = arithmeticStr.indexOf('²');
    let indexPrevSignsArr = [];

    for (let i = 0; i < arithmeticStr.length; i++) {
      this.arithmeticSigns.forEach(sign => {
        if (arithmeticStr[i] === sign && i < indexSquareNum && arithmeticStr[i] !== '²') {
          indexPrevSignsArr.push(i)
        }
      })
    }
    let indexNextSign = indexPrevSignsArr[indexPrevSignsArr.length - 1];
    indexPrevSignsArr.forEach(elem => {
      if (indexNextSign < elem) {
        indexNextSign = elem;
      }
    })

    return arithmeticStr.substring(indexNextSign + 1, indexSquareNum)
  }
}

window.onload = () => {
  new Calculator();
}