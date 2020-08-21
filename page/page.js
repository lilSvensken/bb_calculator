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
    // const historyStr = this.historyElem.innerHTML
    const historyStr = '3+5-√9+1*9'
    if (historyStr) {
      if (historyStr.match(/[√]/g)) {    // todo "(/[√]+/g)"
        const radicand = this.getRadicand(historyStr)
        this.resultElem.innerHTML = Math.sqrt(radicand);
      } else {
        this.resultElem.innerHTML = window.eval(this.historyElem.innerHTML);
      }
    }
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

  getRadicand(historyStr) {
    console.log(123);
    const indexRoot = historyStr.indexOf('√');
    let indexLastSignsArr = [];

    for (let i = 0; historyStr.length; i++) {
      this.arithmeticSign.forEach(sign => {
        if (historyStr.indexOf(sign) > indexRoot && historyStr.indexOf(sign) !== -1) {
          indexLastSignsArr.push(historyStr.indexOf(sign));
        }
      })
    }

    console.log(indexLastSignsArr)
    // this.arithmeticSign.forEach(sign => {
    //   if (historyStr.indexOf(sign) > indexRoot && historyStr.indexOf(sign) !== -1) {
    //     indexLastSignsArr.push(historyStr.indexOf(sign));
    //   }
    // })

    let lastSign = indexLastSignsArr[0];
    indexLastSignsArr.forEach(elem => {
      if (lastSign > elem) {
        lastSign = elem;
      }
    })
    const radicand = historyStr.substring(indexRoot + 1, lastSign)
    // console.log('radicand', radicand)

    return radicand
  }
}

window.onload = () => {
  new Page();
}