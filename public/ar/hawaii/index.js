function preventScroll(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
}

document.addEventListener("wheel", preventScroll, { passive: false });
document.addEventListener("touchmove", preventScroll, { passive: false });

const searchParams = new URLSearchParams(window.location.search);
const backTarget = searchParams.get("back") || "/ar-viewer";
const backButton = document.querySelector(".ar-back");

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

let vw = window.innerWidth;

window.addEventListener("resize", () => {
  if (vw === window.innerWidth) {
    return;
  }

  vw = window.innerWidth;
  setFillHeight();
});

setFillHeight();
