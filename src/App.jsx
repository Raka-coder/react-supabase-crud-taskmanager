// App.jsx
import { useState, useCallback } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle task addition
  const handleTaskAdded = useCallback((newTask) => {
    // Increment the refresh trigger to cause TaskList to reload
    setRefreshTrigger((prevTrigger) => prevTrigger + 1);
  }, []);

  // Function to handle application errors
  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
    // Auto-clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  }, []);

  // Function to set loading state
  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-rubik">
        <div className="container mx-auto px-4 py-8">
          {/* Application Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-600 mt-2">
              A simple CRUD application with Vite, React, Tailwind CSS, and
              Supabase
            </p>
          </header>

          {/* Global Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto mb-4 p-3 bg-red-100 text-red-700 rounded-md flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900"
                aria-label="Close error message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="fixed top-0 left-0 bg-blue-500 h-2">
              <div className="animate-pulse bg-blue-300 h-full w-full"></div>
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            <TaskForm
              onTaskAdded={handleTaskAdded}
              onError={handleError}
              onLoadingChange={handleLoadingChange}
            />
            <TaskList
              refreshTrigger={refreshTrigger}
              onError={handleError}
              onLoadingChange={handleLoadingChange}
            />
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-600 text-sm">
            <p>Built with Vite, React, Tailwind CSS, and Supabase</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
