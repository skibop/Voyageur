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
        this.fetchCourses();

        // Export PDF button click event
        const exportPdfBtn = document.getElementById('export-pdf-btn');
        exportPdfBtn.addEventListener('click', () => this.exportPDF());
    }

    async fetchCourses() {
        try {
            const response = await fetch('/get-user-data');
            if (response.ok) {
                const courses = await response.json();
                courses.forEach(course => {
                    this.courseData[course.year].push(course);
                    this.addCourseToTable(course);
                });
                this.calculateAllGPAs();
            } else {
                alert('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    async addCourse() {
        const courseName = document.getElementById('courseName').value;
        const grade = document.getElementById('grade').value;
        const credits = parseFloat(document.getElementById('credits').value);
        const courseType = document.getElementById('courseType').value;
        const year = document.getElementById('year').value;

        if (courseName && grade && !isNaN(credits) && credits > 0 && courseType && year) {
            const course = { courseName, grade, credits, courseType, year };

            try {
                const response = await fetch('/add-course', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(course)
                });

                if (response.ok) {
                    const addedCourse = await response.json();
                    this.courseData[year].push(addedCourse);
                    this.addCourseToTable(addedCourse);
                    this.calculateGPA(year);
                    this.calculateCumulativeGPA();
                } else {
                    alert('Failed to add course');
                }
            } catch (error) {
                console.error('Error adding course:', error);
            }
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    addCourseToTable(course) {
        const yearTableBody = document.getElementById(`${course.year.toLowerCase()}-table`).querySelector('tbody');
        if (yearTableBody.rows.length < this.MAX_ROWS) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.courseName}</td>
                <td>${course.grade}</td>
                <td>${course.credits}</td>
                <td>${course.courseType}</td>
                <td><button class="remove-btn" data-year="${course.year}" data-id="${course.id}">&times;</button></td>
            `;
            yearTableBody.appendChild(row);
            row.querySelector('.remove-btn').addEventListener('click', (event) => this.removeCourse(event));
        } else {
            alert('You have reached the maximum limit of courses for this year.');
        }
    }

    async removeCourse(event) {
        const year = event.target.dataset.year;
        const courseId = event.target.dataset.id;

        try {
            const response = await fetch(`/remove-course/${courseId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const index = this.courseData[year].findIndex(course => course.id === parseInt(courseId));
                if (index !== -1) {
                    this.courseData[year].splice(index, 1);
                    event.target.closest('tr').remove();
                    this.calculateGPA(year);
                    this.calculateCumulativeGPA();
                }
            } else {
                alert('Failed to remove course');
            }
        } catch (error) {
            console.error('Error removing course:', error);
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
            html2canvas: { scale: 2, logging: true, scrollY: 0, scrollX: 0, windowWidth: document.documentElement.scrollWidth, windowHeight: document.documentElement },
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
