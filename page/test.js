window.onload = () => {
  const btn = document.querySelectorAll('.btn')
  const historyOperationElem = document.querySelector('#history-operation')
  const btnResult = document.querySelector('#btn-result')
  const resultElem = document.querySelector('#result')

  btn.forEach(elem => {
    elem.onclick = () => {
      if (Number(elem.getAttribute('data-val'))) {
        historyOperationElem.value += `${Number(elem.getAttribute('data-val'))}`;
        console.log(Number(elem.getAttribute('data-val')))
      } else {
        historyOperationElem.value += `${elem.getAttribute('data-val')}`;
        console.log(elem.getAttribute('data-val'))
      }
    }

    btnResult.onclick = () => {
      resultElem.value = historyOperationElem.value;
    }
  })
}