var map = document.getElementById("map")
var bodyNodes = []

//when refresh the page, generate div as food and snake head
function createDiv(color) {
    var div = document.createElement("div")
    map.appendChild(div)
    div.style.left = parseInt(Math.random() * 10) * 50 + "px"
    div.style.top = parseInt(Math.random() * 10) * 50 + "px"
    div.style.background = color
    return div
}
var headNode = createDiv("blue")
headNode.value = "left"
console.log(headNode.value)
var foodNode = createDiv("red")
console.log(foodNode)
console.log(Math.random())
function move() {
    if (bodyNodes.length > 0) {
        for (var n = bodyNodes.length - 1; n >= 0; n--) {
            switch (bodyNodes[n].value) {
                case "left":
                    bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) - 50 + "px"
                    break
                case "right":
                    bodyNodes[n].style.left = parseInt(bodyNodes[n].style.left) + 50 + "px"
                    break
                case "up":
                    bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) - 50 + "px"
                    break
                case "down":
                    bodyNodes[n].style.top = parseInt(bodyNodes[n].style.top) + 50 + "px"
                    break
            }

            if (n == 0) {
                bodyNodes[n].value = headNode.value
            }
            else {
                bodyNodes[n].value = bodyNodes[n - 1].value
            }
        }
    }

    switch (headNode.value) {
        case "left":
            headNode.style.left = parseInt(headNode.style.left) - 50 + "px"
            break
        case "right":
            headNode.style.left = parseInt(headNode.style.left) + 50 + "px"
            break
        case "up":
            headNode.style.top = parseInt(headNode.style.top) - 50 + "px"
            break
        case "down":
            headNode.style.top = parseInt(headNode.style.top) + 50 + "px"
            break
    }
    //hit the wall
    if (parseInt(headNode.style.left) < 0 || parseInt(headNode.style.left) > 450
        || parseInt(headNode.style.top) < 0 || parseInt(headNode.style.top) > 450) {
        clearInterval(t)
        alert("You hit the wall!")
    }
    //hit the tail
    if (bodyNodes.length > 0) {
        for (var n = 0; n < bodyNodes.length; n++) {
            if (headNode.style.left == bodyNodes[n].style.left &&
                headNode.style.top == bodyNodes[n].style.top) {
                alert("You hit your tail!")
                clearInterval(t)
            }
        }
    }

    if (headNode.style.left == foodNode.style.left && headNode.style.top == foodNode.style.top) {
        var bodyNode = createDiv("lightblue")
        var lastNode
        if (bodyNodes.length > 0) {
            lastNode = bodyNodes[bodyNodes.length - 1]
        }
        else {
            lastNode = headNode
        }
        switch (lastNode.value) {
            case "left":
                bodyNode.style.left = parseInt(lastNode.style.left) + 50 + "px"
                bodyNode.style.top = lastNode.style.top
                break
            case "right":
                bodyNode.style.left = parseInt(lastNode.style.left) - 50 + "px"
                bodyNode.style.top = lastNode.style.top
                break
            case "up":
                bodyNode.style.top = parseInt(lastNode.style.top) + 50 + "px"
                bodyNode.style.left = lastNode.style.left
                break
            case "down":
                bodyNode.style.top = parseInt(lastNode.style.top) - 50 + "px"
                bodyNode.style.left = lastNode.style.left
                break
        }
        bodyNode.value = lastNode.value
        bodyNodes.push(bodyNode)
        var px = parseInt(Math.random() * 10) * 50
        var py = parseInt(Math.random() * 10) * 50
        for (var n = 0; n < bodyNodes.length; n++) {
            if (parseInt(bodyNodes[n].style.left) == px && parseInt(bodyNodes[n].style.top) == py) {
                px = parseInt(Math.random() * 10) * 50
                py = parseInt(Math.random() * 10) * 50
                n = -1
            }
        }
        foodNode.style.left = px + "px"
        foodNode.style.top = py + "px"
    }
}

function refresh() {
    location.reload();
}

function btnslow() {
    clearInterval(t)
    t = setInterval(move, 500)
}

function btnnormal() {
    clearInterval(t)
    t = setInterval(move, 350)
}

function btnfast() {
    clearInterval(t)
    t = setInterval(move, 200)
}


var t = setInterval(move, 1000000)
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            if (headNode.value != "right" || bodyNodes.length == 0) {
                headNode.value = "left"
            }
            break
        case 38:
            if (headNode.value != "down" || bodyNodes.length == 0) {
                headNode.value = "up"
            }
            break
        case 39:
            if (headNode.value != "left" || bodyNodes.length == 0) {
                headNode.value = "right"
            }
            break
        case 40:
            if (headNode.value != "up" || bodyNodes.length == 0) {
                headNode.value = "down"
            }
            break
    }
}
