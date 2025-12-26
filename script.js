function revealToSpan() {
  document.querySelectorAll(".reveal").forEach((elem) => {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

revealToSpan();

const tl = gsap.timeline();
gsap.to(".parent .child", {
  y: "-100%",
  duration: 1,
  delay: 2,
  ease: Circ.EaseInOut
});
