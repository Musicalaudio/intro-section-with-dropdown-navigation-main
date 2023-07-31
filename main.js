let nav = document.querySelector(".nav");
let menuButton = document.querySelector(".nav__menu-button");
let dropdownBtn = document.querySelectorAll(".nav__dropdown button");
let dropdown = document.querySelectorAll(".nav__dropdown-menu");
let links = document.querySelectorAll(".nav__dropdown-item a");

menuButton.addEventListener("click", () => {
  const visiblity = nav.getAttribute("data-visible");
  if (visiblity === "false") {
    nav.setAttribute("data-visible", true);
    menuButton.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    menuButton.setAttribute("aria-expanded", false);
  }
});

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);
    console.log("hi");
    dropdownElement.parentElement.classList.toggle("active");
    // console.log(dropdownElement);
    dropdown.forEach((drop) => {
      drop.classList.remove("active");
      if (drop.id !== btn.dataset["dropdown"]) {
        setAriaExpandedFalse();
      }
    });
    e.stopPropagation();
    // console.log(btn.getAttribute("aria-expanded") === "true");
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});
