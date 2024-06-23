class GPACalculator {
    constructor() {
        this.MAX_ROWS = 10;
        this.courseData = {
            "Freshman": [],
            "Sophomore": [],
            "Junior": [],
            "Senior": []
        };
        this.gpaValues = {
            "A": 4.0, "A-": 3.67, "B+": 3.33, "B": 3.0, "B-": 2.67,
            "C+": 2.33, "C": 2.0, "C-": 1.67, "D": 1.0, "F": 0.0
        };
        // Adjusted weight factors for course types
        this.courseTypeFactors = {
            "Regular": 0,
            "Honors": 0.5,
            "AP": 1.0
        };
        this.init();
    }

    init() {
        this.addCourseBtn = document.getElementById('add-course-btn');
        this.addCourseBtn.addEventListener('click', () => this.addCourse());

        // Initialize existing courses if any (e.g., for edit scenarios)
        this.initializeExistingCourses();

        // Export PDF button click event
        const exportPdfBtn = document.getElementById('export-pdf-btn');
        exportPdfBtn.addEventListener('click', () => this.exportPDF());
    }

    initializeExistingCourses() {
        // Retrieve and populate courses from the tables
        ['Freshman', 'Sophomore', 'Junior', 'Senior'].forEach(year => {
            const tableBody = document.getElementById(`${year.toLowerCase()}-table`).getElementsByTagName('tbody')[0];
            const rows = tableBody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                const courseName = cells[0].textContent.trim();
                const grade = cells[1].textContent.trim();
                const credits = parseFloat(cells[2].textContent.trim());
                const courseType = cells[3].textContent.trim();
                this.courseData[year].push({ courseName, grade, credits, courseType });
            }
            this.calculateGPA(year);
        });

        // Calculate cumulative GPA
        this.calculateCumulativeGPA();
    }

    addCourse() {
        const courseName = document.getElementById('courseName').value;
        const grade = document.getElementById('grade').value;
        const credits = parseFloat(document.getElementById('credits').value);
        const courseType = document.getElementById('courseType').value;
        const year = document.getElementById('year').value;

        if (courseName && grade && !isNaN(credits) && credits > 0 && courseType && year) {
            const yearTableBody = document.getElementById(`${year.toLowerCase()}-table`).querySelector('tbody');
            if (yearTableBody.rows.length < this.MAX_ROWS) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${courseName}</td>
                    <td>${grade}</td>
                    <td>${credits}</td>
                    <td>${courseType}</td>
                    <td><button class="remove-btn" data-year="${year}" data-course="${courseName}">&times;</button></td>
                `;
                yearTableBody.appendChild(row);
                row.querySelector('.remove-btn').addEventListener('click', (event) => this.removeCourse(event));
                this.courseData[year].push({ courseName, grade, credits, courseType });
                this.calculateGPA(year);
                this.calculateCumulativeGPA();
            } else {
                alert('You have reached the maximum limit of courses for this year.');
            }
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    removeCourse(event) {
        const year = event.target.dataset.year;
        const courseName = event.target.dataset.course;
        const index = this.courseData[year].findIndex(course => course.courseName === courseName);
        if (index !== -1) {
            this.courseData[year].splice(index, 1);
            event.target.closest('tr').remove();
            this.calculateGPA(year);
            this.calculateCumulativeGPA();
        }
    }

    calculateGPA(year) {
        const courses = this.courseData[year];
        let totalWeightedPoints = 0;
        let totalUnweightedPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const { grade, credits, courseType } = course;
            const gradeValue = this.gpaValues[grade];
            const typeFactor = this.courseTypeFactors[courseType];
            totalWeightedPoints += (gradeValue + typeFactor) * credits;
            totalUnweightedPoints += gradeValue * credits;
            totalCredits += credits;
        });

        const weightedGPA = totalCredits ? (totalWeightedPoints / totalCredits).toFixed(2) : '--';
        const unweightedGPA = totalCredits ? (totalUnweightedPoints / totalCredits).toFixed(2) : '--';

        document.getElementById(`${year.toLowerCase()}-gpa-weighted`).textContent = weightedGPA;
        document.getElementById(`${year.toLowerCase()}-gpa-unweighted`).textContent = unweightedGPA;
    }

    calculateCumulativeGPA() {
        let totalWeightedPoints = 0;
        let totalUnweightedPoints = 0;
        let totalCredits = 0;

        Object.values(this.courseData).forEach(yearCourses => {
            yearCourses.forEach(course => {
                const { grade, credits, courseType } = course;
                const gradeValue = this.gpaValues[grade];
                const typeFactor = this.courseTypeFactors[courseType];
                totalWeightedPoints += (gradeValue + typeFactor) * credits;
                totalUnweightedPoints += gradeValue * credits;
                totalCredits += credits;
            });
        });

        const cumulativeWeightedGPA = totalCredits ? (totalWeightedPoints / totalCredits).toFixed(2) : '--';
        const cumulativeUnweightedGPA = totalCredits ? (totalUnweightedPoints / totalCredits).toFixed(2) : '--';

        document.getElementById('cumulative-gpa-weighted').textContent = cumulativeWeightedGPA;
        document.getElementById('cumulative-gpa-unweighted').textContent = cumulativeUnweightedGPA;
    }

    exportPDF() {
        // Select the entire document body to capture
        const content = document.body;
    
        // Options for html2pdf
        const options = {
            filename: 'VoyageurGPA.pdf', // Optional, sets the PDF file name
            image: { type: 'jpeg', quality: 1 }, // Optional, sets the image type and quality
            html2canvas: { scale: 2, logging: true, scrollY: 0, scrollX: 0, windowWidth: document.documentElement.scrollWidth, windowHeight: document.documentElement},
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' } // Optional, sets PDF format and orientation
        };
    
        // Use html2pdf library to generate PDF
        html2pdf().set(options).from(content).save();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GPACalculator();
});

function logout() {
    window.location.href = "/login";
}
  