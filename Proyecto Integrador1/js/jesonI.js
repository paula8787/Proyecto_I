document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbarStudyNest");

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll);
});
