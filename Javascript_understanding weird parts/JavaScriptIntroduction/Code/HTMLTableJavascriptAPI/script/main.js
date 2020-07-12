function buildTable() {
		addLineToHTMLTable("Michel", "Buffa");
  		addLineToHTMLTable("Marie-Claire", "Forgue");
  		addLineToHTMLTable("Tim", "Berners-Lee");
}

// Add a line to the HTML table
function addLineToHTMLTable(firstName, lastName) {
    // Get the body of the table using the selector API
    var tableBody = document.querySelector("#tableContactBody");
  
	// Add a new row at the end of the table
    var newRow   = tableBody.insertRow();

   // add  new cells to the row
   var firstNameCell  = newRow.insertCell();
   firstNameCell.innerHTML = firstName;
  
   var lastNameCell   = newRow.insertCell();
   lastNameCell.innerHTML = lastName;
}

function buildTableHeader()
{
	var a = "<tr><th>Given name</th><th>Family name</th></tr>";
	 var tableHead= document.querySelector("#tHeadId");
	 tableHead.innerHTML=a;
}