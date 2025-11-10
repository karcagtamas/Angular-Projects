import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntropyService {
  calculatePasswordEntropy(password: string): number {
    // Entropy values per symbol based on symbol set
    // These are approximations for different character sets
    const entropyPerSymbol = {
      numerals: 3.322, // Arabic numerals (0-9), log2(10)
      hexadecimal: 4.0, // Hexadecimal numerals (0-9, A-F), log2(16)
      caseInsensitiveAlphabet: 4.7, // Latin alphabet (a-z or A-Z), log2(26)
      caseInsensitiveAlphanumeric: 5.17, // Alphanumeric (a-z, A-Z, 0-9), log2(36)
      caseSensitiveAlphabet: 5.7, // Case sensitive alphabet (a-z, A-Z), log2(52)
      caseSensitiveAlphanumeric: 5.954, // Case sensitive alphanumeric (a-z, A-Z, 0-9), log2(62)
      asciiPrintable: 6.555, // All ASCII printable characters except space, log2(95)
      extendedAscii: 7.768, // All extended ASCII printable characters, log2(223)
      binary: 8.0, // Binary (0-255), log2(256)
    };

    // Array of symbol set matchers and corresponding entropy values
    // Each matcher checks if the password fits a specific character set
    const symbolMatchers = [
      { regex: /^[0-9]+$/, entropy: entropyPerSymbol.numerals }, // Only numerals
      { regex: /^[0-9A-Fa-f]+$/, entropy: entropyPerSymbol.hexadecimal }, // Hexadecimal
      {
        regex: /^[a-zA-Z]+$/, // Only letters (case insensitive)
        entropy: entropyPerSymbol.caseInsensitiveAlphabet,
      },
      {
        regex: /^[a-zA-Z0-9]+$/, // Letters and numbers (case insensitive)
        entropy: entropyPerSymbol.caseInsensitiveAlphanumeric,
      },
      {
        regex: /(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z]+$/, // Letters, must include both cases
        entropy: entropyPerSymbol.caseSensitiveAlphabet,
      },
      {
        regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])^[a-zA-Z0-9]+$/, // Letters (both cases) and numbers
        entropy: entropyPerSymbol.caseSensitiveAlphanumeric,
      },
      { regex: /^[ -~]+$/, entropy: entropyPerSymbol.asciiPrintable }, // Printable ASCII
      { regex: /^[\x20-\xFF]+$/, entropy: entropyPerSymbol.extendedAscii }, // Extended ASCII
    ];

    // Find the first matching symbol set for the password
    const matchingSet = symbolMatchers.find((set) => set.regex.test(password));

    // Determine the number of unique characters in the password
    const uniqueChars = new Set(password.split(''));
    const uniqueCharCount = uniqueChars.size;

    // If no match is found, assume binary (all ASCII) entropy
    const entropyValue = matchingSet ? matchingSet.entropy : entropyPerSymbol.binary;

    // Calculate the entropy using the formula H = log2(N) * L
    // N: number of unique characters, L: password length
    const baseEntropy = Math.log2(uniqueCharCount) * password.length;

    // Return the final entropy value
    return baseEntropy;
  }
}
