const hamburger_button = document.getElementById('hamburger');
const profile_button = document.getElementById('profile');
let navlist = document.getElementById('navlist');
let profile_details = document.getElementById('profile_details');

hamburger_button.addEventListener("click", () => {
    let display = navlist.style.display;
    if (display == "none") {
        navlist.style.display = "flex";
    }
    else {
        navlist.style.display = "none";
    }

});

profile_button.addEventListener("click", () => {
    profile_details.classList.toggle("hidden");
});