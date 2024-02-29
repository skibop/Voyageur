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
            const row = event.target.closest("tr");
            row.parentNode.removeChild(row);
        }
    });

    // Calculate GPA button functionality
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", function () {
        const grades = document.querySelectorAll("select[name='grade[]']");
        const credits = document.querySelectorAll("input[name='credits[]']");
        const classTypes = document.querySelectorAll("select[name='class_type[]']");
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