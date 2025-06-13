import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TaskService } from '../services/Task/TaskService';

export const Calendar = ({ date, userId }) => {
    const [taskDaysMap, setTaskDaysMap] = useState({});
    const navigate = useNavigate();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const firstDayOffset = new Date(year, month, 1).getDay();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await TaskService.GetThisMonthTasks(userId, year, month);
            if (tasks) {
                setTaskDaysMap(tasks);
            }
        };
    
        if (userId) {
            fetchTasks();
        }
    }, [date, userId]);
    

    return (
        <div className="bg-gray-900 rounded-lg shadow-xl w-full h-max px-15 pb-10">
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                    <div key={day} className="text-center py-2 text-gray-400 font-semibold text-sm">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-20 bg-gray-800 rounded-md" />
                ))}
                {monthDays.map((day) => {
                    const isToday = isCurrentMonth && day === today.getDate();
                    const isTaskDay = day in taskDaysMap;

                    return (
                        <div
                            key={day}
                            onClick={() => {
                                if (isTaskDay) {
                                    const monthStr = String(month + 1).padStart(2, '0');
                                    const dayStr = String(day).padStart(2, '0');
                                    navigate(`/List/task/${year}-${monthStr}-${dayStr}`);
                                }
                            }}
                            className={`h-20 rounded-md p-2 transition-colors cursor-pointer 
                                ${isToday ? 'bg-blue-600 hover:bg-blue-500 text-white font-bold'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
                        >
                            <span>{day}</span>
                            {isTaskDay && (
                                <div className="text-center text-white font-semibold text-sm mt-2">
                                    {taskDaysMap[day]} 📚
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
