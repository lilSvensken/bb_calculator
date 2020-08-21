class Page {
  operations = new Operations();
  initializationKey = new InitializationKey();
  historyOperation = new HistoryOperation();
  resultOperation = new ResultOperation();

  constructor() {

  }
}


window.onload = () => {
  new Page();
}