import React, { useEffect, useState, createContext, ReactNode, useContext } from 'react';
import { TaskType } from '@/types';
import { tasksData } from '@/tasksData';

interface TasksContextType {
    tasks: TaskType[] | null;
    setTasks: (tasks: TaskType[] | null) => void;
}

// Create the context outside the component
const TasksContext = createContext<TasksContextType | undefined>(undefined);

const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {






// tasks data are the tasks that already exist in tasksData.ts
    const [tasks, setTasks] = useState<TaskType[] | null>(null);

    // Load tasks from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                console.log("storedjoon",storedTasks)
                setTasks(JSON.parse(storedTasks));
            }
            else{
                //if we don't set localstorage yet
                setTasks(tasksData)
            }
        }
    }, []);

    // Save tasks to localStorage on change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (tasks !== null) {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } 
        }
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;

// Custom hook to use the TasksContext
export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
};
