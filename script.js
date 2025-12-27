function navButton() {
  document.querySelectorAll("#nav a").forEach((link) => {
    //     <span id="line1" class="line"></span>
    // <span id="line2" class="line"></span>
    const line1 = document.createElement("span");
    const line2 = document.createElement("span");
    line1.id = "line1";
    line2.id = "line2";
    line1.classList.add("line");
    line2.classList.add("line");
    link.appendChild(line1);
    link.appendChild(line2);
  });
}
navButton();

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

function valueSet() {
  gsap.set("#nav a", {
    y: "-100%",
    opacity: 0,
  });
  gsap.set("#home span .child", {
    y: "100%",
  });
  gsap.set("#home .row img", {
    opacity: 0,
  });

  document.querySelectorAll("#Web>g").forEach((e) => {
    const character = e.childNodes[1].childNodes[1];

    character.style.strokeDasharray = character.getTotalLength() + "vw";
    character.style.strokeDashoffset = character.getTotalLength() + "vw";
  });
}

function loaderAnimation() {
  const tl = gsap.timeline();
  tl.from("#loader .child span", {
    x: 100,

    duration: 1,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -0.8,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: 0,
      duration: 1.5,
      delay: -0.3,
      ease: Circ.easeInOut,
      onComplete: function () {
        animateHomePage();
      },
    });
}

function animateSVG() {
  tl = gsap.timeline();
  tl.from("#Web>g>g>path, #Visual>g>g>polyline", {
    fill: "none",
  })
  .to("#Web>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    fill: "#14cf93",
    duration: 2,
    ease: Expo.easeInOut,
  });
}

function animateHomePage() {
  const tl = gsap.timeline();
  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    ease: Expo.easeInOut,
  })
    .to("#home .parent .child", {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
      onComplete: function () {
        animateSVG();
      },
    })
    .to("#home .row img", {
      opacity: 1,
      duration: 2,
      delay: 1.5,
      y: "50%",
      ease: "bounce.out",
    });
}

revealToSpan();
valueSet();
loaderAnimation();
