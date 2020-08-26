class BoardValue {
  operatingStrElem;
  resultElem;

  constructor() {
    this.operatingStrElem = document.querySelector('#operating-str');
    this.resultElem = document.querySelector('#result');
  }

  showOperatingStr(currentString) {
    this.operatingStrElem.innerHTML = currentString;
  }

  showResult(currentResult) {
    this.resultElem.innerHTML = currentResult;
  }
}