function generateRandomNumber() {
  const min = 100000; // Eng kichik qiymat
  const max = 999999; // Eng katta qiymat
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export { generateRandomNumber };
