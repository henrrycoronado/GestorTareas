import { supabaseClient }  from '../../supabaseClient';

export const BussisnessRepository = {
  InsertData: async (table, columns_names, columns_values, column_return = "ninguno") => {
    try {
      if (table == null || columns_names == null || columns_values == null || column_return == null) {
        console.warn("Datos incompletos al crear fila");
        return null;
      }
      const supabase = supabaseClient();
      if (columns_names.length !== columns_values.length) {
        console.warn("Los nombres y valores de columnas no coinciden en cantidad");
        return null;
      }
      let body = {};
      let process_state = true;
      columns_names.forEach((name, index) => {
        body[name] = columns_values[index];
      });
      const { data, error } = await supabase
        .from(table)
        .insert([body])
        .select();
      if (error) {
        console.error("Error al guardar los datos en Supabase:", error);
        process_state = false;
      }
      return column_return !== "ninguno" ? data?.[0]?.[column_return] : process_state;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  GetDataValue: async (table, reference_column, reference_value, column_name = "ninguno") => {
    try {
      if (table == null || column_name == null || reference_column == null || reference_value == null) {
        console.warn("Datos incompletos al obtener el atributo");
        return null;
      }
      const supabase = supabaseClient();
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq(reference_column, reference_value)
        .eq("state", true);
        
      if (error) {
        console.error("Error al obtener el atributo:", error);
      }
      return column_name !== "ninguno" ? data?.[0]?.[column_name] : data?.[0];
    } catch (e) {
      console.log("Error en el método GetDataValue:", e);
      return null;
    }
  },

  UpdateData: async (table, reference_column, reference_value, columns_names, columns_values) => {
    try {
      if (table == null || reference_column == null || reference_value == null || columns_names == null || columns_values == null) {
        console.warn("Datos incompletos al actualizar fila");
        return false;
      }
      const supabase = supabaseClient();
      if (columns_names.length !== columns_values.length) {
        console.warn("Los nombres y valores de columnas no coinciden en cantidad");
        return false;
      }
      let updateBody = {};
      columns_names.forEach((name, index) => {
        updateBody[name] = columns_values[index];
      });

      const { error } = await supabase
      .from(table)
      .update(updateBody)
      .eq(reference_column, reference_value);
        
      if (error) {
        console.error("Error al actualizar los datos en Supabase:", error);
        return false;
      }
      return true;
    } catch (e) {
      console.log("Error en el método UpdateData:", e);
      return false;
    }
  },

  GetAll: async (table, reference_column, reference_value) => {
    try {
      if (table==null || reference_column==null || reference_value ==null) {
        console.log(table, reference_column, reference_value);
        console.warn("Datos incompletos al obtener el atributo");
        return null;
      }
      const supabase = supabaseClient();
      const { data, error } = await supabase
        .from(table)
        .select()
        .eq(reference_column, reference_value)
        .eq("state", true);
      if (error) {
        console.error("Error al obtener el atributo:", error.message);
      }
      return data;
    } catch (e) {
      console.log("Error en el método GetDataValue:", e);
      return null;
    }
  },
};
