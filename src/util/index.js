export function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function preLoadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(src);
    };
    img.onerror = () => {
      reject(src);
    };
  });
}
