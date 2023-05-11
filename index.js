const rep = document.getElementById("rep")
let repHtml = ""
for (let i = 1; i < 17; i++) {
    repHtml += `
            <div class="gridCell">
                <div>${i}</div>
                <div>
                    <button data-button-type="g"><img src="images/good.png" /></button>
                    <button data-button-type="e"><img src="images/evil.png" /></button>
                    <button data-button-type="u"><img src="images/ukn.png" /></button>
                    <button data-button-type="d"><img src="images/dead.png" /></button>
                </div>
            </div>
    `
}
rep.innerHTML = repHtml

function goodBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("red")
    element.parentNode.parentNode.classList.remove("grey")
    element.parentNode.parentNode.classList.toggle("green")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
    //=> btn.btnContainer.gridCell.classlist - cell's class list
}
function evilBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("green")
    element.parentNode.parentNode.classList.remove("grey")
    element.parentNode.parentNode.classList.toggle("red")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
}
function uknBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("green")
    element.parentNode.parentNode.classList.remove("red")
    element.parentNode.parentNode.classList.toggle("grey")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
}
function deadBtn(element, cellNum) {
    element.parentNode.parentNode.classList.toggle("dead")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
}

const buttons = document.querySelectorAll("button")
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonType = button.dataset.buttonType
        const cell = button.parentNode.parentNode.children[0].innerText
        //=> btn.btnContainer.gridCell.numDiv.text - role num
        if (buttonType === "g") {
            goodBtn(button, cell)
        } else if (buttonType === "e") {
            evilBtn(button, cell)
        } else if (buttonType === "u") {
            uknBtn(button, cell)
        } else if (buttonType === "d") {
            deadBtn(button, cell)
        }
        else {
            localStorage.clear()
            chrome.runtime.reload()
            //closes automatically after reset
        }
    });
});

const cells = document.querySelectorAll(".gridCell")
cells.forEach((cell, index) => {
    const cellClassList = localStorage.getItem(`cell${index + 1}`)
    if (cellClassList) {
        cell.classList = cellClassList
    }
})