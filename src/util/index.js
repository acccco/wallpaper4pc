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

// animate 下的入场动画的名称
export const animateIn = [
  "bounceIn",
  "bounceInUp",
  "bounceInDown",
  "fadeIn",
  "fadeInUp",
  "fadeInDown",
  "fadeInLeft",
  "fadeInRight",
  "flipInX",
  "flipInY",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "rollIn",
  "zoomIn",
  "zoomInUp",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
];

// animate 下的出场动画的名称
export const animateOut = [
  "bounceOut",
  "bounceOutDown",
  "bounceOutUp",
  "fadeOut",
  "fadeOutDown",
  "fadeOutUp",
  "fadeOutRight",
  "fadeOutLeft",
  "flipOutX",
  "flipOutY",
  "rotateOut",
  "rotateOutUpRight",
  "rotateOutUpLeft",
  "rotateOutDownRight",
  "rotateOutDownLeft",
  "rollOut",
  "zoomOut",
  "zoomOutDown",
  "zoomOutUp",
  "zoomOutRight",
  "zoomOutLeft",
];
