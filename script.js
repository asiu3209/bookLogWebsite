function addBook(){
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    newRow.id = table.rows.length + 1;

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
    document.getElementById("status").value = "Not Started";

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "Not Started";
}