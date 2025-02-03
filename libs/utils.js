export const genRandomColor = () => {
  const chars = "ABCDEF0123456789";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const genOptions = (targetColor) => {
  let options = [targetColor];

  while (options.length < 6) {
    const newOption = genRandomColor();

    if (!options.includes(newOption)) options.push(newOption);
  }

  return options.sort(() => Math.random() - 0.5);
};
