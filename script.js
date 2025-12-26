function revealToSpan() {
  document.querySelectorAll(".reveal").forEach((elem) => {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.textContent = elem.textContent;
    parent.appendChild(child);

    elem.textContent = "";
    elem.appendChild(parent);
  });
}

revealToSpan();

const tl = gsap.timeline();
gsap.to(".parent .child", {
  y: "-100%",
  duration: 2,
  delay: 2,
  ease: Expo.EaseInOut
});
