function showHistory(nameKey) {
  if (this.enterNumberKey && this.checkForArithmeticSign(nameKey)) {
    this.historyElem.innerHTML += nameKey;
    this.enterNumberKey = false;
  } else if (Number(nameKey) || nameKey === '0' || nameKey === '(' || nameKey === '√') {
    this.historyElem.innerHTML += nameKey;
    this.enterNumberKey = true;
  }
}