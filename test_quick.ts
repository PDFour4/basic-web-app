import QueryProcessor from './utils/QueryProcessor';

const query1 = 'What is 11 plus 53 multiplied by 93?';
const query2 = 'What is 6 multiplied by 21 plus 33?';

console.log('Query 1:', query1);
console.log('Result:', QueryProcessor(query1));
console.log('Expected: 4940');
console.log();
console.log('Query 2:', query2);
console.log('Result:', QueryProcessor(query2));
console.log('Expected: 159');
