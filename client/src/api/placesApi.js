import { host } from ".";
import updateToken from "../utils/updateToken";

const getPlaces = async () => {
    try {
        const response = await host.get("/Places");

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(getPlaces);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

const postPlace = async (placeData) => {
    try {
        const response = await host.post("/Places", placeData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postPlace, placeData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { getPlaces, postPlace };
