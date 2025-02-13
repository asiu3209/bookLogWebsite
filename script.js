function addBook(){
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    newRow.id = table.rows.length + 1;

    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();

    cell1.innerHTML = document.getElementById("title").value;
    cell2.innerHTML = document.getElementById("author").value;
    cell3.innerHTML = document.getElementById("genre").value;
    cell4.innerHTML = document.getElementById("status").value;
}