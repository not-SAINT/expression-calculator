function eval() {
    // Do not use eval!!!
    return;
}

function popUntil(stackArray, resultArray, untilArr) {

    let untilSet = new Set(untilArr);
    let op = '';
  
    while (stackArray.length > 0 && 1) {
      op = stackArray.pop();
      if (untilSet.has(op))
        if (op != '(')
          resultArray.push(op);
        else
          break;
      else {
        stackArray.push(op);
        break;
      }
    }
  
    return resultArray;
  }
  
  function expressionCalculator(expr) {  
      
    let arrLeftBrackets = (expr.match(/\(/g) && expr.match(/\(/g).length) || 0;
    let arrRightBrackets = (expr.match(/\)/g) && expr.match(/\)/g).length) || 0;
  
    if (arrLeftBrackets != arrRightBrackets)
      throw new Error('ExpressionError: Brackets must be paired');
  
    let arr = expr.trim().split(/(\d*)|(\*)|(\/)|(\+)|(\-)/).filter(el => el !== undefined).map(el => el.trim()).filter(el => el != '');
    let operationStack = [];
    let revPolishRecord = [];
  
    let prevValue = arr[0];
  
    if (isNaN(prevValue))
      operationStack.push(prevValue);
    else
      revPolishRecord.push(prevValue);
  
    for (let i = 1; i < arr.length; i++) {
      switch (arr[i]) {
        case '(':
          operationStack.push(arr[i]);
          break;
        case ')':
            if (operationStack.length == 0)
              throw new Error('ExpressionError: Brackets must be paired');
            popUntil(operationStack, revPolishRecord, ['(', '*', '/', '+', '-']);
            break;
        case '*':
        case '/':
          popUntil(operationStack, revPolishRecord, ['*', '/']);
          operationStack.push(arr[i]);
          break;
        case '+':
        case '-':
            popUntil(operationStack, revPolishRecord, ['*', '/', '+', '-']);
            operationStack.push(arr[i]);
            break;
        default:
          revPolishRecord.push(arr[i]);
          break;
      }
    }
  
    popUntil(operationStack, revPolishRecord, ['*', '/', '+', '-']);
  
    if (revPolishRecord.length == 1)
      return revPolishRecord[0];
 
    let rightVal;
    let numberstack = [];
    let tempVal;
  
    for (let i = 0; i < revPolishRecord.length; i++) {
      switch (revPolishRecord[i]) {
        case '*':
          rightVal = numberstack.pop();
          tempVal = numberstack.pop() * rightVal;
          numberstack.push(tempVal);
          break;
        case '/':
          rightVal = numberstack.pop();
          if (rightVal == 0)
            throw new Error('TypeError: Division by zero.');
          tempVal = numberstack.pop() / rightVal;
          numberstack.push(tempVal);
          break;
        case '+':
          rightVal = +numberstack.pop();
          tempVal = +numberstack.pop() + rightVal;
          numberstack.push(tempVal);
          break;
        case '-':
          rightVal = numberstack.pop();
          tempVal = numberstack.pop() - rightVal;
          numberstack.push(tempVal);
          break;
        default:
          numberstack.push(revPolishRecord[i]);
          break;
      }
    }  
    return numberstack[0];
  }  

module.exports = {
    expressionCalculator
}