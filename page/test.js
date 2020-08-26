// getRadicand() {
//   let indexNextSignsArr = [];
//   let openingBracket;
//   let closingBracket;
//   let extractedNum;
//   let substr;
//
//   const indexRoot = this.currentString.indexOf('√');
//
//   if (this.currentString.indexOf('(') !== -1 && this.currentString.indexOf('(') > indexRoot) {
//     openingBracket = this.currentString.indexOf('(');
//   }
//   if (this.currentString.indexOf(')') !== -1 && this.currentString.indexOf(')') > indexRoot) {
//     closingBracket = this.currentString.indexOf(')');
//   }
//   Object.keys(arithmeticRunesMap).forEach(key => {
//     if (this.currentString.indexOf(key) !== -1 && this.currentString.indexOf(key) > indexRoot) {
//       indexNextSignsArr.push(this.currentString.indexOf(key));
//     }
//   })
//
//   if (openingBracket) {
//     extractedNum = eval(this.currentString.substring(openingBracket + 1, closingBracket)); // извлеченное число (9)
//     substr = this.currentString.substring(indexRoot, closingBracket + 1); // субстрока (√(7+2));
//   } else {
//     extractedNum = this.currentString.substring(indexRoot + 1, indexNextSignsArr[0]); // извлеченное число (9)
//     substr = this.currentString.substring(indexRoot, indexNextSignsArr[0]); // субстрока (√9);
//   }
//   const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
//   return this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
// }
//
// getSquareNum() {
//   const indexPower = this.currentString.indexOf('²');
//   let indexPrevSignsArr = [];
//   let openingBracket;
//   let closingBracket;
//   let extractedNum;
//   let substr;
//
//   if (this.currentString.indexOf('(') !== -1 && this.currentString.indexOf('(') < indexPower) {
//     openingBracket = this.currentString.indexOf('(');
//   }
//   if (this.currentString.indexOf(')') !== -1 && this.currentString.indexOf(')') < indexPower) {
//     closingBracket = this.currentString.indexOf(')');
//   }
//   Object.keys(arithmeticRunesMap).forEach(key => {
//     if (this.currentString.indexOf(key) !== -1 && this.currentString.indexOf(key) < indexPower) {
//       indexPrevSignsArr.push(this.currentString.indexOf(key));
//     }
//   })
//
//   if (openingBracket && openingBracket !== -1) {
//     extractedNum = eval(this.currentString.substring(openingBracket + 1, closingBracket)); // извлеченное чило (2)
//     substr = this.currentString.substring(openingBracket, indexPower + 1); // субстрока (1+1)²
//   } else {
//     extractedNum = this.currentString.substring(indexPrevSignsArr[indexPrevSignsArr.length - 1] + 1, indexPower) // извлеченное чило (2)
//     substr = this.currentString.substring(indexPrevSignsArr[length - 1], indexPower + 1); // субстрока (2²)
//   }
//   const resultSubstr = Math.pow(extractedNum, 2); // результат субстроки (4)
//   return this.currentString.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
// }

// Object.keys(arithmeticRunesMap).forEach(key => {
//   const sign = arithmeticRunesMap[key];
//   if (this.currentString.indexOf(sign) !== -1 && this.currentString.indexOf(sign) > indexRoot) {
//     console.log(this.currentString.indexOf(sign))
//     indexNextSignsArr.push(this.currentString.indexOf(sign));
//   }
// })
//
// indexNextSignsArr.sort((a, b) => a - b);


// // пусто _ пусто
// console.log(!this.getBeforeLastSymbol(), !this.getLastSymbol())
// // 0 _ .
// console.log(this.getBeforeLastSymbol() === '0', this.getLastSymbol() === '.')
// // ? _ num
// console.log(Number(this.getLastSymbol()))
// // есть знак и он не 0 __ 0
// console.log(!!this.getBeforeLastSymbol(), this.getBeforeLastSymbol() !== '0', this.getLastSymbol() === '0')
// // . __ 0
// console.log(this.getBeforeLastSymbol() === '0', this.getLastSymbol() === '0')
// console.log('==============================================')
// if ((!this.getBeforeLastSymbol() && !this.getLastSymbol()) ||  // false false
//   (this.getBeforeLastSymbol() === '0' && this.getLastSymbol() === '.') || // . 0
//   (Number(this.getLastSymbol())) ||
//   (!!this.getBeforeLastSymbol() && this.getBeforeLastSymbol() !== '0' && this.getLastSymbol() === '0') ||
//   (this.getBeforeLastSymbol() === '0' && this.getLastSymbol() === '0')) { //  number ...
//   isValid = true;
// }