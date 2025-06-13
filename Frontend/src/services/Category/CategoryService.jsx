import { BussisnessRepository } from '../BussisnessRepository';
import { CategoryValidate } from './CategoryValidate';

export const CategoryService = {
    Add: async (name, userId) => {
        try{
            if(await CategoryValidate.NameExist(name, userId)){
                return null;
            }
            const columns = ["create_date", "category_name", "state", "user_id"];
            const values = [new Date(), name, true, userId];
            return await BussisnessRepository.InsertData("categories",columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    Update: async (categoryId, name) => {
        try{
            const columns = ["category_name"];
            const values = [name];
            return await BussisnessRepository.UpdateData("categories","id",categoryId,columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    Delete: async (categoryId) => {
        try{
            const columns = ["state"];
            const values = [false];
            return await BussisnessRepository.UpdateData("categories","id",categoryId,columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    GetCategories: async (userId) => {
        try{
            return await BussisnessRepository.GetAll("categories", "user_id", userId);
        }catch(e){
            console.log(e);
            return null;
        }
    }
}