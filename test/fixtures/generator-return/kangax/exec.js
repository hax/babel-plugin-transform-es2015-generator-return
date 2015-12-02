// copy from kangax compat-table: %GeneratorPrototype%.return

function * generator(){
  yield 5; yield 6;
};
var iterator = generator();
var item = iterator.next();
var passed = item.value === 5 && item.done === false;
item = iterator.return("quxquux");
passed &= item.value === "quxquux" && item.done === true;
item = iterator.next();
passed &= item.value === undefined && item.done === true;

assert.ok(passed);


// copy from kangax compat-table: yield *, iterator closing
var closed = '';
var iter = {
  [Symbol.iterator]() {
    return {
      next: function() {
        return {value: 1, done: false};
      },
      'return': function(){
        closed += 'a';
        return {done: true};
      }
    }
  }
};
var gen = (function* generator(){
  try {
    yield *iter;
  } finally {
    closed += 'b';
  }
})();
gen.next();
gen['return']();
// assert.equal(closed, 'ab');
