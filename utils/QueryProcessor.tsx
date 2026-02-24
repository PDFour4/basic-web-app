export default function QueryProcessor(query: string): string {
  // Basic queries
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "janayame";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "janayame";
  }

  // First round queries
  if (query.toLowerCase().includes("plus")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const sum = parseInt(numbers[0]) + parseInt(numbers[1]);
      return sum.toString();
    }
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const largest = Math.max(...numbers.map(Number));
      return largest.toString();
    }
  }

  if (query.toLowerCase().includes("minus")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const difference = parseInt(numbers[0]) - parseInt(numbers[1]);
      return difference.toString();
    }
  }

  if (query.toLowerCase().includes("multiplied")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const product = parseInt(numbers[0]) * parseInt(numbers[1]);
      return product.toString();
    }
  }

  if (query.toLowerCase().includes("divided")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const quotient = parseInt(numbers[0]) / parseInt(numbers[1]);
      return quotient.toString();
    }
  }

  // Second round queries
  if(query.toLowerCase().includes("square and a cube")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 1) {
      // finding the number that is both a perfect square and a perfect cube
      const num = parseInt(numbers[0]);
      const isPerfectSquare = Number.isInteger(Math.sqrt(num));
      const isPerfectCube = Number.isInteger(Math.cbrt(num));
      if (isPerfectSquare && isPerfectCube) {
        return num.toString();
      }
    }
  }

  return "";
}
