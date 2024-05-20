import moment
 from "moment";
const validateUserEditData = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = "Обязательное поле";
    }

    if (!values.lastName) {
        errors.lastName = "Обязательное поле";
    }

    if (!values.patronymic) {
        errors.patronymic = "Обязательное поле";
    }

    if (!values.email) {
        errors.email = "Обязательное поле";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Неверный адрес";
    }

    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Обязательное поле";
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = "Обязательное поле";
    }

    if (values.description && values.description.length > 255) {
        errors.description = "Превышена длина в 255 символов";
    }

    return errors;
};

export default validateUserEditData;