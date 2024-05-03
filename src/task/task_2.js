// Function to convert binary to Gray code
function bin2gray(binary) {
  let gray = [binary[0]]; // MSB remains the same
  for (let i = 1; i < binary.length; i++) {
    // XOR operation between consecutive binary digits
    gray.push(binary[i] ^ binary[i - 1]);
  }
  return gray;
}

// Function to convert Gray code to binary
function gray2bin(gray) {
  let binary = [gray[0]]; // MSB remains the same
  for (let i = 1; i < gray.length; i++) {
    // XOR operation between consecutive gray code digits and previous binary digit
    binary.push(gray[i] ^ binary[i - 1]);
  }
  return binary;
}

// Test the functions with some sample input
const binaryInput = [1, 0, 1, 0]; // Binary: 1010
const grayInput = [1, 1, 0, 1]; // Gray code: 1101

const grayOutput = bin2gray(binaryInput);
const binaryOutput = gray2bin(grayInput);

console.log('Binary to Gray Code:');
console.log('Input Binary:', binaryInput);
console.log('Output Gray Code:', grayOutput);

console.log('\nGray Code to Binary:');
console.log('Input Gray Code:', grayInput);
console.log('Output Binary:', binaryOutput);

// ------------------------------------------------

// Gray code is a form of binary encoding where transitions between consecutive numbers differ by only one bit. This is a useful encoding for reducing hardware data hazards with values that change rapidly and/or connect to slower hardware as inputs. It is also useful for generating inputs for Karnaugh maps.

// Here is an exemple of what the code look like:

// 0:    0000
// 1:    0001
// 2:    0011
// 3:    0010
// 4:    0110
// 5:    0111
// 6:    0101
// 7:    0100
// 8:    1100
// The goal of this kata is to build two function bin2gray and gray2bin wich will convert natural binary to Gray Code and vice-versa. We will use the "binary reflected Gray code". The input and output will be arrays of 0 and 1, MSB at index 0.

// There are "simple" formula to implement these functions. It is a very interesting exercise to find them by yourself. Otherwise you can look here: http://mathworld.wolfram.com/GrayCode.html for formula and more informations.

// All input will be correct binary arrays.
