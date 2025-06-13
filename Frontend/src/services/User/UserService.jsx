import { BussisnessRepository } from '../BussisnessRepository';
import { AuthRepository } from '../AuthRepository';

export const UserService = {
    Add: async (name, last_name, email) => {
        try{
            const columns = ["name", "lastname", "email", "state", "create_date"];
            const values = [name, last_name, email, true, new Date()];
            return await BussisnessRepository.InsertData("public", "person",columns,values);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    Update: async () => {
        
    },
    Delete: async () => {
        
    },
    
}

export const AuthService = {
    SignUp: async (correo, password) => {
        try{
            return await AuthRepository.SignUp(correo, password);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    SignIn: async (correo, password) => {
        try{
            return await AuthRepository.SignIn(correo, password);
        }catch(e){
            console.log(e);
            return null;
        }
    },
    isLoggedIn: async () => {
        return await AuthRepository.GetSession();
    },
    GetUser: async () => {
        return await AuthRepository.CurrentUser();
    },
    SignOut: async () => {
        await AuthRepository.SignOut();
        window.alert("Cerraste sesión correctamente");
        window.location.href = "/";
    }

}
