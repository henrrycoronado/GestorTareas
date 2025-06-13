import React, { useEffect, useState } from 'react';
import { Calendar } from '../components/Calendar';
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/User/UserService";

export const DashboardPage = () => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await UserService.GetPerson();
      if(currentUser == null){
        window.alert("No se detecta un perfil.");
      }
      setUser(currentUser);
    };
    fetchUser();
  }, [navigate]);

  const nextDay = () => {
    const next = new Date(date.getFullYear(), date.getMonth()+1, 1);
    setDate(next);
  };

  const prevDay = () => {
    const prev = new Date(date.getFullYear(), date.getMonth()-1, 1);
    setDate(prev);
  };

  const changeDate = (e) => {
    let newDate = new Date();
    if(e.target.value != ''){
      const [year, month] = e.target.value.split('-');
      newDate = new Date(Number(year), Number(month) - 1, 1);
    }
    setDate(newDate);
  };

  const formatDateInput = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  };

  return (
    <div className="dark:bg-gray-800 flex flex-col items-center w-full h-max justify-center p-10 space-y-6">
      <div className='flex flex-row items-center justify-between h-max w-full px-50'>
        <h1 className="text-3xl font-bold text-white">👋 ¡Hi, {user.name}!</h1>
        <div className='text-white flex flex-row items-center justify-center h-max w-max space-x-10'>
          <button onClick={()=>navigate('/taskmanager/:0')} >Create Task</button>
          <button onClick={()=>navigate('/categorymanager/:0')}>Create Category</button>
        </div>
      </div>

      <div className="text-gray-300 text-lg">
        Today is: <span className="font-semibold">{new Date().toDateString()}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={prevDay}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          ◀ Previous mounth
        </button>

        <input
          type="month"
          value={formatDateInput(date)}
          onChange={(e) => changeDate(e)}
          className="bg-gray-900 text-white px-3 py-2 rounded-md border border-gray-600"
        />

        <button
          onClick={nextDay}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Next mounth ▶
        </button>
      </div>

      <Calendar date={date} />
    </div>
  );
};
