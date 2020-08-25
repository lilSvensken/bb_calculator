// function getRadicand(arithmeticStr) {
//   let indexNextSignsArr = [];
//   let openingBracketArr = [];
//   let closingBracketArr = [];
//   let extractedNum;
//   let substr;
//
//   const indexRoot = arithmeticStr.indexOf('√');
//
//   for (let i = 0; i < arithmeticStr.length; i++) {
//     if (arithmeticStr[i] === '(' && i > indexRoot) {
//       openingBracketArr.push(i);
//     }
//     if (arithmeticStr[i] === ')' && i > indexRoot) {
//       closingBracketArr.push(i);
//     }
//     this.arithmeticSigns.forEach(sign => {
//       if (arithmeticStr[i] === sign && i > indexRoot && arithmeticStr[i] !== '(' && arithmeticStr[i] !== ')') {
//         indexNextSignsArr.push(i);
//       }
//     })
//   }
//
//   if (openingBracketArr.length) {
//     extractedNum = eval(arithmeticStr.substring(openingBracketArr[0] + 1, closingBracketArr[0])); // извлеченное число (9)
//     substr = arithmeticStr.substring(indexRoot, closingBracketArr[0] + 1); // субстрока (√(7+2));
//   } else {
//     extractedNum = arithmeticStr.substring(indexRoot + 1, indexNextSignsArr[0]); // извлеченное число (9)
//     substr = arithmeticStr.substr(indexRoot, extractedNum.length + 1); // субстрока (√9);
//   }
//   const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
//   return arithmeticStr.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
// }
//
// getRadicand(arithmeticStr) {
//   let extractedNum;
//   let substr;
//   let openingBracket;
//   let closingBracket;
//   let indexNextSigns;
//
//   const indexRoot = arithmeticStr.indexOf('√');
//
//   for (let i = 0; i < arithmeticStr.length; i++) {}
//
//   if (arithmeticStr.some(elem => elem === '(')) {
//     openingBracket = arithmeticStr.indexOf('(', indexRoot + 1);
//   }
//   if (arithmeticStr.some(elem => elem === ')')) {
//     closingBracket = arithmeticStr.indexOf(')', indexRoot + 1);
//   }
//   this.arithmeticSigns.forEach(sign => {
//     if (arithmeticStr.some(elem => elem === sign)) {
//       indexNextSigns = arithmeticStr.indexOf(sign, indexRoot + 1);
//     }
//   })
//
//   if (openingBracket) {
//     extractedNum = eval(arithmeticStr.substring(openingBracket + 1, closingBracket)); // извлеченное число (9)
//     substr = arithmeticStr.substring(indexRoot, closingBracket + 1); // субстрока (√(7+2));
//   } else {
//     extractedNum = arithmeticStr.substring(indexRoot + 1, indexNextSigns); // извлеченное число (9)
//     substr = arithmeticStr.substr(indexRoot, extractedNum.length + 1); // субстрока (√9);
//   }
//   const resultSubstr = Math.sqrt(extractedNum) // результат субстроки (3)
//   return arithmeticStr.replace(substr, String(resultSubstr)) // заменяем "субстроку" на "результат субстроки"
// }