let highestZIndex = 100;

// Clock Functionality
function updateTime() {
    const currentTime = new Date().toLocaleString();
    document.querySelector("#timeElement").innerText = currentTime;
}
setInterval(updateTime, 1000);
updateTime();

// Bring window to front on click
function setupWindowFocus(element) {
    element.addEventListener("mousedown", () => {
        highestZIndex++;
        element.style.zIndex = highestZIndex;
    });
}

// Window Management Helper
function bindWindowControls(openBtnId, windowId, closeBtnId) {
    const openBtn = document.querySelector(openBtnId);
    const win = document.querySelector(windowId);
    const closeBtn = document.querySelector(closeBtnId);

    setupWindowFocus(win);
    dragElement(win);

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            win.style.display = "flex";
            highestZIndex++;
            win.style.zIndex = highestZIndex;
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            win.style.display = "none";
        });
    }
}

// Initialize Windows
bindWindowControls("#welcomeopen", "#welcomeWindow", "#welcomeclose");
bindWindowControls("#notesOpen", "#myNote", "#notesClose");
bindWindowControls("#calcOpen", "#myCalc", "#calcClose");

// Drag and Drop Engine
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "Header") || elmnt;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Notes App
const clearBtn = document.querySelector("#clearNoteBtn");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        document.querySelector("#notesArea").value = "";
    });
}

// Calculator Engine
const screen = document.getElementById("calcScreen");

function appendCalc(val) {
    if (screen.value === "0" && val !== ".") {
        screen.value = val;
    } else {
        screen.value += val;
    }
}

function clearCalc() {
    screen.value = "0";
}

function deleteCalc() {
    screen.value = screen.value.slice(0, -1);
    if (screen.value === "") screen.value = "0";
}

function calculateResult() {
    try {
        screen.value = eval(screen.value);
    } catch (e) {
        screen.value = "Error";
    }
}
