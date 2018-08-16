//Written By Royce Duncan, 4/18/2018

//global references
var orderName = document.getElementById("order_name");						//reference to the order name input text field
var orderNameError = document.getElementById("order_name_error");			//reference to the order name error element

var stateSelect = document.getElementById("state_select");					//reference to the state input select
var stateSelectError = document.getElementById("state_select_error");		//reference to the state error element

var orderTable = document.getElementById("order_item_table");				//reference to the order table
var orderListError = document.getElementById("order_list_error");			//reference to the order table error element

var weight = document.getElementById("weight");								//reference to the weight element
var subTotal = document.getElementById("sub_total");						//reference to the sub total element
var discount = document.getElementById("discount");							//reference to the discount element
var tax = document.getElementById("tax");									//reference to the tax element
var shipping = document.getElementById("shipping");							//reference to the shipping element
var grandTotal = document.getElementById("grand_total");					//reference to the grand total element

//called when the 'add item' button is pressed
//this function creates a new row in the order table and populates the new cells with the necessary form elements.
function addRow()
{
	var numRows = orderTable.rows.length;			//gets the length of the order table
	var row = orderTable.insertRow(numRows - 1);	//creates and inserts a new row at the second to last row of the table
	var cell0 = row.insertCell(0);					//creates and inserts a new cell on the new row for the type list
	var cell1 = row.insertCell(1);					//creates and inserts a new cell on the new row for the size list
	var cell2 = row.insertCell(2);					//creates and inserts a new cell on the new row	for the flavor list
	var cell3 = row.insertCell(3);					//creates and inserts a new cell on the new row for the quantity amount
	var cell4 = row.insertCell(4);					//creates and inserts a new cell on the new row for the delete row button
	
	//inserts html for a select element for bakery type within the first cell
	cell0.innerHTML = 	'<select class="item_type" onchange="prepRow(this); UpdateSelect(this);" required>' +
							'<option style="display:none"></option>' +
							'<option>CupCake</option>' +
							'<option>Cookie</option>' +
							'<option>Cake</option>' +
						'</select>';
	
	//inserts html for a select element for item size within the second cell
	cell1.innerHTML = 	'<select class="item_size" onchange="prepQuantity(this); UpdateSelect(this);" style="width: 75px;" disabled required>' +
							'<option style="display:none"></option>' +
							'<option>Mini</option>' +
							'<option>Regular</option>' +
							'<option>Large</option>' +
						'</select>';
						
	//inserts html for a select element for item flavor within the thirds cell
	cell2.innerHTML =	'<select class="item_flavor" style="width: 121px;" onchange="UpdateSelect(this);" disabled required>' +
							'<option style="display:none"></option>' +
							'<option></option>' +
							'<option></option>' +
							'<option></option>' +
							'<option></option>' +
							'<option></option>' +
						'<select>';
						
	//inserts html for a number input element for item quantity within the fourth cell
	cell3.innerHTML = 	'<input class="item_quantity" type="number" name="quantity" min="1" max="100" value="1" style="width:3em;" onchange="updateTotals()" disabled required>';
	
	//inserts html for a delete button for the row within the fifth cell
	cell4.innerHTML = 	'<input type="button" id="delete_item_button" value="X" onclick="deleteRow(this)">';
	
	//creates a custom css style for the fifth cell to center the delete button
	cell4.style.textAlign = 'center';
}

//called when a specific row's delete button is pressed
function deleteRow(btn) {
	var row = btn.parentNode.parentNode;	//create a reference to the cells row
	row.parentNode.removeChild(row);		//delete itself from the table
	updateTotals();							//update the totals to reflect the change
}

//called when a row's 'type select' has changed from a previous selection
//this function prepares the the other cells in a row for user selection.
function prepRow(typeSelect)
{
	var row = typeSelect.parentNode.parentNode;					//creates a reference to a specific cell's row.
	var sizeSelect = row.cells[1].firstChild;					//creates a reference to a specific cell's size select element
	var flavorSelect = row.cells[2].firstChild;					//creates a reference to a specific cell's flavor select element
	var quantityCell = row.cells[3];							//creates a reference to a specific cell's quantity input element
	
	sizeSelect.selectedIndex = 0;								//resets the size select element to the default selection
	sizeSelect.disabled = false;								//enables the size select element
	
	flavorSelect.selectedIndex = 0;								//resets the flavor select element to the default selection
	flavorSelect.disabled = false;                              //enables the flavor select element
	
	quantityCell.firstChild.value = "1";						//resets the quantity input element to 1
	quantityCell.firstChild.disabled = true;                    //enables the quantity input element
	
	if (typeSelect.selectedIndex == "1")						//if user selects a cupcake type, add these flavor options to the flavor select element
	{
		flavorSelect.options[1].text = "Chocolate";
		flavorSelect.options[2].text = "Vanilla";
		flavorSelect.options[3].text = "Butter";
		flavorSelect.options[4].text = "Carrot";
		flavorSelect.options[5].text = "Red Velvet";
	}
	else if (typeSelect.selectedIndex == "2")					//if user selects a cookie type, add these flavor options to the flavor select element
	{
		flavorSelect.options[1].text = "Chocolate Chip";
		flavorSelect.options[2].text = "Sugar";
		flavorSelect.options[3].text = "Peanut";
		flavorSelect.options[4].text = "Oatmeal Raisin";
		flavorSelect.options[5].text = "Butterscotch";
	}
	else														//else user selected a cake type, add these flavor options to the flavor select element
	{
		flavorSelect.options[1].text = "Chocolate";
		flavorSelect.options[2].text = "Vanilla";
		flavorSelect.options[3].text = "Butter";
		flavorSelect.options[4].text = "Carrot";
		flavorSelect.options[5].text = "Red Velvet";
	}
	
	if (quantityCell.lastChild.innerText != " dz")				//if the quantity cell doesn't have a 'dz' in it, add it
		quantityCell.innerHTML += '<a> dz</a>';					//adds the 'dz' text to the quantity cell
	
	if (typeSelect.selectedIndex == "3")						//if the user chose bakery type 'cake'...
	{
		var cakeOption = document.createElement("option");			//create a new option
		cakeOption.text = "Wedding";								//name it wedding
		sizeSelect.add(cakeOption);									//add it to the size select element
		quantityCell.removeChild(quantityCell.lastChild);			//and delete the 'dz' at the end of the quantity cell
	}
	else if (typeSelect.selectedIndex != "3" && sizeSelect.lastChild.text == "Wedding")	//else if the user didn't select a cake type and the last option in the size select is wedding...
	{
		sizeSelect.removeChild(sizeSelect.lastChild);									//remove the wedding option from the size select element
	}
	
	updateTotals();												//update the totals after the changes
}

//called when a size is chosen from the size select element
//this function prepares the other cells in the row for user input
function prepQuantity(sizeSelect)
{
	var quantityInput = sizeSelect.parentNode.parentNode.cells[3].firstChild;	//creates a reference for the quantity input
	quantityInput.value = "1";													//resets the quantity input value to 1
	quantityInput.disabled = false;												//enables the quantity input for user input
	updateTotals();																//updates the totals after the change
}

//called when the user clicks the submit button
//this function checks every user input field and determines if the data entered is valid
function ValidateForm()
{
	var orderListType = document.getElementsByClassName("item_type");			//creates a array of references to the type selection elements
	var orderListSize = document.getElementsByClassName("item_size");			//creates a array of references to the size selection elements
	var orderListFlavor = document.getElementsByClassName("item_flavor");		//creates a array of references to the flavor selection elements
	var orderListQuantity = document.getElementsByClassName("item_quantity");	//creates a array of references to the quantity input elements
	
	var errorDetected = false;													//sets the error detection flag to false
	
	if (orderName.checkValidity() == false)										//if the order name field is invalid then..
	{
		orderNameError.innerText = "*Enter a valid First and Last name";			//display error description text
		errorDetected = true;														//set the error detection flag to true
	}
	else																		//else
	{
		orderNameError.innerText = "";												//remove any potential error description text
	}
	
	if (stateSelect.checkValidity() == false)									//if the state select element is invalid then..
	{
		stateSelectError.innerText = "*Select a state";								//display error description text
		errorDetected = true;                                                       //set the error detection flag to true
	}
	else																		//else
	{
		stateSelectError.innerText = "";											//remove any potential error description text
	}
	
	
	for(var i = 0; orderListType.length > i; i++)								//loop for every type select element that exists.
	{
		orderListType[i].style.backgroundColor = "white";							//set the type select element's background
		orderListSize[i].style.backgroundColor = "white";							//set the size select element's background
		orderListFlavor[i].style.backgroundColor = "white";							//set the flavor select element's background
		orderListQuantity[i].style.backgroundColor = "white";						//set the quantity input element's background
	}
	
	orderListError.innerText = "";												//clears any potential the order table error text
	orderTable.style.borderColor = "black";										//resets the order table border to black
	
	if (orderListType.length == 0)												//if there are no type select elements then..
	{
		orderTable.style.borderColor = "red";										//set the order tables border to red
		orderListError.innerText = "*Add an item";									//adds a description to the error text field
		errorDetected = true;														//sets the error flag to true
	}
	else																		//else
	{	
		for(var i = 0; orderListType.length > i; i++)								//loops for every type select element available
		{
			if (orderListType[i].selectedIndex == 0)									//if a specific type select element is still on default then..
			{
				orderListType[i].style.backgroundColor = "#ffcccc";							//change the elements background color to red
				orderListError.innerText = "*Input missing";								//add an error description
				orderTable.style.borderColor = "red";										//change the error description color to red
				errorDetected = true;														//set the error flag to true
			}
			
			if (orderListSize[i].selectedIndex == 0)									//if a specific size select element is still on default then..
			{                                                                           
				orderListSize[i].style.backgroundColor = "#ffcccc";                     	//change the elements background color to red
				orderListError.innerText = "*Input missing";                            	//add an error description
				orderTable.style.borderColor = "red";                                   	//change the error description color to red
				errorDetected = true;                                                   	//set the error flag to true
			}
			
			if (orderListFlavor[i].selectedIndex == 0)									//if a specific flavor select element is still on default then..
			{                                                                           
				orderListFlavor[i].style.backgroundColor = "#ffcccc";                   	//change the elements background color to red
				orderListError.innerText = "*Input missing";                            	//add an error description
				orderTable.style.borderColor = "red";                                   	//change the error description color to red
				errorDetected = true;                                                   	//set the error flag to true
			}
			
			if (orderListQuantity[i].value < 1)											//if a specific quantity input element is less than 1 then..
			{                                                                           
				orderListQuantity[i].style.backgroundColor = "#ffcccc";                 	//change the elements background color to red
				orderListError.innerText = "*Quantity must be above 0";                     //add an error description
				orderTable.style.borderColor = "red";                                   	//change the error description color to red
				errorDetected = true;                                                   	//set the error flag to true
			}
		}
	}
	
	if (errorDetected)																	//if the error flag is true then..
	{
		document.getElementById("error_details").innerText = "*Fix all errors";				//set an error description
		document.getElementById("error_details").style.color = "red";						//change the error description color to red
		return false;
	}
	else																				//else
	{
		document.getElementById("error_details").innerText = "*Success";					//set a success description
		document.getElementById("error_details").style.color = "green";						//change the success description to green
		GenerateOutputData();																//call the generate output function
		return true;
	}
	
}

//called by other functions
//this function updates the totals at the bottom of the page every time a contingent element changes value
function updateTotals()
{	
	var weightValue = 0;														//creates and initializes a weight value to 0
	var subValue = 0.00;														//creates and initializes a sub total value to 0
	var discountValue = 0.00;													//creates and initializes a discount value to 0
	var taxValue = 0.00;														//creates and initializes a tax total value to 0
	var shippingValue = 0.00													//creates and initializes a shipping total value to 0
	var grandValue = 0.00;														//creates and initializes a grand total value to 0
	
	var orderListType = document.getElementsByClassName("item_type");			//creates a array of references to the type selection elements
	var orderListSize = document.getElementsByClassName("item_size");           //creates a array of references to the size selection elements
	var orderListQuantity = document.getElementsByClassName("item_quantity");   //creates a array of references to the quantity input elements
	                                                                           
	if (orderListType.length != 0 && stateSelect.selectedIndex != 0)			//if there are type elements available and there is a state selected
	{
		for(var i = 0; orderListType.length > i; i++)								//loop for every type select element that exists
		{
			switch(orderListType[i].selectedIndex)										//A specific type select elements current selection...
			{
				case 1:																		//if it is "cupcake" then..
					switch(orderListSize[i].selectedIndex)										//A specific size select elements current selection...
					{
						case 1:																		//if it is "Mini" then..
							weightValue += 2 * orderListQuantity[i].value;								//multiply the selections quantity by 2 lbs to find the total weight
							subValue += 13 * orderListQuantity[i].value;								//multiply the selections quantity by $13 to find the sub total value
							break;																		//break out of the size switch statement
						case 2:																		//if it is "Regular" then..
							weightValue += 6 * orderListQuantity[i].value;								//multiply the selections quantity by 6 lbs to find the total weight
							subValue += 18 * orderListQuantity[i].value;                            	//multiply the selections quantity by $18 to find the sub total value
							break;                                                                  	//break out of the size switch statement
						case 3:																		//if it is "Large" then..
							weightValue += 8 * orderListQuantity[i].value;								//multiply the selections quantity by 8 lbs to find the total weight
							subValue += 25 * orderListQuantity[i].value;                            	//multiply the selections quantity by $25 to find the sub total value
					}                                                                              
					break;																		//break out of the type switch statement
				case 2:																		//if it is "cookie" then..
					switch(orderListSize[i].selectedIndex)										//A specific size select elements current selection...
					{
						case 1:																		//if it is "Mini" then..
							weightValue += 2 * orderListQuantity[i].value;								//multiply the selections quantity by 2 lbs to find the total weight
							subValue += 15 * orderListQuantity[i].value;                            	//multiply the selections quantity by $15 to find the sub total value
							break;                                                                  	//break out of the size switch statement
						case 2:                                                                     //if it is "Regular" then..
							weightValue += 4 * orderListQuantity[i].value;								//multiply the selections quantity by 4 lbs to find the total weight
							subValue += 30 * orderListQuantity[i].value;                            	//multiply the selections quantity by $30 to find the sub total value
							break;                                                                  	//break out of the size switch statement
						case 3:                                                                     //if it is "Large" then..
							weightValue += 6 * orderListQuantity[i].value;								//multiply the selections quantity by 6 lbs to find the total weight
							subValue += 15 * orderListQuantity[i].value;                            	//multiply the selections quantity by $15 to find the sub total value
					}                                                                               
					break;
				case 3:																		//if it is "cake" then..
					switch(orderListSize[i].selectedIndex)                                  	//A specific size select elements current selection...
					{                                                                       
						case 1:                                                             		//if it is "Mini" then..
							weightValue += 5 * orderListQuantity[i].value;								//multiply the selections quantity by 5 lbs to find the total weight
							subValue += 21 * orderListQuantity[i].value;                            	//multiply the selections quantity by $21 to find the sub total value
							break;                                                                  	//break out of the size switch statement
						case 2:                                                                     //if it is "Regular" then..
							weightValue += 10 * orderListQuantity[i].value;								//multiply the selections quantity by 10 lbs to find the total weight
							subValue += 35 * orderListQuantity[i].value;                            	//multiply the selections quantity by $35 to find the sub total value
							break;                                                                  	//break out of the size switch statement
						case 3:                                                                     //if it is "Large" then..
							weightValue += 25 * orderListQuantity[i].value;								//multiply the selections quantity by 25 lbs to find the total weight
							subValue += 45 * orderListQuantity[i].value;                            	//multiply the selections quantity by $45 to find the sub total value
							break;																		//break out of the size switch statement
						case 4:																		//if it is "Large" then..
							weightValue += 35 * orderListQuantity[i].value;								//multiply the selections quantity by 35 lbs to find the total weight
							subValue += 250 * orderListQuantity[i].value;                           	//multiply the selections quantity by $250 to find the sub total value
					}
			}
		} 
	
		if (subValue > 250)															//if the subvalue is over $250 then..
			discountValue = subValue * .1;												//set a discount of 10% off the subvalue
		else																		//else
			discountValue = 0.00;														//set a discount of 0% off the subvalue
		
		switch(stateSelect.selectedIndex)											//A selected state option
		{
			case 1:				 														//if it is "Florida" then..
				taxValue = (subValue - discountValue) * .07;								//multiply the sub total minus the discount by the tax rate .07 to get the tax value
				
				if (weightValue == 0)															//if the weight is 0 then..
					shippingValue = 0;															//set the shipping value to 0
				else if (weightValue <= 5)													//if the weight is less or equal to 5 lbs then..
					shippingValue = 10;															//set the shipping value to $10
				else if (5 < weightValue && weightValue <= 10)								//if the weight is greater than 5 lbs and less or equal to 10 lbs then..
					shippingValue = 15;															//set the shipping value to $15
				else if (10 < weightValue && weightValue <= 20)									//if the weight is greater than 10 lbs and less or equal to 20 lbs then..
					shippingValue = 20;															//set the shipping value to $20
				else if (20 < weightValue && weightValue <= 30)									//if the weight is greater than 20 lbs and less or equal to 30 lbs then..
					shippingValue = 25;															//set the shipping value to $25
				else																	//else..
					shippingValue = 35;															//set the shipping value to $35    
					
				break;																		//break out of the state switch statement
			case 2:																		//if it is "Georgia" then..
				taxValue = (subValue - discountValue) * .065;                             	//multiply the sub total minus the discount by the tax rate .065 to get the tax value
				
				if (weightValue == 0)															//if the weight is 0 then..
					shippingValue = 0;															//set the shipping value to 0
				else if (weightValue <= 5)													//if the weight is less or equal to 5 lbs then..
					shippingValue = 15;															//set the shipping value to $15
				else if (5 < weightValue && weightValue <= 10)								//if the weight is greater than 5 lbs and less or equal to 10 lbs then..
					shippingValue = 20;															//set the shipping value to $20
				else if (10 < weightValue && weightValue <= 20)								//if the weight is greater than 10 lbs and less or equal to 20 lbs then..
					shippingValue = 25;															//set the shipping value to $25
				else if (20 < weightValue && weightValue <= 30)								//if the weight is greater than 20 lbs and less or equal to 30 lbs then..
					shippingValue = 30;															//set the shipping value to $30
				else																	//else..
					shippingValue = 33;															//set the shipping value to $33    
				
				break;                                                                  	//break out of the state switch statement
			case 3:																		//if it is "Alabama" then.. 
				taxValue = (subValue - discountValue) * .06;                                //multiply the sub total minus the discount by the tax rate .06 to get the tax value
				
				if (weightValue == 0)															//if the weight is 0 then..
					shippingValue = 0;															//set the shipping value to 0
				else if (weightValue <= 5)													//if the weight is less or equal to 5 lbs then..
					shippingValue = 12;															//set the shipping value to $12
				else if (5 < weightValue && weightValue <= 10)								//if the weight is greater than 5 lbs and less or equal to 10 lbs then..
					shippingValue = 17;															//set the shipping value to $17
				else if (10 < weightValue && weightValue <= 20)								//if the weight is greater than 10 lbs and less or equal to 20 lbs then..
					shippingValue = 22;															//set the shipping value to $22
				else if (20 < weightValue && weightValue <= 30)								//if the weight is greater than 20 lbs and less or equal to 30 lbs then..
					shippingValue = 25;															//set the shipping value to $25
				else																	//else..
					shippingValue = 34;															//set the shipping value to $34    
		}
	}
	
	grandValue = (subValue - discountValue) + taxValue + shippingValue;			//set the grand total value by adding the sub value minus the discount plus tax and plus shipping
	
	weight.innerText = weightValue.toFixed(2);									//format the weight value with two decimal points
	
	subTotal.innerText = subValue.toFixed(2);									//format and display the sub total value with two decimal points
	discount.innerText = discountValue.toFixed(2);								//format and display the discount value with two decimal points
	tax.innerText = taxValue.toFixed(2);										//format and display the tax value with two decimal points
	shipping.innerText = shippingValue.toFixed(2);								//format and display the shipping value with two decimal points
	grandTotal.innerText = grandValue.toFixed(2);								//format and display the grand total value with two decimal points
}

//called within the validate data function when successful
//this function prepares the data for transmission
function GenerateOutputData()
{
	var nameOutput = orderName.value;											//grabs the value of the order name
	var stateOutput = stateSelect.options[stateSelect.selectedIndex].text;		//grabs the text from the selected state option
	
	var typeArrayOutput = [];													//creates an array for the type selection elements
	var sizeArrayOutput = [];													//creates an array for the size selection elements
	var flavorArrayOutput = [];													//creates an array for to the flavor selection elements
	var quantityArrayOutput = [];												//creates an array for the quantity input elements
	
	var orderListType = document.getElementsByClassName("item_type");			//creates an array of references to the type selection elements
	var orderListSize = document.getElementsByClassName("item_size");			//creates an array of references to the size selection elements
	var orderListFlavor = document.getElementsByClassName("item_flavor");		//creates an array of references to the flavor selection elements
	var orderListQuantity = document.getElementsByClassName("item_quantity");	//creates an array of references to the quantity input elements

	for(var i = 0;orderListType.length > i; i++)								//loop for every type select element that exists
	{
		typeArrayOutput.push(orderListType[i].value);								//adds an element to the type array and increases the size of the array
		sizeArrayOutput.push(orderListSize[i].value);								//adds an element to the size array and local storage spaceincreases the size of the array
		flavorArrayOutput.push(orderListFlavor[i].value);							//adds an element to the flavor array and increases the size of the array
		quantityArrayOutput.push(orderListQuantity[i].value);						//adds an element to the quantity array and increases the size of the array
	}
	
	var weightOutput = weight.innerText;											//grabs the shipping weight value
	var subTotalOutput = subTotal.innerText;										//grabs the subtotal value
	var discountOutput = discount.innerText;										//grabs the discount value
	var taxTotalOutput = tax.innerText;												//grabs the tax total value
	var shippingOutput = shipping.innerText;										//grabs the shipping cost value
	var grandTotalOutput = grandTotal.innerText;									//grabs the grand total value
	
	localStorage.setItem('name', nameOutput);                                     	//creates a local storage space for the name input
	localStorage.setItem('state', stateOutput);                                     //creates a local storage space for the state input
	
	localStorage.setItem('typeArray', JSON.stringify(typeArrayOutput));             //creates a local storage space for the type array
	localStorage.setItem('sizeArray', JSON.stringify(sizeArrayOutput));             //creates a local storage space for the size array
	localStorage.setItem('flavorArray', JSON.stringify(flavorArrayOutput));         //creates a local storage space for the flavor array
	localStorage.setItem('quantityArray', JSON.stringify(quantityArrayOutput));     //creates a local storage space for the quantity array
	
	localStorage.setItem('weight', weightOutput);                                   //creates a local storage space for the weight output
	localStorage.setItem('subTotal', subTotalOutput);                               //creates a local storage space for the sub total output
	localStorage.setItem('discount', discountOutput);                               //creates a local storage space for the discount output
	localStorage.setItem('tax', taxTotalOutput);                                    //creates a local storage space for the tax output
	localStorage.setItem('shipping', shippingOutput);                               //creates a local storage space for the shipping output
	localStorage.setItem('grandTotal', grandTotalOutput);                           //creates a local storage space for the grand total output
}


//called by the reciept.html page
//this function retrieves all of the order table data and displays it to the reciept page
function OutputTableData()
{
	var typeArrayOutput = JSON.parse(localStorage.getItem("typeArray"));			//creates an array and retreves the data from the type array local storage space
	var sizeArrayOutput = JSON.parse(localStorage.getItem("sizeArray"));			//creates an array and retreves the data from the size array local storage space
	var flavorArrayOutput = JSON.parse(localStorage.getItem("flavorArray"));		//creates an array and retreves the data from the flavor array local storage space	
	var quantityArrayOutput = JSON.parse(localStorage.getItem("quantityArray"));	//creates an array and retreves the data from the quantity array local storage space
	
	var outputOrderTable = document.getElementById("outputOrderTable");				//reference to the output order table

	for (var i = 0; i < typeArrayOutput.length; i++)								//loops for every element in the type array
	{
		var row = outputOrderTable.insertRow(-1);										//creates and inserts a new row at the end of the table
		var cell0 = row.insertCell(0);													//creates and inserts a new cell on the new row for the type list
		var cell1 = row.insertCell(1);													//creates and inserts a new cell on the new row for the size list
		var cell2 = row.insertCell(2);													//creates and inserts a new cell on the new row	for the flavor list
		var cell3 = row.insertCell(3);													//creates and inserts a new cell on the new row for the quantity amount
		
		cell0.innerHTML = typeArrayOutput[i];											//inserts html for a select element for bakery type within the first cell
		cell1.innerHTML = sizeArrayOutput[i];											//inserts html for a select element for item size within the second cell
		cell2.innerHTML = flavorArrayOutput[i];											//inserts html for a select element for item flavor within the thirds cell
		cell3.innerHTML = quantityArrayOutput[i];										//inserts html for a number input element for item quantity within the fourth cell
	}
}

//called by the reciept.html page
//this function retrieves the name given and converts it into proper case
function ProperCase(name)
{
	name = name.toLowerCase();														//lower cases the whole string
	nArray = name.split(' ');														//separates first and last names
	nArray[0] = nArray[0].charAt(0).toUpperCase() + nArray[0].slice(1);				//upper cases the first character of the first name and adds on the rest
	nArray[1] = nArray[1].charAt(0).toUpperCase() + nArray[1].slice(1);				//upper cases the first character of the last name and adds on the rest
	name = nArray.join(' ');														//joins the two names together and returns it to be displayed
	return name;
}