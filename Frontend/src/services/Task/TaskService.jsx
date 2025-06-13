import { BussisnessRepository } from '../BussisnessRepository';

export const TaskService = {
    Add: async (title,start_date, end_date, user_id, category_id, description=null) => {
        try{
            const columns = ["create_date", "title", "description", "start_date", "end_date", "complete","state", "user_id", "category_id"];
            const values = [new Date(), title, description, start_date, end_date, false, true, user_id, category_id];
            return await BussisnessRepository.InsertData("tasks",columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    Update: async (taskId, title, description, start_date, end_date, complete, category_id) => {
        try{
            const columns = ["title", "description", "start_date", "end_date", "complete", "category_id"];
            const values = [title, description, start_date, end_date, complete, category_id];
            return await BussisnessRepository.UpdateData("tasks","id",taskId,columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    Delete: async (taskId) => {
        try{
            const columns = ["state"];
            const values = [false];
            return await BussisnessRepository.UpdateData("tasks","id",taskId,columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    GetTasks: async (userId) => {
        try{
            return await BussisnessRepository.GetAll("tasks", "user_id", userId);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    GetTodayTasks: async (userId, year, month, day, complete, orderBy ) => {
        try {
            const tasks = await TaskService.GetTasks(userId);
            let result = [];
            if (tasks) {
                result = tasks.filter(task => {
                    const taskDate = new Date(task.end_date);
                    return (
                        taskDate.getFullYear() === year &&
                        taskDate.getMonth() === month &&
                        taskDate.getDate() === day &&
                        task.state &&
                        (task.complete === complete || complete===null)
                    );
                });
                switch (orderBy) {
                    case "end_date":
                        result = await TaskService.OrderByEndDate(result);
                        break;
                    case "create_date":
                        result = await TaskService.OrderByCreateDate(result);
                        break;
                    case "category":
                        result = await TaskService.OrderByCategory(result);
                        break;
                    case "incomplete":
                        result = await TaskService.OrderByIncomplete(result);
                        break;
                    default:
                        break;
                }
            }
            return result;
        } catch (e) {
            console.log("Error en GetTodayTasks:", e);
            return null;
        }
    },
    
    GetThisMonthTasks: async (userId, year, month, complete=false) => {
        try {
            const tasks = await TaskService.GetTasks(userId);
            const map = {};
            if (tasks) {
                tasks.forEach(task => {
                    const taskDate = new Date(task.end_date);
                    if (taskDate.getFullYear() === year && taskDate.getMonth() === month && task.state && task.complete==complete) {
                        const day = taskDate.getDate();
                        if (!map[day]) map[day] = 0;
                        map[day]++;
                    }
                });
            }
            return map;
        } catch (e) {
            console.log("Error en GetThisMonthTasks:", e);
            return null;
        }
    },
    OrderByEndDate: async (list) => {
        return [...list].sort((a, b) => new Date(a.end_date) - new Date(b.end_date));
    },
    
    OrderByCreateDate: async (list) => {
        return [...list].sort((a, b) => new Date(a.create_date) - new Date(b.create_date));
    },
    
    OrderByCategory: async (list) => {
        return [...list].sort((a, b) => {
            if (a.category_id < b.category_id) return -1;
            if (a.category_id > b.category_id) return 1;
            return 0;
        });
    },
    
    OrderByIncomplete: async (list) => {
        return [...list].sort((a, b) => {
            return (a.complete === b.complete) ? 0 : a.complete ? 1 : -1;
        });
    },
    
}