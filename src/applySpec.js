const applySpec = (specObject) => {
    return function (...args) {
        let appliedSpecObject = {};
        for (const [key, value] of Object.entries(specObject)) {
            appliedSpecObject[key] = value(...args);
        }
        return appliedSpecObject;
    };
};

export default applySpec;
