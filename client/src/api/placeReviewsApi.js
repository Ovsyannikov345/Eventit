import { host } from ".";
import updateToken from "../utils/updateToken";

const postPlaceReview = async (placeReviewData) => {
    try {
        const response = await host.post("/PlaceReviews", placeReviewData);

        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return await updateToken(postPlaceReview, placeReviewData);
            }

            return error.response;
        } else if (error.request) {
            return { data: { error: "Сервис временно недоступен" } };
        } else {
            return { data: { error: "Ошибка при создании запроса" } };
        }
    }
};

export { postPlaceReview };
