function applySpec(specification) {
    return function (...args) {
        let appliedSpecification = {};

        for (const [key, value] of Object.entries(specification)) {
            if (typeof value === 'function') {
                appliedSpecification[key] = value(...args);
            } else {
                appliedSpecification[key] = applySpec(value)(...args);
            }
        }
        return appliedSpecification;
    };
}

export default applySpec;
