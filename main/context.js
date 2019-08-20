const obj = {
  sum: 'Sum'
};

function ctxClouser(a, b) {
  console.log(`${this.sum} - ${a + b}`);
}

ctxClouser.call(obj, 10, 10);
