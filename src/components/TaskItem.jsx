// TaskItem.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import ModalAlert from './ui/modal-popup';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [isCompleted, setIsCompleted] = useState(Boolean(task.is_completed));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State untuk menampilkan alert

  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .update({ 
          title: title.trim(), 
          description: description.trim(),
          is_completed: isCompleted 
        })
        .eq('id', task.id)
        .select();
        
      if (supabaseError) throw supabaseError;
      
      if (data && data.length > 0) {
        onUpdate(data[0]);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    setLoading(true);
    
    try {
      const newStatus = !isCompleted;
      setIsCompleted(newStatus);
      
      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .update({ is_completed: newStatus })
        .eq('id', task.id)
        .select();
        
      if (supabaseError) throw supabaseError;
      
      if (data && data.length > 0) {
        onUpdate(data[0]);
      }
    } catch (err) {
      console.error('Error toggling task status:', err);
      setIsCompleted(!isCompleted); // Revert on error
      setError('Failed to update status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    
    try {
      const { error: supabaseError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id);
        
      if (supabaseError) throw supabaseError;
      
      onDelete(task.id);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
      setShowAlert(false); // Tutup alert setelah proses selesai
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-3">
          <label htmlFor={`title-${task.id}`} className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            id={`title-${task.id}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor={`description-${task.id}`} className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id={`description-${task.id}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            disabled={loading}
          />
        </div>
        
        <div className="mb-3 flex items-center">
          <input
            id={`completed-${task.id}`}
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor={`completed-${task.id}`} className="ml-2 block text-gray-700">
            Completed
          </label>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setIsEditing(false);
              // Reset to original values
              setTitle(task.title || '');
              setDescription(task.description || '');
              setIsCompleted(Boolean(task.is_completed));
              setError(null);
            }}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
            disabled={loading}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none disabled:opacity-50"
            disabled={loading}
            type="button"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 ${isCompleted ? 'border-l-4 border-green-500' : ''}`}>
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1 text-gray-600 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`p-1 rounded focus:outline-none ${
              isCompleted ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'
            }`}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              setIsEditing(true);
              setError(null);
            }}
            disabled={loading}
            className="p-1 text-blue-600 hover:text-blue-800 rounded focus:outline-none"
            title="Edit task"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => setShowAlert(true)} // Tampilkan alert sebelum hapus
            disabled={loading}
            className="p-1 text-red-600 hover:text-red-800 rounded focus:outline-none"
            title="Delete task"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
          {/* Tampilkan CustomAlert jika showAlert true */}
      {showAlert && (
        <ModalAlert
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;