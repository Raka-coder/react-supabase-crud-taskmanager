# Task Manager CRUD Application

This project is a simple task manager application built using Vite, React, Tailwind CSS, and Supabase. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

## Features

- Add new tasks with a title and description.
- View a list of all tasks.
- Update task details.
- Delete tasks.
- Filter tasks by their completion status.

## Tech Stack

<div align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="48" height="36"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="48" height="36"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="48" height="36"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" width="48" height="36"/>         
</div><br>

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

   - Add `RLS` (Row Level Security) policy.
   - Disable `RLS` (Row Level Security) for the table.

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