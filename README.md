---

# Voyageur GPA Calculator

## Introduction
The Voyageur GPA Calculator is a user-friendly tool designed to help students at South Brunswick High School accurately calculate their Grade Point Average (GPA). This application supports both weighted and unweighted GPA calculations, empowering students to plan their academic futures with confidence.

## Features

- **User Authentication**: Secure login system to protect user data.
- **Profile Page**: Personalized user details, including yearbook picture, current date, and time.
- **Navigation Bar**: Intuitive navigation with highlighted buttons for easy access.
- **GPA Calculation**: Accurate calculation of both weighted and unweighted GPAs using the school's grading scale.
- **Dynamic Data Storage**: Persistent data storage using cookies to save user input.
- **Q&A Chatbot**: Interactive chatbot to assist users with GPA-related queries.
- **PDF Export**: Export GPA reports to PDF for easy sharing with counselors and teachers.

## Table of Contents

1. [Login](#login)
2. [Profile](#profile)
3. [Navigation](#navigation)
4. [Instructions](#instructions)
5. [GPA Scale](#gpa-scale)
6. [GPA Calculator](#gpa-calculator)
7. [Dynamic Storage](#dynamic-storage)
8. [Q&A Chatbot](#qa-chatbot)
9. [Technical Details](#technical-details)
10. [Documentation](#documentation)

## Login

The login page ensures secure access to the calculator. Users must enter a valid email address and password. If an ID number is used instead of an email, the system prompts for correction. Incorrect passwords trigger an "invalid credentials" message.

## Profile

The profile page displays essential user details, including the yearbook picture and current date and time. This personalization enhances the user experience.

## Navigation

The intuitive navigation bar enhances accessibility. Highlighted buttons on hover guide users effortlessly through the application, ensuring a smooth and efficient experience.

## Instructions

Clear instructions guide users on how to use the GPA calculator effectively, covering both weighted and unweighted GPA calculations. This ensures maximum ease of use.

## GPA Scale

The GPA scale includes the standard scale, honors scale, and AP weighted scale, each with their respective quality points assigned to letter grades.

## GPA Calculator

The GPA calculator interface features four columns for entering class details: class name, grade, credits, and class type. Upon clicking "Calculate GPA," the system provides immediate feedback with both unweighted and weighted GPAs. It includes input validation for credits and class names to ensure data accuracy. Users can add up to 10 classes and export their GPA report to PDF.

## Dynamic Storage

This feature utilizes cookies for dynamic data storage. The system saves user input whenever a course is added, removed, or updated. This ensures consistent data backup and retrieval, even if the app is restarted.

## Q&A Chatbot

The Q&A page includes a chatbot to answer user queries related to GPA calculations. The chatbot uses regex for pattern matching and syntactic validation to maintain data accuracy.

## Technical Details

The application employs HTML, CSS, and JavaScript for front-end development, ensuring a user-friendly interface. For the backend, Express.js handles page routing, Mongoose manages database structure, and Dotenv secures environment variables. PDF export capabilities are provided by jsPDF.

## Documentation

### Express.js
A lightweight backend framework used for handling GET and POST requests, ensuring seamless user navigation.

### Mongoose
A database library utilized for managing user login information, enhancing security and maintaining interface quality.

### Identifiers
Consistent and meaningful identifiers are used throughout the code to ensure organization and modularization. JavaScript classes, CSS flexbox properties, and imported external libraries contribute to a well-structured codebase.

### Commentary
Code comments provide crucial insights into the logic and functionality, significantly enhancing code legibility and maintainability.

### Database Structure
The database structure outlines how login information is stored and retrieved. Error handling mechanisms ensure program stability.

### Dynamic Storage
Cookies are used for dynamic storage, iterating through an array based on the number of rows and pushing data to the cookie for constant updates.

## Conclusion

The Voyageur GPA Calculator is a comprehensive tool designed to address the academic needs of South Brunswick High School students. By providing accurate GPA calculations and strategic planning capabilities, it empowers students to take control of their academic futures.

---
