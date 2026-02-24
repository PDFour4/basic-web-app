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
      // Add functionality to handle more than two numbers
      const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
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
      // Add functionality to handle more than two numbers, subtracting all subsequent numbers from the first one
      const difference = numbers.slice(1).reduce((acc, num) => acc - parseInt(num), parseInt(numbers[0]));
      return difference.toString();
    }
  }

  if (query.toLowerCase().includes("multiplied")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const product = numbers.reduce((acc, num) => acc * parseInt(num), 1);
      return product.toString();
    }
  }

  if (query.toLowerCase().includes("divided")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const quotient = numbers.reduce((acc, num) => acc / parseInt(num), parseInt(numbers[0]));
      return quotient.toString();
    }
  }

  // Second round queries
  if(query.toLowerCase().includes("square and a cube")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 1) {
      // finding the number or numbers in a list of numbers that is both a square and a perfect cube
      const results = [];
      for (let i = 0; i < numbers.length; i++) {
        const num = parseInt(numbers[i]);
        if (Number.isInteger(Math.sqrt(num)) && Number.isInteger(Math.cbrt(num))) {
          results.push(num);
        }
      }
      return results.join(", ");
    }
  }

  // Third round queries
  if(query.toLowerCase().includes("primes")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 1) {
      const primes = numbers.filter(num => {
        const n = parseInt(num);
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      });
      return primes.join(", ");
    }
  }

  return "";
}
