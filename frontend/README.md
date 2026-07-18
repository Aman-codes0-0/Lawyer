# Lawyer Application - Frontend (Next.js)

This project is the frontend of the Lawyer application, built with the Next.js framework. It also uses Prisma as the ORM for the database. Below are the step-by-step instructions to run this project on your local machine.

## Prerequisites

Before running the project, you must have Node.js installed on your system:
- **Node.js**: [Download here](https://nodejs.org/) (LTS version is recommended).

## Project Setup and Execution Steps

**Step 1: Navigate to the project folder**
Open your Terminal or Command Prompt and go to the `frontend` directory:
```bash
cd frontend
```

**Step 2: Install Dependencies**
Run the following command to install all the required packages for the project:
```bash
npm install
```

**Step 3: Database and Prisma Setup**
Since the project uses Prisma ORM, you need to initialize the local database:
```bash
npx prisma generate
npx prisma db push
```

**Step 4: Start the Development Server**
Once everything is set up, use this command to start the Next.js project:
```bash
npm run dev
```

**Step 5: View the Application in your Browser**
After the server starts successfully, open your web browser and go to this URL:
[http://localhost:3000/](http://localhost:3000/)

> **Note:** The app will keep running as long as the command prompt is open and the server is running. If you make and save any changes in the code, Next.js's Fast Refresh feature will automatically reload the browser.
