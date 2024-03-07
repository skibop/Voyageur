class GPACalculator {
    constructor() {
        this.MAX_ROWS = 8;
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
        document.addEventListener("DOMContentLoaded", () => {
            this.init();
        });
    }

    init() {
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

        this.populateDataFromCookies();
        this.updateStoredDataInCookies();
    }

    addNewRow() {
        const tableBody = document.querySelector("table tbody");
        const numRows = tableBody.children.length;
        if (numRows < this.MAX_ROWS) {
            tableBody.insertAdjacentHTML("beforeend", this.newRow);
            this.saveDataToCookies(); // Save data after adding the new row
        }
    }

    removeRow(event) {
        const tableBody = document.querySelector("table tbody");
        const numRows = tableBody.children.length;
        if (numRows > 1) {
            const row = event.target.closest("tr");
            row.parentNode.removeChild(row);
            this.saveDataToCookies();
        }
    }

    calculateGPA() {
        const grades = document.querySelectorAll("select[name='grade[]']");
        const credits = document.querySelectorAll("input[name='credits[]']");
        const classTypes = document.querySelectorAll("select[name='class_type[]']");
    
        let weightedTotal = 0;
        let unweightedTotal = 0;
        let totalCredits = 0;
    
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
    
            const qualityPoints = weightedGradePoints * credit;
            totalCredits += credit;
            weightedTotal += qualityPoints;
            unweightedTotal += gradePoints * credit;
        }
    
        const weightedGPA = (weightedTotal / totalCredits).toFixed(4).replace(/\.?0+$/, '');
        const unweightedGPA = (unweightedTotal / totalCredits).toFixed(4).replace(/\.?0+$/, '');
    
        const weightedGPASpan = document.querySelector(".weighted-gpa .result-value");
        const unweightedGPASpan = document.querySelector(".unweighted-gpa .result-value");
    
        weightedGPASpan.textContent = weightedGPA;
        unweightedGPASpan.textContent = unweightedGPA;
    
        this.saveDataToCookies();
    }
    
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
    
        document.cookie = `gpaCalculatorData=${JSON.stringify(data)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }
    
    
    populateDataFromCookies() {
        const cookieData = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .find(cookie => cookie.startsWith('gpaCalculatorData='));
    
        if (cookieData) {
            const data = JSON.parse(cookieData.split('=')[1]);
    
            data.forEach((rowData, index) => {
                if (index === 0) {
                    const row = document.querySelectorAll("table tbody tr")[index];
                    Object.entries(rowData).forEach(([name, value]) => {
                        const input = row.querySelector(`[name="${name}"]`);
                        if (input) {
                            input.value = value;
                        }
                    });
                } else {
                    this.addNewRow(); // Add a new row for each set of data
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
            this.addDefaultRow();
        }
    }
    
    
    updateStoredDataInCookies() {
        document.querySelectorAll("input[name='class_name[]'], select[name='grade[]'], input[name='credits[]'], select[name='class_type[]']").forEach(input => {
            input.addEventListener("change", () => {
                this.saveDataToCookies();
            });
        });
    }
    
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
