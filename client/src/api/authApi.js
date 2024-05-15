import { host } from ".";

const login = async (email, password) => {
    try {
        const response = await host.post("Auth/login", { email: email, password: password });

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const logout = async () => {
    try {
        const response = await host.post("Auth/logout", { token: localStorage.getItem("refreshToken") });

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { login, logout };