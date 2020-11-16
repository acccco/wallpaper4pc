import { Matrix } from "matrixchange";

export function makeListMatrixChange(parentDom, { row, col }) {
  let ma = new Matrix(row, col);

  ma.$on("matrixChangeStart", () => {
    ma.$emit("changeStart");
  });

  ma.$on("hitPoint", ({ point, option, end }) => {
    let index = point.x * ma.col + point.y;

    let classNameIn = option.classNameIn;
    let classNameOut = option.classNameOut;

    let dom = parentDom.children[index];
    if (!dom || dom.dataset.mchange) {
      return;
    }

    let baseClass = dom.dataset.baseclass;

    if (classNameIn && classNameOut) {
      dom.className = `${baseClass} ${classNameOut}`;
      dom.dataset.mchange = "1";
      dom.addEventListener("animationend", function listen() {
        if (dom.dataset.mchange === "2") {
          dom.className = baseClass;
          dom.dataset.mchange = "";
          dom.removeEventListener("animationend", listen);
          return;
        }
        dom.className = baseClass + " x-hidden";
        setTimeout(() => {
          dom.className = `${baseClass} ${classNameIn}`;
        }, 20);
        dom.dataset.mchange = "2";
        dom.style.backgroundImage = `url(${option.image[index]})`;
        if (end) {
          ma.$emit("changeEnd");
          ma.lock = false;
        }
      });
    } else if (classNameIn) {
      dom.className = `${baseClass} ${classNameIn}`;
      dom.dataset.mchange = "1";
      dom.style.backgroundImage = `url(${option.image[index]})`;

      dom.addEventListener("animationend", function listen() {
        dom.className = baseClass;
        dom.dataset.mchange = "";
        dom.removeEventListener("animationend", listen);
        if (end) {
          ma.$emit("changeEnd");
          ma.lock = false;
        }
      });
    } else {
      dom.className = `${baseClass} ${classNameOut}`;
      dom.dataset.mchange = "1";

      dom.addEventListener("animationend", function listen() {
        dom.className = baseClass + " x-hidden";
        dom.dataset.mchange = "";
        dom.removeEventListener("animationend", listen);
        if (end) {
          ma.$emit("changeEnd");
          ma.lock = false;
        }
      });
    }
  });

  return {
    movePoint: ma.movePoint.bind(ma),
    matrixChange: ma,
  };
}
