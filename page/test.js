function getRadicand(historyStr) {
  console.log(historyStr);
  const indexRoot = historyStr.indexOf('√');
  let indexLastSignsArr = [];
  this.arithmeticSign.forEach(sign => {
    // const regexp = new RegExp(`${ sign }`, 'g'); // ??????
    console.log(/\+{1,4}/g.exec('3+5-√9+1*9'));
    if (historyStr.indexOf(sign) > indexRoot && historyStr.indexOf(sign) !== -1) {
      indexLastSignsArr.push(historyStr.indexOf(sign));

    }
  })

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


const arithmeticSign = ['+', '-', '*', '/', '.', '(', ')', '0', '√', '²'];
const str = '3+5-√9+1*9'
let indexLastSignsArr = [];

arithmeticSign.forEach(sign => {
  indexLastSignsArr.push(str.indexOf(sign));
})

let lastSign = indexLastSignsArr[0];
indexLastSignsArr.forEach(elem => {
  if (lastSign > elem) {
    lastSign = elem;
  }
})