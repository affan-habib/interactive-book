const numbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBanglaNumber = (input) => {
    if (localStorage.getItem("language") === "en") {
        return input;
    }
    const numberArr = String(input)
        .split("")
        .map((input) => {
            return Number(input);
        });
    const output = [];
    for (let i = 0; i < numberArr.length; ++i) {
        const digit = numberArr[i];
        if (typeof digit === "number" && numbers[digit]) {
            output.push(numbers[digit]);
        } else {
            output.push(digit);
        }
    }
    return output.join("");
};

const numberMap = {
    "০": 0,
    "১": 1,
    "২": 2,
    "৩": 3,
    "৪": 4,
    "৫": 5,
    "৬": 6,
    "৭": 7,
    "৮": 8,
    "৯": 9,
};

export const toEnglishNumber = (input) => {
    const numberArr = String(input).split("");
    const output = [];
    for (let i = 0; i < numberArr.length; ++i) {
        const digit = numberArr[i];
        if (digit in numberMap) {
            output.push(numberMap[digit]);
        } else {
            output.push(digit);
        }
    }
    return output.join("");
};
