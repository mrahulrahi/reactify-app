export const isValidURL = (string) => {
  try {
    const url = new URL(string); // Attempt to create a URL object
    return true; // Valid if no error is thrown
  } catch (e) {
    return false; // Invalid URL
  }
}