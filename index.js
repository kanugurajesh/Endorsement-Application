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

// get the elements from the html
let table = document.getElementById("table")
let left = document.getElementById("left")
let right = document.getElementById("right")
let publish = document.getElementById("publish")
let h43;
let textareaValue = document.getElementById("textareaValue")
let number = 0;
let booksData = new Set();

// add event listener to the publish button
publish.addEventListener("click", function () {
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

    // check if the value is empty

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
        likes: 0,
        addLike: true
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

    // if the object is not in the database add it to the database

    if (!isDataExist) {
        set(push(dbRef), data);
    }
}

// create a function to get the data from the database and add it to the list

function getDataFromDatabase() {
    // get the data from the database
    onValue(dbRef, (snapshot) => {
        table.innerHTML = ""
        // store all the snapshot values in a set
        if (snapshot.val() !== null) {
            // store all the snapshot values in a set
            booksData = new Set(Object.entries(snapshot.val()));
        } else {
            booksData = new Set();
        }
        // loop through the set
        booksData.forEach((book) => {

            // create a div element
            let div = document.createElement("div")
            // set the class for the div
            div.setAttribute("class", "row")
            // create a h4 element
            let h4 = document.createElement("h4")
            // set the class for the h4
            h4.setAttribute("class", "row-2")
            // set the inner html for the h4
            h4.innerHTML = book[1].left
            // append the h4 to the div
            div.appendChild(h4)
            // create a p element
            let p = document.createElement("p")
            // set the class for the p
            p.setAttribute("class", "row-3")
            // set the inner html for the p
            p.innerHTML = book[1].textValue
            // append the p to the div
            div.appendChild(p)
            // create a new div element
            let div2 = document.createElement("div")
            // set the class for the div2
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
            // create a new h4 element
            let h44 = document.createElement("h4")
            h44.setAttribute("class", "col-3")
            h44.innerHTML = "🗑️ Delete"
            div2.appendChild(h44)
            // append the div2 to the div
            div.appendChild(div2)
            table.appendChild(div)

            // add event listener to the h43

            h43.addEventListener("click", function () {
                table.innerHTML = ""
                let bool;
                let id = h43.getAttribute("data-id")
                if (book[1].addLike === false) {
                    number = book[1].likes - 1
                    bool = true
                } else {
                    number = book[1].likes + 1
                    bool = false
                }
                update(ref(database, databaseName + "/" + id), {
                    likes: number,
                    addLike: bool
                });
                h43.innerHTML = "🖤 " + number
            });

            // add event listener to the h44

            h44.addEventListener("dblclick", function () {
                let id = h43.getAttribute("data-id")
                remove(ref(database, databaseName + "/" + id));
                getDataFromDatabase();
            });

        });
    });
}

// call the function
getDataFromDatabase();