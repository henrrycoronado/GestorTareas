import { supabaseAuthClient } from '../../supabaseClient';

export const AuthRepository = {
  SignIn: async (email, password) => {
    try {
      if (!email || !password) {
        console.warn("Email o contraseña no proporcionados");
        return null;
      }
      const supabase = supabaseAuthClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        console.error("Error al iniciar sesión:", error.message);
        return null;
      }
      return data;
    } catch (e) {
      console.error("Excepción en SignIn:", e);
      return null;
    }
  },

  SignUp: async (email, password) => {
    try {
      if (!email || !password) {
        console.warn("Email o contraseña no proporcionados para registro");
        return null;
      }
      const supabase = supabaseAuthClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) {
        console.error("Error al registrar usuario:", error.message);
        return null;
      }
      return data;
    } catch (e) {
      console.error("Excepción en SignUp:", e);
      return null;
    }
  },

  SignOut: async () => {
    try {
      const supabase = supabaseAuthClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error("Excepción en SignOut:", e);
      return false;
    }
  },

  GetSession: async () => {
    try {
      const supabase = supabaseAuthClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión actual:", error.message);
        return null;
      }
      return data.session;
    } catch (e) {
      console.error("Excepción en GetSession:", e);
      return null;
    }
  },

  CurrentUser: async () => {
    try {
      const supabase = supabaseAuthClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener el usuario actual:", error.message);
        return null;
      }
      return data.user;
    } catch (e) {
      console.error("Excepción en GetUser:", e);
      return null;
    }
  },
  
};
