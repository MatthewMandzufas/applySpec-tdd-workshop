const applySpec = (specObject) => {
    return function (valueToModify) {
        let appliedSpecObject = {};
        for (const [key, value] of Object.entries(specObject)) {
            appliedSpecObject[key] = value(valueToModify);
        }
        return appliedSpecObject;
    };
};

export default applySpec;
