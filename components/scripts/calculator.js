/*
  This script defines a GPACalculator class that calculates both weighted and unweighted GPAs based on user input.
  It provides functionality to add, remove, and update rows dynamically, and stores data in cookies for persistence.
  It also includes an option to export the GPA table as a PDF.
*/

class GPACalculator {
    constructor(userId) {
        // Maximum number of rows allowed in the GPA table
        this.MAX_ROWS = 10;
        this.userId = userId;

        // HTML template for a new row in the GPA table
        this.newRow = `
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
                <td><input type="number" name="credits[]" placeholder="Credits" min="0" max="10" class="input-field"></td>
                <td>
                    <select name="class_type[]" class="select-field">
                        <option value="standard">Standard</option>
                        <option value="honors">Honors</option>
                        <option value="ap">AP/College-Level</option>
                    </select>
                </td>
                <td><button class="removeRowBtn">&times;</button></td>
            </tr>
        `;

        // Initialize the calculator when the DOM content is loaded
        document.addEventListener("DOMContentLoaded", () => {
            this.init();
        });
    }

    // Initialize the GPA calculator
    init() {
        // Event listeners for adding, removing rows, calculating GPA, and exporting PDF
        const addRowBtn = document.getElementById("addRowBtn");
        addRowBtn.addEventListener("click", () => this.addNewRow());

        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("removeRowBtn")) {
                this.removeRow(event);
            }
        });

        const calculateBtn = document.getElementById("calculateBtn");
        calculateBtn.addEventListener("click", () => this.calculateGPA());

        document.getElementById('exportPdfBtn').addEventListener('click', () => this.exportPDF());

        // Populate and update stored data in cookies
        this.populateDataFromCookies();
        this.updateStoredDataInCookies();
    }

    // Add a new row to the GPA table
    addNewRow() {
        const tableBody = document.querySelector("table tbody");
        const numRows = tableBody.children.length;
        if (numRows < this.MAX_ROWS) {
            tableBody.insertAdjacentHTML("beforeend", this.newRow);
            this.saveDataToCookies(); // Save data after adding the new row
        }
    }

    // Remove a row from the GPA table
    removeRow(event) {
        const tableBody = document.querySelector("table tbody");
        const numRows = tableBody.children.length;
        if (numRows > 1) {
            const row = event.target.closest("tr");
            row.parentNode.removeChild(row);
            this.saveDataToCookies();
        }
    }

    // Calculate weighted and unweighted GPAs
    calculateGPA() {
        // Retrieve grades, credits, and class types from the GPA table
        const grades = document.querySelectorAll("select[name='grade[]']");
        const credits = document.querySelectorAll("input[name='credits[]']");
        const classTypes = document.querySelectorAll("select[name='class_type[]']");
        const classNames = document.querySelectorAll("input[name='class_name[]']");

        // Initialize variables for GPA calculation
        let weightedTotal = 0;
        let unweightedTotal = 0;
        let totalCredits = 0;

        // Iterate through each row in the GPA table
        for (let i = 0; i < grades.length; i++) {
            const grade = grades[i].value;
            const credit = parseFloat(credits[i].value);
            const classType = classTypes[i].value;
            const className = classNames[i].value.trim();

            // Validate Class Name
            if (className === "") {
                alert("Please enter a Class Name for all rows.");
                return;
            }

            // Validate Credits
            if (isNaN(credit) || credit <= 0 || credit > 10) {
                alert("Credits must be a number between 0 and 10.");
                return;
            }

            // Assign grade points based on the grade
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
                default: gradePoints = 0;
            }

            // Calculate weighted grade points
            let weightedGradePoints;
            if (grade === "D" || grade === "F") {
                weightedGradePoints = gradePoints;
            } else {
                weightedGradePoints = gradePoints;
                if (classType === "honors") {
                    weightedGradePoints += 0.5;
                } else if (classType === "ap") {
                    weightedGradePoints += 1.0;
                }
            }

            // Calculate quality points and update totals
            const qualityPoints = weightedGradePoints * credit;
            totalCredits += credit;
            weightedTotal += qualityPoints;
            unweightedTotal += gradePoints * credit;
        }

        // Calculate GPAs and update UI
        const weightedGPA = (weightedTotal / totalCredits).toFixed(2);
        const unweightedGPA = (unweightedTotal / totalCredits).toFixed(2);

        const weightedGPASpan = document.querySelector(".weighted-gpa .result-value");
        const unweightedGPASpan = document.querySelector(".unweighted-gpa .result-value");

        weightedGPASpan.textContent = isNaN(weightedGPA) ? "--" : weightedGPA;
        unweightedGPASpan.textContent = isNaN(unweightedGPA) ? "--" : unweightedGPA;

        this.saveDataToCookies();
    }

    // Save GPA table data to cookies
    saveDataToCookies() {
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

        // Append user ID to the cookie name
        document.cookie = `gpaCalculatorData_${this.userId}=${JSON.stringify(data)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }

    // Function to populate GPA table data from cookies
    populateDataFromCookies() {
        // Extracting cookie data related to GPA calculator
        const cookieData = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith(`gpaCalculatorData_${this.userId}=`));

        // If there's relevant cookie data
        if (cookieData) {
            // Parse the cookie data
            const data = JSON.parse(cookieData.split('=')[1]);

            // Loop through each set of data
            data.forEach((rowData, index) => {
                // If it's the first row, populate existing table row
                if (index === 0) {
                    const row = document.querySelectorAll("table tbody tr")[index];
                    // Loop through each entry in the row data
                    Object.entries(rowData).forEach(([name, value]) => {
                        const input = row.querySelector(`[name="${name}"]`);
                        // If input found, set its value
                        if (input) {
                            input.value = value;
                        }
                    });
                } else {
                    this.addNewRow(); // Add a new row for each set of data after the first one
                    const lastRowIndex = document.querySelectorAll("table tbody tr").length - 1;
                    const row = document.querySelectorAll("table tbody tr")[lastRowIndex];
                    // Loop through each entry in the row data
                    Object.entries(rowData).forEach(([name, value]) => {
                        const input = row.querySelector(`[name="${name}"]`);
                        // If input found, set its value
                        if (input) {
                            input.value = value;
                        }
                    });
                }
            });
        } else {
            // If no relevant cookie data found, add a default row
            this.addDefaultRow();
        }
    }
    
    // Update stored data in cookies when inputs change
    updateStoredDataInCookies() {
        document.querySelectorAll("input[name='class_name[]'], select[name='grade[]'], input[name='credits[]'], select[name='class_type[]']").forEach(input => {
            input.addEventListener("change", () => {
                this.saveDataToCookies();
            });
        });
    }
    
    // Export GPA table as a PDF
    exportPDF() {
        domtoimage.toPng(document.body)
            .then(dataUrl => {
                var img = new Image();
                img.src = dataUrl;
                img.onload = function () {
                    var doc = new jsPDF('l', 'mm', [img.width, img.height]);
                    doc.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
                    doc.save('VoyageurGPA.pdf');
                };
            })
            .catch(error => {
                console.error('Error capturing screenshot:', error);
            });
    }    
}

// Instantiate GPACalculator
const gpaCalculator = new GPACalculator();