import { host } from ".";
import updateToken from "../utils/updateToken";

const postSupportRequest = async (supportRequestData) => {
    try {
        const response = await host.post("/SupportRequests", supportRequestData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postSupportRequest, supportRequestData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { postSupportRequest };
