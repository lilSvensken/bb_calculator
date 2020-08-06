class Page {
  showHistory = new ShowHistory();

  constructor() {

  }
}

class ShowHistory {
  btnsKeyboard;
  historyElem;
  btnResult;
  resultElem;
  btnClear;
  toggleOnOff;
  includedCalc = false;

  constructor() {
    this.btnsKeyboard = document.querySelectorAll('.btn');
    this.historyElem = document.querySelector('#history-operation');
    this.btnResult = document.querySelector('#btn-result');
    this.resultElem = document.querySelector('#result');
    this.btnClear = document.querySelector('#clear');
    this.toggleOnOff = document.querySelector('#toggle-on-off');

    this.btnsKeyboard.forEach(elem => {
      elem.onclick = () => {
        const nameKey = elem.getAttribute('data-val')
        this.showHistory(nameKey);
      }
    })

    this.btnResult.onclick = () => {
      this.showResult();
    }

    this.btnClear.onclick = () => {
      this.historyClearLastSymbol();
    }

    this.btnClear.ondblclick = () => {
      this.historyClearAll();
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
          this.historyClearLastSymbol();
          break;
        case 'Delete':
          this.historyClearAll();
          break;
        case 'Escape':
          this.toggleCalc();
          break;
        default:
          if (Number(nameKey) ||
            nameKey === '+' ||
            nameKey === '-'||
            nameKey === '*' ||
            nameKey === '/'||
            nameKey === '='||
            nameKey === '.') {
            this.showHistory(nameKey);
          }
      }
    }
  }

  showHistory(nameKey) {
    this.historyElem.innerHTML += nameKey;
  }

  showResult() {
    if (this.historyElem.innerHTML) {
      this.resultElem.innerHTML = window.eval(this.historyElem.innerHTML);
    }
  }

  historyClearLastSymbol() {
    let historyStr = this.historyElem.innerHTML;
    this.historyElem.innerHTML = historyStr.substr(0, historyStr.length - 1);
  }

  historyClearAll() {
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
}

window.onload = () => {
  new Page();
}