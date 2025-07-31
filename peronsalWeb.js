//introimg
const introImgGrid = document.querySelector(".introImgGrid");
const introImg = document.querySelectorAll(".introImg");
introImg.forEach((img, index) => {
  img.addEventListener("mouseover", () => {
    introImgGrid.classList.remove("intro1", "intro2", "intro3", "intro4");
    introImgGrid.classList.add(`intro${index + 1}`);
  });
});

const introImgBar = document.querySelector(".introImgBar");
const totalClasses = 4;
let index = 0;
setInterval(() => {
  introImgGrid.classList.remove("intro1", "intro2", "intro3", "intro4");
  introImgGrid.classList.add(`intro${index + 1}`);
  index = (index + 1) % totalClasses;
  introImgBar.style.animation = "bar 4s linear";
  setTimeout(() => {
    introImgBar.style.animation = "none";
    introImgBar.style.height = "0";
  }, 3990);
}, 4000);

//introText
const introTextContainer = document.querySelector("#introTextContainer");
const introBtn = document.querySelector("#introBtn");
const introBtnIcon = document.querySelector("#introBtnIcon");
function introTextExtend() {
  introTextContainer.classList.toggle("introTextExtend");
  introBtnIcon.classList.toggle("introTextExtendIcon");
}
introBtn.addEventListener("click", introTextExtend);

const liBlocks = document.querySelectorAll(".liBlock");
liBlocks.forEach((liBlock) => {
  const span = liBlock.querySelector("span");
  const img = liBlock.querySelector("img");
  liBlock.addEventListener("mouseenter", () => {
    span.classList.add("show");
    img.classList.add("show");
  });

  liBlock.addEventListener("mouseleave", () => {
    span.classList.remove("show");
    img.classList.remove("show");
  });
});

//instance//
const wrapper = document.querySelector("#wrapper");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
next.addEventListener("click", nextImg);
prev.addEventListener("click", prevImg);
function nextImg() {
  const slides = document.querySelectorAll(".slide");
  wrapper.appendChild(slides[0]);
}
function prevImg() {
  const slides = document.querySelectorAll(".slide");
  wrapper.prepend(slides[slides.length - 1]);
}

let isdown = false;
let startX;
let startXMobile;
const mouseFalse = () => {
  isdown = false;
};
const longCalculate = (long) => {
  if (long > 20 && long < 25) {
    prevImg();
  } else if (long < -20 && long > -25) {
    nextImg();
  } else return;
  isdown = false;
};

wrapper.addEventListener("touchstart", (event) => {
  isdown = true;
  startXMobile = event.touches[0].pageX;
});
wrapper.addEventListener("touchend", mouseFalse);
wrapper.addEventListener("touchmove", (event) => {
  if (!isdown) return;
  event.preventDefault();
  const x = event.touches[0].pageX;
  const long = x - startXMobile;
  longCalculate(long);
});
wrapper.addEventListener("mousedown", (event) => {
  isdown = true;
  startX = event.pageX;
});
wrapper.addEventListener("mouseleave", mouseFalse);
wrapper.addEventListener("mouseup", mouseFalse);
wrapper.addEventListener("mousemove", (event) => {
  if (!isdown) return;
  event.preventDefault();
  const x = event.pageX;
  const long = x - startX;
  longCalculate(long);
});

//floating nv//
document.querySelector('img[alt="all"]').src = "./svg/layout.svg";
const opennvBar = document.querySelector(".opennvBar");
window.addEventListener("scroll", () => {
  const scrollLevel = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight;
  if (scrollLevel > 400 && scrollLevel < totalHeight - 600) {
    opennvBar.classList.add("opennvBarAfter");
    document.querySelector('img[alt="all"]').src = "./svg/linebar.svg";
    document.querySelector('img[alt="all"]').style.transform =
      "translateY(16px)";
  } else {
    opennvBar.classList.remove("opennvBarAfter");
    document.querySelector('img[alt="all"]').src = "./svg/layout.svg";
    document.querySelector('img[alt="all"]').style.transform = "translateY(0)";
  }
});
opennvBar.addEventListener("click", () => {
  opennvBar.classList.remove("opennvBarAfter");
});

//nv tp//
const buttons = document.querySelectorAll(".nvoption");
const targets = {
  nvo1: document.querySelector("#helloBlk"),
  nvo2: document.querySelector("#prosBlock"),
  nvo3: document.querySelector("#introBlk"),
  nvo4: document.querySelector("#instancesBlock"),
  nvo5: document.querySelector("#sliderBLk"),
};

var nvRedirection = (toId) => {
  toId.scrollIntoView({
    behavior: "smooth",
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.classList[1];
    nvRedirection(targets[targetId]);
  });
});

//imgPop
const pop = document.querySelector(".pop");
const popBackdrop = document.querySelector(".popBackdrop");
const imgCloseBtn = document.querySelector(".imgCloseBtn");
const imgContainer = document.querySelector(".imgContainer");
const popImage = pop.querySelector(".imgPopImg");
const allImg = document.querySelectorAll("img");
const sBtn = document.querySelector(".sBtn");
const imgPopSpan = document.querySelector(".imgPopSpan");
allImg.forEach((img) => {
  img.addEventListener("click", () => {
    pop.style.pointerEvents = "all";
    pop.style.opacity = "1";
    imgContainer.style.display = "grid";
    contactInputContainer.style.display = "none";
    imgContainer.style.transform = "scale(1)";
    const imgSrc = img.getAttribute("src");
    popImage.setAttribute("src", imgSrc);
    if (img.hasAttribute("data-comment")) {
      imgContainer.style.gridTemplateRows = "1fr 1fr";
      imgContainer.style.gridRowGap = "1em";
      const imgSpan = img.getAttribute("data-comment");
      imgPopSpan.textContent = imgSpan;
      imgPopSpan.innerHTML = imgSpan.replace(/\n/g, "<br>");
    } else {
      imgContainer.style.gridTemplateRows = "1fr 0fr";
      imgContainer.style.gridRowGap = "0";
      imgPopSpan.textContent = "";
    }
  });
});

function closeimgPop() {
  pop.style.pointerEvents = "none";
  pop.style.opacity = "0";
  imgContainer.style.transform = "scale(.7)";
  contactInputContainer.style.transform = "scale(.7)";
}
popBackdrop.addEventListener("click", closeimgPop);
sBtn.addEventListener("click", closeimgPop);

//
const contactInputContainer = document.querySelector(".contactInputContainer");

//slideBtn
const inputs = document.querySelectorAll(
  ".contactInputContainer input, .contactInputContainer textarea"
);

const subCircle = document.querySelector(".subCircle");
const submitBtn = document.querySelector("#submitBtn");
const shake = () => {
  submitBtn.classList.add("shake");
  submitBtn.addEventListener(
    "animationend",
    () => {
      submitBtn.classList.remove("shake");
    },
    { once: true }
  );
};
const subSuccess = () => {
  subCircle.style.opacity = "0";
  subCircle.style.pointerEvents = "none";
  submitBtn.style.background = "#075E54";
  submitBtn.style.width = "4em";
  document.querySelector("#submitBtn > .tick").style.opacity = "1";
  const itsForm = submitBtn.closest("form");
  if (itsForm) {
    itsForm.submit();
    console.log("submited");
  }
  disableInputs();
};
const falseReturn = () => {
  isdown = false;
  subCircle.style.transform = `translateX(0)`;
  subCircle.style.transition = `all 0.25s ease`;
  setTimeout(() => {
    subCircle.style.transition = "opacity 0.25s ease, scale 0.25s ease";
  }, 250);
};
const btnLongCalculate = (long) => {
  subCircle.style.transform = `translateX(${long}px)`;
  if (
    long > 200 - 56 &&
    Array.from(inputs).every((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        return false;
      }
      if (input.type === "email" && !input.value.includes("@")) {
        return false;
      }
      return true;
    })
  ) {
    subSuccess();
    subCircle.removeEventListener("touchend", falseReturn);
    subCircle.removeEventListener("mouseleave", falseReturn);
    subCircle.removeEventListener("mouseup", falseReturn);
  } else if (long < 0) {
    falseReturn();
  } else if (long > 200 - 36) {
    shake();
    falseReturn();
  } else return;
  isdown = false;
};
subCircle.addEventListener("touchstart", (event) => {
  isdown = true;
  startXMobile = event.touches[0].pageX;
});
subCircle.addEventListener("touchend", falseReturn);
subCircle.addEventListener("touchmove", (event) => {
  if (!isdown) return;
  event.preventDefault();
  const x = event.touches[0].pageX;
  const long = x - startXMobile;
  btnLongCalculate(long);
});
subCircle.addEventListener("mousedown", (event) => {
  isdown = true;
  startX = event.pageX;
});
subCircle.addEventListener("mouseleave", falseReturn);
subCircle.addEventListener("mouseup", falseReturn);
subCircle.addEventListener("mousemove", (event) => {
  if (!isdown) return;
  event.preventDefault();
  const x = event.pageX;
  const long = x - startX;
  btnLongCalculate(long);
});

//sucessContact
const contactInputs = document.querySelectorAll(".contactInputContainer > div");
const disableInputs = () => {
  for (let i = 0; i <= 2; i++) {
    contactInputs[i].style.opacity = "0";
    contactInputs[i].style.pointerEvents = "none";
  }
  contactInputContainer.style.gridTemplateRows = "1fr repeat(5, 0) 1fr";
  contactInputContainer.style.gridRowGap = "0";
  contactInputContainer.style.gridTemplateAreas =
    "'cTitle' '1' '2' '3' '4' '5' 'subBtn'";
  document.querySelector("#subBtnDiv").style.gridArea = "subBtn";
  const ctitle = document.querySelector(".ctitle");
  ctitle.innerHTML = "Your message has been received. Thank you.";
  ctitle.style.fontSize = "1.5em";
};

contactInputContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    const formData = new FormData(contactInputContainer);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const eLink = "https://api.web3forms.com/submit";
    fetch(eLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        contactInputContainer.reset();
      });
  } catch (error) {
    console.log(error);
    // throw error;
  }
});
//fetch text content
fetch("/personalWebText.json")
  .then((res) => res.json())
  .then((data) => {
    const personalWebTextdata = data;
    //portrait
    const portraitText = document
      .getElementById("contentBlk")
      .getElementsByTagName("label");
    portraitText[0].innerHTML = personalWebTextdata[0].portraitIntroTitle;
    portraitText[1].innerHTML = personalWebTextdata[0].portraitIntroPara;
    //introText
    const contactBtn =
      '<div class="contactBtn btnTransit"><img alt="contact" src="./svg/contact.svg" /></div>';
    const introText = introTextContainer.getElementsByTagName("span");
    introText[0].innerHTML = personalWebTextdata[1].introTextTitle;
    introText[1].innerHTML = personalWebTextdata[1].introTextPara + contactBtn;
    introText[1].style.display = "flex";
    introText[1].style.flexDirection = "column";
    introText[1].style.rowGap = "1em";
    introText[1].style.marginTop = "1em";
    //introImg
    const introImg = document
      .getElementById("introImgContainer")
      .getElementsByTagName("img");
    introImg[0].setAttribute(
      "data-comment",
      personalWebTextdata[2].introImg[0].introImgPara
    );
    introImg[1].setAttribute(
      "data-comment",
      personalWebTextdata[2].introImg[1].introImgPara
    );
    introImg[2].setAttribute(
      "data-comment",
      personalWebTextdata[2].introImg[2].introImgPara
    );
    introImg[3].setAttribute(
      "data-comment",
      personalWebTextdata[2].introImg[3].introImgPara
    );
    // Instances
    const instancesBlock = document.getElementById("instancesBlock");
    const instancesTitles = instancesBlock.getElementsByTagName("span");
    const instancesImgs = instancesBlock.getElementsByTagName("img");
    const timelineData = personalWebTextdata[3].timeline;

    for (let i = 0; i < instancesTitles.length; i++) {
      instancesTitles[i].innerHTML = timelineData[i].timelineTitle;
      instancesImgs[i].setAttribute(
        "data-comment",
        timelineData[i].timelinePara
      );
    }

    // Slider
    const shiftSvg = '<img class="shiftIcon" src="./svg/shift.svg" />';
    const sliderTitles = document
      .getElementById("wrapper")
      .getElementsByTagName("span");
    const slideData = personalWebTextdata[4].slides;

    for (let i = 0; i < sliderTitles.length; i++) {
      sliderTitles[i].innerHTML = slideData[i].slideTextTitle + shiftSvg;
    }

    const sliderImg = document
      .getElementById("wrapper")
      .getElementsByTagName("img");
    sliderImg[1].setAttribute(
      "data-comment",
      personalWebTextdata[4].slides[1].slideTextPara
    );
    sliderImg[3].setAttribute(
      "data-comment",
      personalWebTextdata[4].slides[2].slideTextPara
    );
    sliderImg[5].setAttribute(
      "data-comment",
      personalWebTextdata[4].slides[3].slideTextPara
    );
    sliderImg[7].setAttribute(
      "data-comment",
      personalWebTextdata[4].slides[4].slideTextPara
    );
    //footer
    const footerText = document
      .querySelector(".footer")
      .getElementsByTagName("span");
    footerText[0].innerHTML = personalWebTextdata[5].footerText;

    //contactpop
    const contactBtns = document.querySelectorAll(".contactBtn");
    contactBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        pop.style.pointerEvents = "all";
        pop.style.opacity = "1";
        imgContainer.style.display = "none";
        contactInputContainer.style.display = "grid";
        contactInputContainer.style.transform = "scale(1)";
      });
    });
  });
