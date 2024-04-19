function applySpec(specification) {
    return function (...args) {
        let results = Array.isArray(specification) ? [] : {};

        for (const [key, value] of Object.entries(specification)) {
            if (typeof value === 'function') {
                results[key] = value(...args);
            } else if (Array.isArray(value)) {
                results[key] = value.map((item) => {
                    return applySpec(item)(...args);
                });
            } else {
                results[key] = applySpec(value)(...args);
            }
        }
        return results;
    };
}

export default applySpec;
