import util from './util';

const b = 'asdf';

for (let i = 0; i < 10; i++) {
	console.log(i);
	const a = 1;
}

const sum = (a: number, b: number) => a + b;

let a = 0;
a += 1;
console.log(sum(a, 2));

console.log(util);
