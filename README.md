# Task Manager CRUD Application

This project is a simple task manager application built using Vite, React, Tailwind CSS, and Supabase. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

## Features

- Add new tasks with a title and description.
- View a list of all tasks.
- Update task details.
- Delete tasks.
- Filter tasks by their completion status.

## Tech Stack

- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Supabase**: An open-source Firebase alternative that provides a real-time database and authentication.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Raka-coder/react-supabase-crud-taskmanager.git

   cd react-supabase-crud-taskmanager
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase:

   - Go to [Supabase](https://supabase.io) and create an account.
   - Create a new project and obtain your API keys.
   - Create a `tasks` table using the following SQL:

     ```sql
     create table tasks (
       id uuid default uuid_generate_v4() primary key,
       title text not null,
       description text,
       is_completed boolean default false,
       created_at timestamp default now()
     );
     ```

4. Configure environment variables:
   - Create a `.env` file in the root of your project and add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

### Running the Application

- Start the development server:

  ```bash
  npm run dev
  ```

- Open your browser and navigate to `http://localhost:5173` to see the application in action.

### Building for Production

- Build the application for production:

  ```bash
  npm run build
  ```

- Preview the production build:
  ```bash
  npm run preview
  ```

<img src="https://vitejs.dev/logo.svg" alt="Vite" width="32" height="32" /> 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React" width="32" height="32" />
<img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" alt="Tailwind CSS" width="32" height="32" />
<img src="https://www.vectorlogo.zone/logos/supabase/supabase-ar21~bgwhite.svg" alt="Supabase" width="32" height="32" />