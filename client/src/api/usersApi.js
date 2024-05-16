import { host } from ".";
import updateToken from "../utils/updateToken";

const registerUser = async (userData) => {
    try {
        const response = await host.post("/Users/create", userData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(registerUser, userData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const getUserProfile = async () => {
    try {
        const response = await host.get("/Users/profile");

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(getUserProfile);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const getUser = async (id) => {
    try {
        const response = await host.get("/Users/" + id);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(getUser, id);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const putUser = async (updatedUserData) => {
    try {
        const response = await host.put("/Users/" + updatedUserData.id, updatedUserData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(putUser, updatedUserData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const checkEmailAvailability = async (email) => {
    try {
        const response = await host.post("/Users/check-email", { email });

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

export { registerUser, getUserProfile, getUser, checkEmailAvailability };
