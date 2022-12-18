
     var changelogButton = document.getElementById('changelogButton');
     var changelog = document.getElementById('changelog');
     var overlay = document.getElementById('overlay');
     var closeButton = document.querySelector('#changelog .close');
     
     changelogButton.addEventListener('click', function() {
       changelog.classList.toggle('visible');
       overlay.classList.toggle('visible');
       changelogButton.classList.toggle('hidden');
     });
     
     closeButton.addEventListener('click', function() {
       changelog.classList.remove('visible');
       overlay.classList.remove('visible');
       changelogButton.classList.remove('hidden');
     });  

    function checkAnswer() {
        // Get the user's answer
        var answer = document.getElementById("answer").value;
    
        // Get the current problem element
        var problem = document.getElementById("problem");
    
        // Split the problem string into an array of strings
        var problemArray = problem.textContent.split(" ");
    
        // Initialize the result to the first number in the array
        var result = parseFloat(problemArray[0]);
    
        // Loop through the array and perform the necessary calculations
        for (var i = 1; i < problemArray.length; i += 2) {
        if (problemArray[i] == "+") {
            result += parseFloat(problemArray[i+1]);
        } else if (problemArray[i] == "-") {
            result -= parseFloat(problemArray[i+1]);
        } else if (problemArray[i] == "x") {
            result *= parseFloat(problemArray[i+1]);
        } else if (problemArray[i] == "÷") {
            result /= parseFloat(problemArray[i+1]);
        }
        }
    
        // Round the result to 2 decimal places
    var limitedResult = result.toFixed(2);
    
    // Check if the answer is correct
    if (parseFloat(limitedResult) == parseFloat(answer)) {
        // If the answer is correct, generate a new problem and play the success sound
        generateProblem();
        document.getElementById('successSound').play();
    
        // Increment the streak counter
        var streakCounter = document.getElementById("coinCounter");
        streakCounter.textContent = "Streak: " + (parseInt(streakCounter.textContent.split(" ")[1]) + 1);
    } else {
        // If the answer is incorrect, display a feedback message, shake the problem element, and play the fail sound
        document.getElementById("feedback").textContent = "Incorrect, please try again.";
        problem.classList.add("incorrect");
        // Add a delay before removing the incorrect class
        setTimeout(function() {
        problem.classList.remove("incorrect");
        }, 500);
        document.getElementById('failSound').play();
    
        // Reset the streak counter
        document.getElementById("coinCounter").textContent = "Streak: 0";
    }
    
    }
  
        
    function generateProblem() {
        // Generate a random number between 1 and 3
        var numOperations = Math.floor(Math.random() * 2) + 2;
        
        // Generate an array of random numbers between 1 and 10
        var nums = [];
        for (var i = 0; i < numOperations; i++) {
        nums.push(Math.floor(Math.random() * 100) + 1);
        }
        
        // Generate an array of random operations (0 = addition, 1 = subtraction, 2 = multiplication, 3 = division)
        var operations = [];
        for (var i = 0; i < numOperations - 1; i++) {
        operations.push(Math.floor(Math.random() * 4));
        }
        
        // Generate a random number between 0 and numOperations - 1
        var mixIndex = Math.floor(Math.random() * numOperations);
        
        // Set the text of the problem element based on the numbers and operations
        var problemText = nums[0];
        for (var i = 0; i < numOperations - 1; i++) {
        // If the current index is the mixed index, generate a mixed operation
        if (i == mixIndex) {
            // Generate another random number between 1 and 10
            var num3 = Math.floor(Math.random() * 100) + 1;
            
            // Generate another random operation (0 = addition, 1 = subtraction, 2 = multiplication, 3 = division)
            var operation2 = Math.floor(Math.random() * 4);
            
            // Generate a random number between 0 and 1
            var mix = Math.floor(Math.random() * 2);
            
            problemText += " " + (mix == 0 ? "+" : "-") + " " + num3;
        }
        problemText += " " + ["+", "-", "x", "÷"][operations[i]] + " " + nums[i+1];
        }
        problemText += " = ?";
        document.getElementById("problem").textContent = problemText;
    }
            
            // Generate the first problem when the page loads
            generateProblem();