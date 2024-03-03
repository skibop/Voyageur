document.addEventListener("DOMContentLoaded", function () {
    const MAX_ROWS = 8;

    // Add Row button functionality
    const addRowBtn = document.getElementById("addRowBtn");
    addRowBtn.addEventListener("click", function () {
        const tableBody = document.querySelector("table tbody");
        const numRows = tableBody.children.length;
        if (numRows < MAX_ROWS) {
            const newRow = `
                <tr>
                    <td><input type="text" name="class_name[]" placeholder="Class Name" class="input-field"></td>
                    <td>
                        <select name="grade[]" class="select-field">
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                        </select>
                    </td>
                    <td><input type="number" name="credits[]" placeholder="Credits" min="0" class="input-field"></td>
                    <td>
                        <select name="class_type[]" class="select-field">
                            <option value="standard">Standard</option>
                            <option value="honors">Honors</option>
                            <option value="ap">AP/College-Level</option>
                        </select>
                    </td>
                    <td><button class="removeRowBtn">&times;</button></td> <!-- Replace "Remove Row" text with &times; for X -->
                    </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", newRow);
        }
    });


     // Remove Row button functionality
     document.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeRowBtn")) {
            const tableBody = document.querySelector("table tbody");
            const numRows = tableBody.children.length;
            if (numRows > 1) { // Ensure there's always at least one row
                const row = event.target.closest("tr");
                row.parentNode.removeChild(row);
            }
        }
    });

    // Calculate GPA button functionality
  // Calculate GPA button functionality
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", function () {
      const grades = document.querySelectorAll("select[name='grade[]']");
      const credits = document.querySelectorAll("input[name='credits[]']");
      const classTypes = document.querySelectorAll("select[name='class_type[]']");
      const classNames = document.querySelectorAll("input[name='class_name[]']");

      // Check if any field is empty
      for (let i = 0; i < grades.length; i++) {
          if (
              grades[i].value === "" ||
              credits[i].value === "" ||
              classTypes[i].value === "" ||
              classNames[i].value === ""
          ) {
              alert("Please fill in all fields.");
              return; // Exit the function if any field is empty
          }
      }

      let weightedTotal = 0;
      let unweightedTotal = 0;
      let totalCredits = 0;
        // Iterate through Grades
        for (let i = 0; i < grades.length; i++) {
            const grade = grades[i].value;
            const credit = parseFloat(credits[i].value);
            const classType = classTypes[i].value;

            // Validate Credits
            if (credit < 0) {
                alert("Credits cannot be negative.");
                return;
            }
            if (credit > 10) {
                alert("Credits can not be above 10");
                return;
            } if (credit === 0) {
                alert("Credits can not be equal to 0");
                return;
            }

            // Defining the grade values for Standard
            let gradePoints;
            switch (grade) {
                case "A": gradePoints = 4.00; break;
                case "A-": gradePoints = 3.67; break;
                case "B+": gradePoints = 3.33; break;
                case "B": gradePoints = 3.00; break;
                case "B-": gradePoints = 2.67; break;
                case "C+": gradePoints = 2.33; break;
                case "C": gradePoints = 2.00; break;
                case "C-": gradePoints = 1.67; break;
                case "D": gradePoints = 1.00; break;
                case "F": gradePoints = 0; break;
                default: gradePoints = 0; // Default case for unknown grades
            }

            let weightedGradePoints;
            // For D or F grades, don't add extra points for honors or AP classes
            if (grade === "D" || grade === "F") {
                weightedGradePoints = gradePoints;
            } else {
                weightedGradePoints = gradePoints;
                // For weighted GPA, add additional points for honors and AP classes
                if (classType === "honors") {
                    weightedGradePoints += 0.5; // Add 0.5 to the grade points for honors classes
                } else if (classType === "ap") {
                    weightedGradePoints += 1.0; // Add 1.0 to the grade points for AP/college-level classes
                }
            }

            // Calculation of Quality Points
            const qualityPoints = weightedGradePoints * credit;
            totalCredits += credit;
            weightedTotal += qualityPoints;

            // For unweighted GPA, use actual grade points
            unweightedTotal += gradePoints * credit;
        }

        const weightedGPA = (weightedTotal / totalCredits).toFixed(15).replace(/\.?0+$/, '');
        const unweightedGPA = (unweightedTotal / totalCredits).toFixed(15).replace(/\.?0+$/, '');

        const weightedGPASpan = document.querySelector(".weighted-gpa .result-value");
        const unweightedGPASpan = document.querySelector(".unweighted-gpa .result-value");

        weightedGPASpan.textContent = weightedGPA;
        unweightedGPASpan.textContent = unweightedGPA;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check if there is any stored data
    const storedData = localStorage.getItem("gpaCalculatorData");
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Populate calculator fields with stored data
        populateCalculator(parsedData);
    }

    // Function to populate calculator fields
    function populateCalculator(data) {
        // Populate input fields with stored data
        // For example:
        document.querySelector("input[name='class_name[]']").value = data.className;
        document.querySelector("select[name='grade[]']").value = data.grade;
        document.querySelector("input[name='credits[]']").value = data.credits;
        document.querySelector("select[name='class_type[]']").value = data.classType;
        // Populate other fields similarly
    }

    // Update stored data whenever inputs change
    document.querySelectorAll("input[name='class_name[]'], select[name='grade[]'], input[name='credits[]'], select[name='class_type[]']").forEach(input => {
        input.addEventListener("change", function () {
            updateStoredData();
        });
    });

    // Function to update stored data
    function updateStoredData() {
        const data = {
            className: document.querySelector("input[name='class_name[]']").value,
            grade: document.querySelector("select[name='grade[]']").value,
            credits: document.querySelector("input[name='credits[]']").value,
            classType: document.querySelector("select[name='class_type[]']").value
            // Get other values similarly
        };
        localStorage.setItem("gpaCalculatorData", JSON.stringify(data));
    }
});
