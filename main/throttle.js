function throttle(func, delay) {
  let throttleActive = false;
  let hasTrailingCall = false;
  let lastCtx, lastArgs;
  let lastResult;

  const invokeThrottleFn = (ctx, args) => {
    lastResult = func.apply(ctx, args);
    throttleActive = true;

    setTimeout(() => {
      throttleActive = false;

      if (hasTrailingCall) {
        invokeThrottleFn(lastCtx, lastArgs);

        lastCtx = undefined;
        lastArgs = undefined;
        hasTrailingCall = false;
      }
    }, delay);

  };

  return function(...args) {

    if (!throttleActive) {
      invokeThrottleFn(this, args);
    } else {
      hasTrailingCall = true;
      lastCtx = this;
      lastArgs = args;
    }
    
    return lastResult;
  };
}


const startTime = Date.now();

function work(payload) {
  const timeFromStart = Date.now() - startTime;
  console.log(timeFromStart, ' - ', payload);
  return payload;
}

const twork = throttle(work, 1000);

setTimeout(() => {
  const result = twork('E');
  console.log('Result -    0: ', result)
  }, 0);
setTimeout(() => {
  const result = twork('A');
  console.log('Result -  250: ', result)
  }, 250);
setTimeout(() => {
  const result = twork('B');
  console.log('Result -  500: ', result)
  }, 500);
setTimeout(() => {
  const result = twork('C');
  console.log('Result -  750: ', result)
  }, 750);
setTimeout(() => {
  const result = twork('D');
  console.log('Result   1100: ', result)
  }, 1100);
