# ClassQuest

ClassQuest is a full-stack web application that I built as part of my MSc Computer Science project. It helps students keep track of their classes and attendance in one place.

Students can import their university timetable using an ICS/WebCal link, view upcoming classes, mark attendance, track their attendance progress, and earn badges for completing attendance goals.

## Live Demo

https://class-quest-two.vercel.app

## Features

- Create a student account
- Login to the application
- Import university timetable using an ICS/WebCal link
- View today's classes
- View weekly timetable
- Mark attendance
- View attendance history
- Track attendance streaks
- Earn achievement badges
- View attendance leaderboard

## Technologies Used

### Backend

- Java
- Spring Boot
- Spring Data JPA
- MySQL

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Deployment

- Frontend - Vercel
- Backend - Render
- Database - Aiven MySQL

## Running the Project

Clone the repository

```bash
git clone https://github.com/charanroz/ClassQuest.git
cd ClassQuest
```

Run the backend

```bash
mvn spring-boot:run
```

Run the frontend

```bash
cd classquest-frontend
npm install
npm run dev
```

## What I Learned

Building ClassQuest helped me improve my understanding of full-stack development. During this project I learned how to:

- Build REST APIs using Spring Boot
- Design databases with JPA and MySQL
- Connect a React frontend with a Spring Boot backend
- Process ICS timetable files
- Deploy a full-stack application using Render and Vercel
- Build a project from planning to deployment

## Future Improvements

Some features I would like to add in the future are:

- JWT authentication
- QR code attendance
- Lecturer/Admin portal
- Email reminders
- Attendance analytics

## Author

**Charan Anandharaj**

GitHub: https://github.com/charanroz

LinkedIn: https://www.linkedin.com/in/charanroz
