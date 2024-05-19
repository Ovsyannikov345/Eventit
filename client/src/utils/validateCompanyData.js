const validateCompanyData = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Обязательное поле";
    }

    if (!values.contactSurname) {
        errors.contactSurname = "Обязательное поле";
    }

    if (!values.name) {
        errors.name = "Обязательное поле";
    }

    if (!values.registrationNumber) {
        errors.registrationNumber = "Обязательное поле";
    }

    if (!values.contactName) {
        errors.contactName = "Обязательное поле";
    }

    if (!values.contactEmail) {
        errors.contactEmail = "Обязательное поле";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
        errors.contactEmail = "Неверный адрес";
    }

    if (!values.email) {
        errors.contactEmail = "Обязательное поле";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
        errors.email = "Неверный адрес";
    }

    if (!values.contactPhone) {
        errors.contactPhone = "Обязательное поле";
    } else if (values.contactPhone.includes("_")) {
        errors.contactPhone = "Некорректное значение";
    }

    return errors;
};

export default validateCompanyData;