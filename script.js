function addBook(){
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    //newRow.id = table.rows.length + 1;

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
    cell1.innerHTML = titleValue;
    cell2.innerHTML = authorValue;
    cell3.innerHTML = genreValue;
    
    // Create a dropdown for status inside the table
    //ChatGPT Generated
    let statusDropdown = document.createElement("select");
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
    cell4.appendChild(statusDropdown);

    //add book score dropdown
    let ratingDropdown = document.createElement("select");
    options = ["","1","2","3","4","5"];
    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        if (optionText === "") {
            option.selected = true;
        }
        ratingDropdown.appendChild(option);
    });
    cell5.appendChild(ratingDropdown);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Not Started"
}

function removeBook(){
    let table = document.getElementById("table");
    let allRows = table.getElementsByTagName("tr");
    let bookName = document.getElementById("remove").value.toLowerCase(); //compare non-case sensitive
    for(let i=0;i<allRows.length;i++){
        let cell = allRows[i].getElementsByTagName("td")[0];//title
        if(cell && cell.textContent.trim().toLowerCase() === bookName){ //ChatGPT Generated
            table.deleteRow(i);
            break;
        }
    }
    document.getElementById("remove").value ="";
}

function filterBooks() {
    let input = document.getElementById("search").value.trim().toLowerCase(); // Get input & make lowercase
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) { 
        let titleCell = rows[i].getElementsByTagName("td")[0];
        let title = titleCell?.textContent.trim().toLowerCase(); 
        rows[i].style.display = title.includes(input) ? "" : "none";
    }
}