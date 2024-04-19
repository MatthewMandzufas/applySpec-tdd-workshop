function applySpec(specification) {
    return function (...args) {
        let appliedSpecification = {};

        for (const [key, value] of Object.entries(specification)) {
            if (typeof value === 'function') {
                appliedSpecification[key] = value(...args);
            } else if (Array.isArray(value)) {
                appliedSpecification[key] = value.map((item) => {
                    return applySpec(item)(...args);
                });
            } else {
                appliedSpecification[key] = applySpec(value)(...args);
            }
        }
        return appliedSpecification;
    };
}

export default applySpec;
