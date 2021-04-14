function setStyleAside() {
    for (const element of document.getElementsByTagName("aside")) {
        element.style.float = "right";
        element.style.width = "50%";
    }
}

function setStyleMain() {
    for (const element of document.getElementsByTagName("main")) {
        element.style.width = "40%";
    }
}

function setStyleNav() {
    for (const element of document.getElementsByTagName("nav")) {
        element.style.display = "inline-block";
    }
}

function setStyleBlockquote() {
    for (const element of document.getElementsByTagName("blockquote")) {
        element.style.fontFamily = "monospace";
    }
}

function setStyleAzure() {
    for (const element of document.getElementsByClassName("azure")) {
        element.style.backgroundColor = "azure";
    }
}

function setStyleBorder() {
    for (const element of document.getElementsByClassName("border")) {
        element.style.borderStyle = "solid";
        element.style.borderColor = "rgb(37, 37, 37)";
        element.style.borderWidth = "1px";
        element.style.boxShadow = "0px 0px 3px 2px #A8A8A8";
    }
}

function setStylePadding10() {
    for (const element of document.getElementsByClassName("p-10")) {
        element.style.padding = "10px";
    }
}

function setStyleMarginBottom25() {
    for(const element of document.getElementsByClassName("mb-25")) {
        element.style.marginBottom = "25px";
    }
}

function setStyle() {
    setStyleAside();
    setStyleMain();
    setStyleNav();
    setStyleBlockquote();
    setStyleAzure();
    setStyleBorder();
    setStylePadding10();
    setStyleMarginBottom25();
}

function unsetStyle() {
    for (const element of document.querySelectorAll("*:not(form)")) {
        element.style.all = "revert";
    };
}

document.getElementById("button-set").addEventListener("click", e => setStyle());
document.getElementById("button-unset").addEventListener("click", e => unsetStyle());