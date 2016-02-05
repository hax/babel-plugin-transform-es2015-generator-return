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


// call return immediately
var result = function * () {}().return('ok')
assert.ok(result.done && result.value === 'ok')


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


// for-of break should close iterator?

// function *gen() {
// 	let n = 0
// 	try {
// 		while (true) { // eslint-disable-line no-constant-condition
// 			try {
// 				yield ++n
// 			} catch (e) {
// 				console.log('throw', e)
// 			}
// 		}
// 	} finally {
// 		console.log('unwind')
// 	}
// }
//
// for (const x of gen()) {
// 	console.log(x)
// 	if (x >= 5) break
// }
// console.log('ending...')
// setTimeout(() => {}, 1000)
