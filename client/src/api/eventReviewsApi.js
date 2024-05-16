import { host } from ".";
import updateToken from "../utils/updateToken";

const postEventReview = async (reviewData) => {
    try {
        const response = await host.post("/EventReviews", reviewData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postEventReview, reviewData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { postEventReview };
