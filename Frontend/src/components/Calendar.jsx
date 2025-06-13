import React from 'react';
import { useNavigate } from "react-router-dom";

export const Calendar = ({date}) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const taskDays = {
        1: 5,
        2: 10,
        12: 15,
        30: 20,
    }
    const navigate = useNavigate();
    const year = date.getFullYear();
    const mounth = date.getMonth();
    const monthDays = Array.from({ length: new Date(year, mounth + 1, 0).getDate() }, (_, i) => i + 1);
    const firstDayOffset = new Date(year, mounth).getDay();
    const dayCurrent = new Date();
    const isDateCurrent = dayCurrent.getFullYear() === year && dayCurrent.getMonth() === mounth;
    return (
        <div className="bg-gray-900 rounded-lg shadow-xl w-full h-max px-15 pb-10">
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => (
                    <div key={day} className="text-center py-2 text-gray-400 font-semibold text-sm">
                        {day}
                    </div>
                ))}
                {Array.from({ length: firstDayOffset }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-20 bg-gray-800 rounded-md"/>
                ))}
                {monthDays.map((day) => {
                    const isToday = isDateCurrent && day === dayCurrent.getDate();
                    const isTaskDay = day in taskDays;
                    return (
                        <div key={day} className={`h-20 rounded-md p-2 transition-colors cursor-pointer ${isToday
                            ? 'bg-blue-600 hover:bg-blue-500 text-white font-bold'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}>
                            <span>{day}</span>
                            {isTaskDay && (
                                <div className="text-center text-white-400 font-semibold text-sm" onClick={()=>navigate('/List/:task/:'+year+'-'+mounth+'-'+day)}>
                                    {"Task(s) ➡️ "} {taskDays[day]}📚
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};