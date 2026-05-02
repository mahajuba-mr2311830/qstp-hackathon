const signinBtn = document.getElementById("signinBtn");
const signinMenu = document.getElementById("signinMenu");
const carousel = document.getElementById("postCarousel");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

let autoScrollInterval;
let resumeTimeout;

signinBtn.addEventListener("click", () => {
  signinMenu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = signinMenu.contains(event.target);
  const clickedSignInButton = signinBtn.contains(event.target);

  if (!clickedInsideMenu && !clickedSignInButton) {
    signinMenu.classList.remove("active");
  }
});

function startAutoScroll() {
  stopAutoScroll();

  autoScrollInterval = setInterval(() => {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    if (carousel.scrollLeft >= maxScrollLeft - 2) {
      carousel.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      carousel.scrollBy({
        left: 1.2,
        behavior: "auto"
      });
    }
  }, 16);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function pauseThenResume() {
  stopAutoScroll();
  clearTimeout(resumeTimeout);

  resumeTimeout = setTimeout(() => {
    startAutoScroll();
  }, 2500);
}

scrollLeftBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -360,
    behavior: "smooth"
  });

  pauseThenResume();
});

scrollRightBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: 360,
    behavior: "smooth"
  });

  pauseThenResume();
});

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

carousel.addEventListener("wheel", pauseThenResume);
carousel.addEventListener("touchstart", pauseThenResume);
carousel.addEventListener("mousedown", pauseThenResume);
carousel.addEventListener("scroll", () => {
  clearTimeout(resumeTimeout);

  resumeTimeout = setTimeout(() => {
    startAutoScroll();
  }, 3000);
});

startAutoScroll();

/*
  Example placeholder for future AI/social-media integration.

  In a real website, this function would call your backend API.
  The backend would connect to approved company social media accounts,
  pull public/latest posts, summarise them using AI, and return clean data
  for display on this dashboard.
*/

async function loadSocialPosts() {
  const exampleApiResponse = [
    {
      company: "Digital Education",
      platform: "LinkedIn",
      title: "Today we achieved a new milestone in digital learning.",
      summary: "Learner engagement improved across partner schools.",
      image: "Image preview"
    },
    {
      company: "WaterTech",
      platform: "Instagram",
      title: "Today we completed field testing for our smart water-monitoring unit.",
      summary: "The system provides faster leakage detection.",
      image: "Image preview"
    }
  ];

  console.log("Future AI-pulled posts:", exampleApiResponse);
}

loadSocialPosts();