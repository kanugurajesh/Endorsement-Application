// importing functions from the web
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const appSettings = {
    databaseURL: "https://endorsing-364ca-default-rtdb.asia-southeast1.firebasedatabase.app"
}

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const databaseName = "endorsing"
const dbRef = ref(database, databaseName);


let table = document.getElementById("table")
let left = document.getElementById("left")
let right = document.getElementById("right")
let publish = document.getElementById("publish")
let h43;
let textareaValue = document.getElementById("textareaValue")
let number = 0;
let booksData = new Set();

publish.addEventListener("click", function () {
    /*
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

    setDataToDatabase();

    // add event listener to h43
    h43.addEventListener("click", function () {
        number = number + 1
        h43.innerHTML = "🖤 " + number
    });
    */
    setDataToDatabase();
    getDataFromDatabase();
});

// set the data to the database
function setDataToDatabase() {

    // get the data from the database
    onValue(dbRef, (snapshot) => {
        // store all the snapchat values in a set
        if (snapshot.val() !== null) {
            // store all the snapshot values in a set
            booksData = new Set(Object.entries(snapshot.val()));
        }
    });

    // get the value of left tag
    let leftValue = left.value
    let rightValue = right.value
    let textValue = textareaValue.value
    let isDataExist = false;

    if (leftValue === "") {
        alert("Please enter your name")
        return;
    } else if (rightValue === "") {
        alert("Please enter the receiver name")
        return;
    } else if (textValue === "") {
        alert("Please enter the message")
        return;
    }

    // create a object
    let data = {
        left: leftValue,
        right: rightValue,
        textValue: textValue,
        likes: 0
    }

    // check if the object is already in the database
    booksData.forEach((book) => {
        if (book[1].left === data.left && book[1].right === data.right && book[1].textValue === data.textValue) {
            alert("This message is already in the database please dont spam")
            isDataExist = true;
            return;
            // exit the loop
        }
    });

    if (!isDataExist) {
        set(push(dbRef), data);
    }
}

// create a function to get the data from the database and add it to the list
function getDataFromDatabase() {
    // clear the table
    table.innerHTML = ""
    // get the data from the database
    onValue(dbRef, (snapshot) => {
        // store all the snapshot values in a set
        booksData = new Set(Object.entries(snapshot.val()));
        // loop through the set
        booksData.forEach((book) => {
            // create a div element
            let div = document.createElement("div")
            div.setAttribute("class", "row")
            // create a h4 element
            let h4 = document.createElement("h4")
            h4.setAttribute("class", "row-2")
            h4.innerHTML = book[1].left
            div.appendChild(h4)
            // create a p element
            let p = document.createElement("p")
            p.setAttribute("class", "row-3")
            p.innerHTML = book[1].textValue
            div.appendChild(p)
            // create a new div element
            let div2 = document.createElement("div")
            div2.setAttribute("class", "row-2")
            // set id for div2
            div2.setAttribute("id", "div2")
            // create a h4 element
            let h42 = document.createElement("h4")
            h42.setAttribute("class", "col-1")
            h42.innerHTML = book[1].right
            div2.appendChild(h42)
            // create a h4 element
            let h43 = document.createElement("h4")
            h43.setAttribute("class", "col-2")
            // set id for h43
            h43.setAttribute("id", "h43")
            // set an attribute to store the the of the database
            h43.setAttribute("data-id", book[0])
            h43.innerHTML = "🖤 " + book[1].likes
            div2.appendChild(h43)
            div.appendChild(div2)
            table.appendChild(div)

            // add event listener to h43
            // h43.addEventListener("click", function () {
            //     // let number = book[1].likes + 1
            //     update(ref(database, databaseName + "/" + book[0]), {
            //         likes: book[1].likes + 1
            //     });
            //     // get the likes
            //     number = book[1].likes + 1
            //     h43.innerHTML = "🖤 " + number
            // });
            // create a function to update the likes when click on the h43
            h43.addEventListener("click", function () {
                // get the id of the database
                let id = h43.getAttribute("data-id")
                // get the likes
                number = book[1].likes + 1
                // update the likes
                update(ref(database, databaseName + "/" + id), {
                    likes: number
                });
                // get the likes
                number = book[1].likes + 1
                h43.innerHTML = "🖤 " + number
            });
        });
    });
}