function navButton() {
  document.querySelectorAll("nav a").forEach((link) => {
    // <span id="line1" class="line"></span>
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
  gsap.set("#main-nav a", {
    y: "-100%",
    opacity: 0,
  });
  gsap.set("#home span .child", {
    y: "100%",
  });
  gsap.set("#home .row img", {
    opacity: 0,
    color: "#14cf93",
  });

  document.querySelectorAll("#Web>g").forEach((e) => {
    const character = e.childNodes[1].childNodes[1];

    character.style.strokeDasharray = character.getTotalLength() + "vw";
    character.style.strokeDashoffset = character.getTotalLength() + "vw";
  });

  gsap.set("#imaginary-r .imgcntnr:nth-child(1)", {
    xPercent: -40,
    yPercent: -8,
    rotation: -20,
  });
  gsap.set("#imaginary-r .imgcntnr:nth-child(2)", {
    xPercent: -15,
    rotation: -15,
  });
  gsap.set("#imaginary-r .imgcntnr:nth-child(3)", {
    xPercent: 20,
    yPercent: 10,
    rotation: -5,
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
  tl.from("#Web>g>g>path", {
    fill: "none",
  }).to("#Web>g>g>path", {
    strokeDashoffset: 0,
    fill: "#14cf93",
    duration: 2,
    ease: Expo.easeInOut,
  });
}

function animateHomePage() {
  const tl = gsap.timeline();
  tl.to("#main-nav a", {
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

function initScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  return locoScroll;
}
function rotateCards() {
  gsap.to(".imgcntnr", {
    rotation: "+=15",
    scrollTrigger: {
      trigger: "#imaginary",
      scroller: "#main",
      start: "top 95%",
      end: "bottom 60%",
      stagger: 2,
      scrub: true,
    },
  });
}
function cardHoverEffect() {
  document.querySelectorAll(".container").forEach((cnt) => {
    let showImage;
    cnt.addEventListener("mousemove", (dets) => {
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showImage = dets.target;
      document.querySelector("#cursor").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px)`;
      showImage.style.cursor = "pointer";
      showImage.style.filter = "grayscale(1)";
      showImage.style.transition = "filter 1s ease";
      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });
    cnt.addEventListener("mouseleave", (dets) => {
      document.querySelector("#cursor").children[
        showImage.dataset.index
      ].style.opacity = 0;
      showImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#F2F2F2";
      document.querySelector("#work").style.transition =
        "background-color 1s ease";
    });
  });
}

function showHideContactButton(locoScroll) {
  const contactBtnWrapper = document.querySelector(".contact-btn-wrapper");

  if (window.innerWidth > 850) return;

  let lastScrollY = 0;
  let isHidden = false;

  locoScroll.on("scroll", (obj) => {
    const currentScrollY = obj.scroll.y;

    if (currentScrollY > lastScrollY && !isHidden) {
      gsap.to(contactBtnWrapper, {
        x: "150%",
        autoAlpha: 0,
        duration: 0.3,
      });
      isHidden = true;
    } else if (currentScrollY < lastScrollY && isHidden) {
      gsap.to(contactBtnWrapper, {
        x: "0%",
        autoAlpha: 1,
        duration: 0.3,
      });
      isHidden = false;
    }

    lastScrollY = currentScrollY;
  });
}

function initMessagePopup() {
  const overlay = document.getElementById("contactOverlay");
  const closeBtn = document.getElementById("closePopup");

  const mobileBtn = document.querySelector(".contact-btn");
  const desktopBtn = document.getElementById("desktop-contact");

  function openPopup(e) {
    e.preventDefault();
    overlay.classList.add("show");
  }

  if (mobileBtn) {
    mobileBtn.addEventListener("click", openPopup);
  }

  if (desktopBtn) {
    desktopBtn.addEventListener("click", openPopup);
  }

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("show");
    }
  });
}

revealToSpan();
valueSet();
loaderAnimation();
initScroll();
rotateCards();
cardHoverEffect();
showHideContactButton(initScroll());
initMessagePopup();
