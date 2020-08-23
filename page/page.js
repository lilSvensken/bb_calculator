class Calculator {
  boardValueWrapperElem;
  btnsKeyboard;
  operatingStrElem;
  btnResult;
  resultElem;
  btnClear;
  toggleOnOff;
  historyOperation;
  includedCalc = false;
  arithmeticSigns = ['+', '-', '*', '/', '.', '(', ')', '√', '²'];
  enterFirstKey = false;
  lastNameKey;

  constructor() {
    this.boardValueWrapperElem = document.querySelectorAll('.board-value-wrapper');
    this.btnsKeyboard = document.querySelectorAll('.btn');
    this.operatingStrElem = document.querySelector('#operating-str');
    this.btnResult = document.querySelector('#btn-result');
    this.resultElem = document.querySelector('#result');
    this.btnClear = document.querySelector('#clear');
    this.toggleOnOff = document.querySelector('#toggle-on-off');
    this.historyOperation = document.querySelector('#history-operation');

    this.btnsKeyboard.forEach(elem => {
      elem.onclick = () => {
        const nameKey = elem.getAttribute('data-val');
        this.showOperatingStr(nameKey);
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
            if (Number(nameKey) || nameKey === '0' || this.arithmeticSigns.some((sign) => nameKey === sign)) {
              this.showOperatingStr(nameKey);
            }
          }
      }
    }
  }

  showOperatingStr(nameKey) {
    if (this.enterFirstKey) {
      if ((Number(this.lastNameKey) || this.lastNameKey === '0') && nameKey !== '√' && nameKey !== '(' ||
        this.lastNameKey === '(' && (Number(nameKey) || nameKey === '-' || nameKey === '√') ||
        this.lastNameKey === '-' && (Number(nameKey) || nameKey === '(' || nameKey === '√') ||
        this.lastNameKey === '²' && (Number(nameKey) || nameKey === '+' || nameKey === '-' || nameKey === '*' || nameKey === '/') ||
        this.lastNameKey === ',' && Number(nameKey) ||
        this.lastNameKey === '+' && nameKey === '√' ||
        this.lastNameKey === '-' && nameKey === '√' ||
        this.lastNameKey === '*' && nameKey === '√' ||
        this.lastNameKey === '/' && nameKey === '√') {
        this.operatingStrElem.innerHTML += nameKey;
        this.lastNameKey = nameKey;
      }
      this.arithmeticSigns.forEach(sign => {
        if (this.lastNameKey === sign && Number(nameKey) ||
          this.lastNameKey === sign && nameKey === '(' && this.lastNameKey !== '(' && this.lastNameKey !== '²' ||
          this.lastNameKey === ')' && nameKey === sign && nameKey !== ')' && nameKey !== '√') {
          this.operatingStrElem.innerHTML += nameKey;
          this.lastNameKey = nameKey;
        }
      })
    } else if (Number(nameKey) || nameKey === '(' || nameKey === '-' || nameKey === '√') {
      this.operatingStrElem.innerHTML += nameKey;
      this.lastNameKey = nameKey;
      this.enterFirstKey = true;
    }
  }

  showResult() {
    let arithmeticStr = this.operatingStrElem.innerHTML;
    if (arithmeticStr) {
      for (let i = 0; i < arithmeticStr.length; i++) {
        let calculatedNum;
        let resultCalculatedNum;
        let substr;
        if (arithmeticStr[i] === '√') {
          calculatedNum = this.getRadicand(arithmeticStr)
          console.log(calculatedNum)
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
    this.showHistoryOperation(this.operatingStrElem.innerHTML, this.resultElem.innerHTML);
  }

  showHistoryOperation(operatingStr, result) {
    this.historyOperation.innerHTML += `${ operatingStr } = <br>`;
    this.historyOperation.innerHTML += `${ result }<br>`;
  }

  clearLastSymbolHistory() {
    let historyStr = this.operatingStrElem.innerHTML;
    this.operatingStrElem.innerHTML = historyStr.substr(0, historyStr.length - 1);
    this.lastNameKey = historyStr.substr(historyStr.length - 1, 1);
    this.arithmeticSigns.forEach(sign => {
      if (this.lastNameKey === sign) {
        this.lastNameKey = historyStr.substr(historyStr.length - 2, 1);
      }
    });
    if (historyStr.length === 1) {
      this.enterFirstKey = false;
    }
  }

  clearAllCalculations() {
    this.operatingStrElem.innerHTML = '';
    this.resultElem.innerHTML = '';
    this.enterFirstKey = false;
  }

  toggleCalc() {
    if (this.includedCalc) {
      this.resultElem.innerHTML = '';
      this.operatingStrElem.innerHTML = '';
      this.historyOperation.innerHTML = '';
      this.boardValueWrapperElem.forEach(elem => elem.classList.remove('mod-active'));
      this.btnsKeyboard.forEach(elem => {
        elem.classList.remove('mod-active');
      })
      this.includedCalc = false;
    } else {
      this.resultElem.innerHTML = '';
      this.boardValueWrapperElem.forEach(elem => elem.classList.add('mod-active'));
      this.btnsKeyboard.forEach(elem => {
        elem.classList.add('mod-active');
      })
      this.includedCalc = true;
    }
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