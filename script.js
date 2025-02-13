function addBook(){
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    //newRow.id = table.rows.length + 1;

    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
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

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Not Started"
}

function removeBook(){
    let table = document.getElementById("table");
    let allRows = table.getElementsByTagName("tr");
    let bookName = document.getElementById("remove").value;
    for(let i=0;i<allRows.length;i++){
        let cell = allRows[i].getElementsByTagName("td")[0];//title
        if(cell && cell.textContent.trim() === bookName){
            table.deleteRow(i);
            break;
        }
    }
    document.getElementById("remove").value ="";
}
//ChatGPT Generated
function filterBooks() {
    let input = document.getElementById("search").value.trim().toLowerCase(); // Get input & make lowercase
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tr"); // Get all table rows

    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header
        let titleCell = rows[i].getElementsByTagName("td")[0]; // Get first column (Title)
        let title = titleCell?.textContent.trim().toLowerCase(); // Get title text

        // Show row if title contains input, else hide it
        rows[i].style.display = title.includes(input) ? "" : "none";
    }
}
