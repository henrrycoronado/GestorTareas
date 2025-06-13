import { CategoryService } from './CategoryService';

export const CategoryValidate = {
    NameExist: async (name, userId) => {
        const data = await CategoryService.GetCategories(userId);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].category_name === name) {
                    window.alert("Ya existe una categoría con ese nombre");
                    return true;
                }
            }
        }
        return false;
    }
}