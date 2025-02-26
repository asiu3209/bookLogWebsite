var selectID = 0;

function removeBook(){
    let table = document.getElementById("table");
    let allRows = table.getElementsByTagName("tr");
    let bookName = document.getElementById("remove").value.trim().toLowerCase(); //compare non-case sensitive
    for(let i=0;i<allRows.length;i++){
        let cell = allRows[i].getElementsByTagName("td")[1];//title
        if(cell && cell.textContent.trim().toLowerCase() === bookName){ 
            table.deleteRow(i);
            document.getElementById("remove").value = "";
            return;
        } 
    }
    alert("Book not found!");
}

function filterBooks() {
    let input = document.getElementById("search").value.trim().toLowerCase(); // Get input & make lowercase
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) { 
        let titleCell = rows[i].getElementsByTagName("td")[1];
        let title = titleCell?.textContent.trim().toLowerCase(); 
        rows[i].style.display = title.includes(input) ? "" : "none";
    }
}

function filterGenre() {
    let input = document.getElementById("filterGenre").value.trim().toLowerCase(); // Get input & make lowercase
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) { 
        let titleCell = rows[i].getElementsByTagName("td")[3];
        let title = titleCell?.textContent.trim().toLowerCase(); 
        rows[i].style.display = title.includes(input) ? "" : "none";
    }
}

function playSound(id){
    let selected = document.getElementById(id);
    if(selected.value === "Completed"){
        let audio = new Audio("congrats.mp3");
        audio.play();
    }
}

//call google books api
function getBookCover(title, author,cell){
    let url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let cover = data.items[0].volumeInfo.imageLinks.thumbnail;
        cell.appendChild(cover);
    })
    .catch(error => {
        console.log(error);
        cell.textContent = "No cover available";
    });

}

function addBook() {
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
    let cell5 = newRow.insertCell();
    let cell6 = newRow.insertCell();
    
    let titleValue = document.getElementById("title").value;
    let authorValue = document.getElementById("author").value;
    let genreValue = document.getElementById("genre").value;
    let statusValue = document.getElementById("status").value;
    
    cell2.innerHTML = titleValue;
    cell3.innerHTML = authorValue;
    cell4.innerHTML = genreValue;
    
    let statusDropdown = document.createElement("select");
    statusDropdown.id = selectID++;
    let options = ["Not Started", "Reading", "Completed"];
    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        if (optionText === statusValue) {
            option.selected = true;
        }
        statusDropdown.appendChild(option);
    });
    statusDropdown.onchange = function() {
        playSound(statusDropdown.id);
    };
    cell5.appendChild(statusDropdown);
    
    let ratingDropdown = document.createElement("select");
    let ratingOptions = ["", "1", "2", "3", "4", "5"];
    ratingOptions.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        ratingDropdown.appendChild(option);
    });
    cell6.appendChild(ratingDropdown);
    
    fetchBookCover(titleValue, authorValue, cell1);
    
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Not Started";
}

//call google books api
function fetchBookCover(title, author, cell) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let cover = document.createElement("img");
            cover.src = data.items[0].volumeInfo.imageLinks.thumbnail;
            cover.style.width = "75px";
            cover.style.height = "75px";
            cell.appendChild(cover);
        })
        .catch(error => {
            console.log(error);
            cell.textContent = "No cover available";
        });
}

function addBook() {
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    //newRow.id = table.rows.length + 1;
    let cell0 = newRow.insertCell();//book cover
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
    let cell5 = newRow.insertCell();
    // Get values
    let titleValue = document.getElementById("title").value;
    let authorValue = document.getElementById("author").value;
    let genreValue = document.getElementById("genre").value;
    let statusValue = document.getElementById("status").value;
    //set values
    getBookCover(titleValue, authorValue, cell0);
    cell1.innerHTML = titleValue;
    cell2.innerHTML = authorValue;
    cell3.innerHTML = genreValue;
    
    // Create a dropdown for status inside the table
    //ChatGPT Generated
    let statusDropdown = document.createElement("select");
    statusDropdown.id = selectID++;
    let options = ["Not Started", "In Progress", "Completed"];
    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        if (optionText === statusValue) {
            option.selected = true;
        }
        statusDropdown.appendChild(option);
    });
    statusDropdown.onchange = function() {
        playSound(statusDropdown.id);
    };
    cell4.appendChild(statusDropdown);

    //add book score dropdown
    let ratingDropdown = document.createElement("select");
    let ratingOptions = ["","1","2","3","4","5"];
    ratingOptions.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        ratingDropdown.appendChild(option);
    });
    cell5.appendChild(ratingDropdown);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Not Started"
}

//Same function as add book but used to initialize the table with the starting books
function addBookFromData(titleValue, authorValue, genreValue, statusValue) {
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
    let cell5 = newRow.insertCell();
    let cell6 = newRow.insertCell();
    
    cell2.innerHTML = titleValue;
    cell3.innerHTML = authorValue;
    cell4.innerHTML = genreValue;
    
    let statusDropdown = document.createElement("select");
    statusDropdown.id = selectID++;
    let options = ["Not Started", "Reading", "Completed"];
    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        if (optionText === statusValue) {
            option.selected = true;
        }
        statusDropdown.appendChild(option);
    });
    statusDropdown.onchange = function() {
        playSound(statusDropdown.id);
    }
    cell5.appendChild(statusDropdown);
    
    let ratingDropdown = document.createElement("select");
    let ratingOptions = ["", "1", "2", "3", "4", "5"];
    ratingOptions.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        ratingDropdown.appendChild(option);
    });
    cell6.appendChild(ratingDropdown);
    
    fetchBookCover(titleValue, authorValue, cell1);
}

//initialize the table with the starting books
function initialize() {
    var books = [
        {title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", status: "Not Started"},
        {title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "Non-Fiction", status: "Not Started"},
        {title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Drama", status: "Not Started"},
        {title: "1984", author: "George Orwell", genre: "Fiction", status: "Not Started"},
        {title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", status: "Not Started"}
    ];
    books.forEach(book => {
        addBookFromData(book.title, book.author, book.genre, book.status);
    });
}
window.onload = initialize;
