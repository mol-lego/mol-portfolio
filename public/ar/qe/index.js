function preventScroll(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
}

document.addEventListener("wheel", preventScroll, { passive: false });
document.addEventListener("touchmove", preventScroll, { passive: false });

const searchParams = new URLSearchParams(window.location.search);
const backTarget = searchParams.get("back") || "/ar-viewer";
const arPage = document.querySelector("#ar-page");
const backButton = document.querySelector(".ar-back");
const modelViewer = document.querySelector(".ar-model");
const qrContainer = document.querySelector(".ar-qr__code");

if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = backTarget;
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    window.location.href = backTarget;
  }
});

const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const enableDoubleSidedRendering = () => {
  const materials = modelViewer?.model?.materials;

  if (!Array.isArray(materials)) {
    return;
  }

  materials.forEach((material) => {
    if (typeof material?.setDoubleSided === "function") {
      material.setDoubleSided(true);
      return;
    }

    if (material && "doubleSided" in material) {
      material.doubleSided = true;
    }
  });
};

let vw = window.innerWidth;

window.addEventListener("resize", () => {
  if (vw === window.innerWidth) {
    return;
  }

  vw = window.innerWidth;
  setFillHeight();
});

setFillHeight();

if (modelViewer) {
  modelViewer.addEventListener("load", () => {
    enableDoubleSidedRendering();
    arPage?.classList.add("ar-ready");
  }, { once: true });
}

if (qrContainer && typeof window.QRCode !== "undefined") {
  qrContainer.innerHTML = "";

  new window.QRCode(qrContainer, {
    text: window.location.href,
    width: 112,
    height: 112,
    colorDark: "#1c1917",
    colorLight: "#ffffff",
    correctLevel: window.QRCode.CorrectLevel.M,
  });
}
