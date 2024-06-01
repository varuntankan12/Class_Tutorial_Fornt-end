function screenWidthRestriction() {
    if (window.outerWidth < 900) {
        const clonewarning = warning.cloneNode(true);
        const warning_contnet = clonewarning.querySelector('p');
        let body = document.getElementById("quiz-container");
        clonewarning.classList.remove('hidden-imp');
        warning_contnet.textContent = "This Page cannot be opened in this Device, Please use a Laptop or a Desktop to continue.";
        body.innerHTML = "";
        body.appendChild(clonewarning);
    }
}