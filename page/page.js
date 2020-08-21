class Page {
  operations = new Operations();

  constructor() {

  }
}

class Operations {
  btnsKeyboard;
  historyElem;
  btnResult;
  resultElem;
  btnClear;
  toggleOnOff;
  includedCalc = false;
  arithmeticSign = ['+', '-', '*', '/', '.', '(', ')', '0', '√', '²'];
  enterNumberKey = false;
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
            if (Number(nameKey) || this.checkForArithmeticSign(nameKey)) {
              this.showHistory(nameKey);
            }
          }
      }
    }
  }

  showHistory(nameKey) {
    if (this.enterNumberKey && this.checkForArithmeticSign(nameKey)) {
      this.historyElem.innerHTML += nameKey;
      this.enterNumberKey = false;
    } else if (Number(nameKey) || nameKey === '(' || nameKey === '√') {
      this.historyElem.innerHTML += nameKey;
      this.enterNumberKey = true;
    }
    if (!this.historyElem.innerHTML) {
      this.enterNumberKey = false;
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
          resultCalculatedNum = Math.sqrt(calculatedNum);
          substr = arithmeticStr.substr(i, calculatedNum.length + 1)
        }
        if (arithmeticStr[i] === '²') {
          calculatedNum = this.getSquareNum(arithmeticStr)
          console.log(123)
          resultCalculatedNum = Math.pow(calculatedNum, 2);
          substr = arithmeticStr.substring(calculatedNum.length + 1, i + 1)
        }
        arithmeticStr = arithmeticStr.replace(substr, String(resultCalculatedNum))
      }
    }
    console.log(arithmeticStr)
    this.resultElem.innerHTML = window.eval(arithmeticStr);
  }

  clearLastSymbolHistory() {
    let historyStr = this.historyElem.innerHTML;
    this.historyElem.innerHTML = historyStr.substr(0, historyStr.length - 1);
  }

  clearAllCalculations() {
    this.historyElem.innerHTML = '';
    this.resultElem.innerHTML = '0';
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
    if (this.arithmeticSign.some((sign) => nameKey === sign)) {
      enterArithmeticSign = true;
    }
    return enterArithmeticSign;
  }

  getRadicand(arithmeticStr) {
    const indexRoot = arithmeticStr.indexOf('√');
    let indexNextSignsArr = [];

    for (let i = 0; i < arithmeticStr.length; i++) {
      this.arithmeticSign.forEach(sign => {
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
      this.arithmeticSign.forEach(sign => {
        if (arithmeticStr[i] === sign && i < indexSquareNum) {
          indexPrevSignsArr.push(i)
          console.log(111) // todo 6^2 проходит по несколько раз
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
  new Page();
}