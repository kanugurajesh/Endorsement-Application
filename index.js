let table = document.getElementById("table")
let left = document.getElementById("left")
let right = document.getElementById("right")
let publish = document.getElementById("publish")
let h43;
let textareaValue = document.getElementById("textareaValue")
let number = 0;

publish.addEventListener("click", function () {
    // get the value of left tag
    let leftValue = left.value
    let rightValue = right.value
    let textValue = textareaValue.value

    // create a div element
    let div = document.createElement("div")
    div.setAttribute("class", "row")
    // create a h4 element
    let h4 = document.createElement("h4")
    h4.setAttribute("class", "row-2")
    h4.innerHTML = leftValue
    div.appendChild(h4)
    // create a p element
    let p = document.createElement("p")
    p.setAttribute("class", "row-3")
    p.innerHTML = textValue
    div.appendChild(p)
    // create a new div element
    let div2 = document.createElement("div")
    div2.setAttribute("class", "row-2")
    // set id for div2
    div2.setAttribute("id", "div2")
    // create a h4 element
    let h42 = document.createElement("h4")
    h42.setAttribute("class", "col-1")
    h42.innerHTML = rightValue
    div2.appendChild(h42)
    // create a h4 element
    let h43 = document.createElement("h4")
    h43.setAttribute("class", "col-2")
    // set id for h43
    h43.setAttribute("id", "h43")
    h43.innerHTML = "🖤 " + number
    div2.appendChild(h43)
    div.appendChild(div2)
    table.appendChild(div)

    // add event listener to h43
    h43.addEventListener("click", function () {
        number = number + 1
        h43.innerHTML = "🖤 " + number
    });
});
