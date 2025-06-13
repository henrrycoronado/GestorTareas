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
    }
}