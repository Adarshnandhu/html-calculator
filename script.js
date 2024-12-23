// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to append a value to the display based on various conditions
function appendToDisplay(value) {
    var b = document.getElementById('display').value;

    // Allow input if the current display does not contain error messages
    if (b.localeCompare("Math error!") && b.localeCompare("Syntax error!")) {
        // Check if the last character or current value is a number or a square root symbol
        if (Number.isInteger(Number(b[b.length - 1])) || Number.isInteger(Number(value)) || value == "√")
            document.getElementById('display').value += value;
        // Allow a negative sign if the display is empty
        else if (!b.localeCompare("") && value == "-")
            document.getElementById('display').value += value;
        // Replace a '+' with '-' or vice versa
        else if ((b[b.length - 1] == "+" && value == "-") || (b[b.length - 1] == "-" && value == "+"))
            document.getElementById('display').value = b.slice(0, -1) + value;
        // Allow a '-' after '*' or '/'
        else if ((b[b.length - 1] == "*" || b[b.length - 1] == "/") && value == "-")
            document.getElementById('display').value += value;
        // Insert "0." if a dot is entered after a non-integer
        else if (!Number.isInteger(Number(b[b.length - 1])) && value == ".")
            document.getElementById('display').value += "0.";
    }
    // If an error message is displayed, replace it with valid input
    else if (value != "*" && value != "/" && value != "*" && value != "+")
        document.getElementById('display').value = value;
    else
        document.getElementById('display').value = '';
}

// Function to delete the last character in the display
function deleteLast() {
    let currentValue = document.getElementById('display').value;
    document.getElementById('display').value = currentValue.slice(0, -1);
}

// Function to calculate the result of the expression
function calculateResult() {
    var index;
    var b = document.getElementById('display').value;

    // Perform calculations only if the last character is a number
    if (Number.isInteger(Number(b[b.length - 1]))) {
        // Handle square root calculations
        while (b.includes("√")) {
            var index = b.indexOf("√");
            for (var i = index + 1; i < b.length; i++) {
                if (b[i] == '*' || b[i] == '+' || b[i] == '-' || b[i] == '/')
                    break;
            }
            var str2 = b.slice(i, b.length);
            for (var j = index - 1; j >= 0; j--) {
                if (b[j] == '*' || b[j] == '+' || b[j] == '-' || b[j] == '/')
                    break;
            }
            // Compute square root and combine with previous/next parts of the expression
            if (Number.isInteger(Number(b[index + 1]))) {
                if (b.slice(j + 1, index) != "")
                    var str1 = Number(b.slice(j + 1, index)) * Math.sqrt(Number(b.slice(index + 1, i)));
                else
                    var str1 = Math.sqrt(Number(b.slice(index + 1, i)));
                var b = b.slice(0, j + 1);
                b = b.concat(str1, str2);
            } else {
                b = "syntax error!";
            }
        }

        // Evaluate the final expression
        var b = eval(b);

        // Handle division by zero (Infinity)
        if (!b.toString().localeCompare("Infinity"))
            b = "Math error!";
    } else {
        b = "Syntax error!";
    }

    // Display the result or error message
    document.getElementById('display').value = b;
}
