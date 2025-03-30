import React from 'react'

export default function ProfilePlaceHolder({ name, width, height, border, marginTop, fontSize, marginBottom }) {

  function extractFirstLetters(inputString) {
    // Split the input string into an array of words
    const words = inputString.split(' ');

    // Initialize an array to hold the result
    const resultArray = [];

    // Iterate over the words
    words.forEach((word, index) => {
      if (index === 0) {
        // For the first word, take the first letter
        resultArray.push(word.charAt(0).toUpperCase()); // Ensure the first letter is capitalized
      } else {
        // For subsequent words, find the first capital letter
        const capitalLetter = word.split('').find(char => /[A-Z]/.test(char));
        if (capitalLetter) {
          resultArray.push(capitalLetter);
        }
      }
    });

    // Join the array into a single string
    const result = resultArray.join('');

    return result;
  }

  return (
    <div
      className={`mt-${marginTop} mb-${marginBottom} d-flex align-items-center justify-content-center`}
      style={{
        background: "#CF87E9",
        borderRadius: "100px",
        width: width,
        height: height,
        border: border
      }}>
      <p
        style={{
          fontWeight: "500",
          fontSize: fontSize ? fontSize : "24px",
          color: "white"
        }}
      >
        {extractFirstLetters(name)}
      </p>
    </div>)
}
