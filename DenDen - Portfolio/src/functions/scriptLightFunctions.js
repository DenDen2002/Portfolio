const islightMode = localStorage.getItem("lightMode");
if (islightMode === "true") {
    document.body.style.backgroundColor = `var(--light_base)`;
    document.body.classList.remove("dark_mode");
    localStorage.setItem("lightMode", true);
} else if (islightMode === "false") {
    document.body.style.backgroundColor = `var(--dark_base)`;
    document.body.classList.add("dark_mode");
    localStorage.setItem("lightMode", false);
} else {
    document.body.style.backgroundColor = `var(--light_base)`;
    document.body.classList.remove("dark_mode");
    localStorage.setItem("lightMode", true);
}

