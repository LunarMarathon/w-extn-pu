let uncheckedText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
let checkedText = []

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

function getUncheckedText(cell, cellNum) {
    if (localStorage.getItem(`checkedText`)) {
        checkedText = JSON.parse(localStorage.getItem(`checkedText`))
        // data is stored as strings in local storage so JSON parse and stringify is needed
    }
    // alert(checkedText)
    // alert((cell.classList.contains('green') || cell.classList.contains('red') || cell.classList.contains('grey') || cell.classList.contains('dead')))
    if ((cell.classList.contains('green') || cell.classList.contains('red') || cell.classList.contains('grey') || cell.classList.contains('dead'))) {
        if (!checkedText.includes(cellNum)) {
            // this is needed as the same number is added to the checked array when different buttons are clicked
            // and then only one of the repeated numbers is spliced but the rest are still there
            // so it doesn't get added back to the unchecked array
            checkedText.push(cellNum)
            // alert(uncheckedText)
        }
    }
    else {
        let misClick = checkedText.indexOf(cellNum)
        checkedText.splice(misClick, 1)
        // alert(checkedText)
    }
    document.getElementById("unchecked").innerText = uncheckedText.filter(function (el) {
        return !checkedText.includes(el);
    })

    localStorage.setItem(`checkedText`, JSON.stringify(checkedText))

    // document.getElementById("unchecked").innerText = uncheckedText
    // checkedText.push(cellNum)
}

// const checkedClassNames = ['green', 'red', 'grey', 'dead']

function goodBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("red")
    element.parentNode.parentNode.classList.remove("grey")
    element.parentNode.parentNode.classList.toggle("green")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
    getUncheckedText(element.parentNode.parentNode, cellNum)
    //=> btn.btnContainer.gridCell.classlist - cell's class list
}
function evilBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("green")
    element.parentNode.parentNode.classList.remove("grey")
    element.parentNode.parentNode.classList.toggle("red")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
    getUncheckedText(element.parentNode.parentNode, cellNum)
}
function uknBtn(element, cellNum) {
    element.parentNode.parentNode.classList.remove("green")
    element.parentNode.parentNode.classList.remove("red")
    element.parentNode.parentNode.classList.toggle("grey")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
    getUncheckedText(element.parentNode.parentNode, cellNum)
}
function deadBtn(element, cellNum) {
    element.parentNode.parentNode.classList.toggle("dead")
    localStorage.setItem(`cell${cellNum}`, element.parentNode.parentNode.classList)
    getUncheckedText(element.parentNode.parentNode, cellNum)
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
        else if (button.id == "reset") {
            localStorage.clear()
            chrome.runtime.reload()
            //closes automatically after reset
        }
        else {
            copyToClipboard()
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

function copyToClipboard() {
    const copyText = document.getElementById("unchecked")
    navigator.clipboard.writeText(copyText.textContent)
    // alert("Copied the text: " + copyText)
    //This alert was causing issues in copying the text lol
    // document.getElementById("copyAck").style.display = "block"
    document.getElementById("copyBtn").innerHTML = `<img src = "clipboard-check-solid.svg" class="copy"/>`
    setTimeout(function(){
        document.getElementById("copyBtn").innerHTML = `<img src="clipboard-regular.svg" class="copy" />`
    }, 1500)
}

if (localStorage.getItem(`checkedText`)) {
    checkedText = JSON.parse(localStorage.getItem(`checkedText`))
    // data is stored as strings in local storage so JSON parse and stringify is needed
}

document.getElementById("unchecked").innerText = uncheckedText.filter(function (el) {
    return !checkedText.includes(el)
})