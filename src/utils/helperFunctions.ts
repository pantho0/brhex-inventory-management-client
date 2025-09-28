export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Converts a number to its word representation using the Bangladeshi numbering system.
 * This function handles integers and is tailored for currency amounts.
 * @param {number | null | undefined} num The number to convert.
 * @returns {string} The number in words, e.g., "Twenty six thousand Taka only".
 */
export const numberToWords = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return "";

  // We'll work with the integer part for the main amount
  let number = Math.floor(num);

  if (number === 0) return "Zero Taka only";

  const ones: string[] = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens: string[] = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const numToWords = (n: number): string => {
    let str = "";
    if (n > 99) {
      str += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n > 19) {
      str += tens[Math.floor(n / 10)] + " " + ones[n % 10];
    } else {
      str += ones[n];
    }
    return str.trim();
  };

  let word = "";
  if (number >= 10000000) {
    word += numToWords(Math.floor(number / 10000000)) + " crore ";
    number %= 10000000;
  }
  if (number >= 100000) {
    word += numToWords(Math.floor(number / 100000)) + " lakh ";
    number %= 100000;
  }
  if (number >= 1000) {
    word += numToWords(Math.floor(number / 1000)) + " thousand ";
    number %= 1000;
  }
  if (number > 0) {
    word += numToWords(number);
  }

  // Clean up extra spaces, capitalize the first letter, and add the suffix.
  const finalWord = word.replace(/\s+/g, " ").trim();
  return finalWord.charAt(0).toUpperCase() + finalWord.slice(1) + " Taka only";
};

export function generateInvoiceNo(prefix: string = "BCC"): string {
  const now = new Date();

  // YYYYMMDD
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // HHMMSS
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Random suffix (4 alphanumeric chars)
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-INV-${year}${month}${day}-${hours}${minutes}${seconds}-${randomSuffix}`;
}
