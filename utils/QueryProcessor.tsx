function evaluateMixedExpression(query: string): string {
  const lowerQuery = query.toLowerCase();
  const numbers = query.match(/\d+/g);
  
  if (!numbers || numbers.length < 2) {
    return "";
  }
  
  // Extract operations in order from the query
  const operations: string[] = [];
  let queryToSearch = lowerQuery;
  let lastIndex = 0;
  
  for (let i = 0; i < numbers.length - 1; i++) {
    // Find what operation comes after each number
    const currentNumIndex = queryToSearch.indexOf(numbers[i], lastIndex);
    const nextNumIndex = queryToSearch.indexOf(numbers[i + 1], currentNumIndex);
    
    if (currentNumIndex !== -1 && nextNumIndex !== -1) {
      const betweenText = queryToSearch.substring(currentNumIndex + numbers[i].length, nextNumIndex).toLowerCase();
      
      if (betweenText.includes("plus")) {
        operations.push("+");
      } else if (betweenText.includes("minus")) {
        operations.push("-");
      } else if (betweenText.includes("multiplied")) {
        operations.push("*");
      } else if (betweenText.includes("divided")) {
        operations.push("/");
      }
      lastIndex = nextNumIndex;
    }
  }
  
  if (operations.length === 0) {
    return "";
  }
  
  // Create expression array with numbers and operations
  const expression: (number | string)[] = [];
  for (let i = 0; i < numbers.length; i++) {
    expression.push(parseInt(numbers[i]));
    if (i < operations.length) {
      expression.push(operations[i]);
    }
  }
  
  // First pass: handle * and /
  for (let i = 1; i < expression.length; i += 2) {
    if (expression[i] === "*" || expression[i] === "/") {
      const left = expression[i - 1] as number;
      const right = expression[i + 1] as number;
      const result = expression[i] === "*" ? left * right : left / right;
      expression.splice(i - 1, 3, result);
      i -= 2;
    }
  }
  
  // Second pass: handle + and -
  let result = expression[0] as number;
  for (let i = 1; i < expression.length; i += 2) {
    const op = expression[i] as string;
    const right = expression[i + 1] as number;
    result = op === "+" ? result + right : result - right;
  }
  
  return result.toString();
}

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

  // Fourth round queries
  if(query.toLowerCase().includes("power")) {
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const base = parseInt(numbers[0]);
      const exponent = parseInt(numbers[1]);
      const result = Math.pow(base, exponent);
      return result.toString();
    }
  }
  
  // Mixed operations (plus, minus, multiplied, divided)
  if((query.toLowerCase().includes("plus") || query.toLowerCase().includes("minus")) && 
     (query.toLowerCase().includes("multiplied") || query.toLowerCase().includes("divided"))) {
    return evaluateMixedExpression(query);
  }

  // Fifth Round queries
  if(query.toLowerCase().includes("Scrabble")) {
    const letterValues: { [key: string]: number } = {
      A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
      D: 2, G: 2,
      B: 3, C: 3, M: 3, P: 3,
      F: 4, H: 4, V: 4, W: 4, Y: 4,
      K: 5,
      J: 8, X: 8,
      Q: 10, Z: 10
    };
    
    const letters = query.match(/[a-zA-Z]/g);
    if (letters) {
      const score = letters.reduce((acc, letter) => acc + (letterValues[letter.toUpperCase()] || 0), 0);
      return score.toString();
    }
  }

  if(query.toLowerCase().includes("anagram")) {
    const words = query.match(/[a-zA-Z]+/g);
    if (words && words.length >= 2) {
      const sortedWords = words.map(word => word.toLowerCase().split("").sort().join(""));
      const anagrams = [];
      for (let i = 0; i < sortedWords.length; i++) {
        for (let j = i + 1; j < sortedWords.length; j++) {
          if (sortedWords[i] === sortedWords[j]) {
            anagrams.push(words[i], words[j]);
          }
        }
      }
      return Array.from(new Set(anagrams)).join(", ");
    }
  }
  return "";
}
