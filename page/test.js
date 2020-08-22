function showHistory(nameKey) {
  if (this.enterNumberKey && this.checkForArithmeticSign(nameKey)) {
    this.historyElem.innerHTML += nameKey;
    this.enterNumberKey = false;
  } else if (Number(nameKey) || nameKey === '0' || nameKey === '(' || nameKey === '√') {
    this.historyElem.innerHTML += nameKey;
    this.enterNumberKey = true;
  }
}

function showHistory2(nameKey) {
  if (this.emptyHistory && (Number(nameKey) || nameKey === '(' || nameKey === '-' || nameKey === '√')) {
    this.historyElem.innerHTML += nameKey;
    this.emptyHistory = false;
    this.canEnterKey = true; // ???
  }
  if (this.canEnterKey && this.checkForArithmeticSign(nameKey)) {
    this.historyElem.innerHTML += nameKey;
    this.canEnterKey = false;
  }
  if (this.canEnterKey || Number(nameKey) || nameKey === '0') {
    this.historyElem.innerHTML += nameKey;
    this.canEnterKey = true;
  }
}