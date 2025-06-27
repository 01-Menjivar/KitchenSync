export const areFieldsFilled = (fields) =>
    Object.values(fields).every(val =>
        val !== null &&
        val !== undefined &&
        (typeof val === 'string' ? val.trim() !== '' : true)
    );