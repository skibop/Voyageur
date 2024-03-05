document.addEventListener("DOMContentLoaded", function () {
    const MAX_ROWS = 8;

    // Function to add a new row
    function addNewRow() {
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
            // Save data to cookies after adding a new row
            saveDataToCookies();
        }
    }

    // Function to add the default row
    function addDefaultRow() {
        const tableBody = document.querySelector("table tbody");
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

    // Add Row button functionality
    const addRowBtn = document.getElementById("addRowBtn");
    addRowBtn.addEventListener("click", addNewRow);

    // Remove Row button functionality
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("removeRowBtn")) {
            const tableBody = document.querySelector("table tbody");
            const numRows = tableBody.children.length;
            if (numRows > 1) { // Ensure there's always at least one row
                const row = event.target.closest("tr");
                row.parentNode.removeChild(row);
                // Save data to cookies after removing a row
                saveDataToCookies();
            }
        }
    });

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
            if (!validateClassName(classNames[i].value)) {
                alert("Please make sure to use only alphanumeric characters, spaces, and periods.");
                return;
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
            if (credit < 0 || credit > 10 || credit === 0) {
                if (credit < 0) {
                    alert("Credits cannot be negative.");
                } else if (credit > 10) {
                    alert("Credits cannot be above 10.");
                } else {
                    alert("Credits cannot be equal to 0.");
                }
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

        const weightedGPA = (weightedTotal / totalCredits).toFixed(4).replace(/\.?0+$/, '');
        const unweightedGPA = (unweightedTotal / totalCredits).toFixed(4).replace(/\.?0+$/, '');

        const weightedGPASpan = document.querySelector(".weighted-gpa .result-value");
        const unweightedGPASpan = document.querySelector(".unweighted-gpa .result-value");

        weightedGPASpan.textContent = weightedGPA;
        unweightedGPASpan.textContent = unweightedGPA;

        saveDataToCookies();
    });

    function validateClassName(className) {
        // Class name should not be empty and should only contain alphanumeric characters, spaces, and periods
        return className.trim() !== "" && /^[a-zA-Z0-9\s.]+$/.test(className);
    }

    // Function to save data to cookies
    function saveDataToCookies() {
        const rows = document.querySelectorAll("table tbody tr");
        const data = [];

        rows.forEach(row => {
            const inputs = row.querySelectorAll("input, select");
            const rowData = {};
            inputs.forEach(input => {
                rowData[input.name] = input.value;
            });
            data.push(rowData);
        });

        // Set the data to cookies
        document.cookie = `gpaCalculatorData=${JSON.stringify(data)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }

    // Function to populate data from cookies
    function populateDataFromCookies() {
        const cookieData = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('gpaCalculatorData='));

        if (cookieData) {
            const data = JSON.parse(cookieData.split('=')[1]);

            // Populate input fields with data from cookies
            data.forEach((rowData, index) => {
                if (index === 0) {
                    // If it's the first row, populate it directly
                    const row = document.querySelectorAll("table tbody tr")[index];
                    Object.entries(rowData).forEach(([name, value]) => {
                        const input = row.querySelector(`[name="${name}"]`);
                        if (input) {
                            input.value = value;
                        }
                    });
                } else {
                    // If it's not the first row, add a new row and populate it
                    addDefaultRow();
                    const lastRowIndex = document.querySelectorAll("table tbody tr").length - 1;
                    const row = document.querySelectorAll("table tbody tr")[lastRowIndex];
                    Object.entries(rowData).forEach(([name, value]) => {
                        const input = row.querySelector(`[name="${name}"]`);
                        if (input) {
                            input.value = value;
                        }
                    });
                }
            });
        } else {
            // If there are no cookie data, add the default row
            addDefaultRow();
        }
    }

    // Call populateDataFromCookies function when the DOM is loaded
    populateDataFromCookies();

    // Update stored data in cookies whenever inputs change
    document.querySelectorAll("input[name='class_name[]'], select[name='grade[]'], input[name='credits[]'], select[name='class_type[]']").forEach(input => {
        input.addEventListener("change", function () {
            saveDataToCookies();
        });
    });
});