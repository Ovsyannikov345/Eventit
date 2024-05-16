import { host } from ".";
import updateToken from "../utils/updateToken";

const postMessage = async (messageData) => {
    try {
        const response = await host.post("/Messages", messageData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postMessage, messageData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { postMessage };
