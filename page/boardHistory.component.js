class BoardHistory {
  historyOperation;
  currentHistoryOperation = '';

  constructor() {
    this.historyOperation = document.querySelector('#history-operation');
  }

  showHistoryOperation(currentString, currentResult) {
    if (currentString && currentResult) {
      this.currentHistoryOperation = `${ currentString } = <br>${ currentResult }<br><br>`;
      this.historyOperation.innerHTML += this.currentHistoryOperation;
    } else {
      this.currentHistoryOperation = '';
      this.historyOperation.innerHTML = this.currentHistoryOperation;
    }
  }
}