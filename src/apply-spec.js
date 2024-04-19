function getHighestArity(specification) {
    const highestArity = Object.values(specification).reduce(
        (accumulator, currentValue) => {
            if (typeof currentValue === 'function') {
                return Math.max(currentValue.length, accumulator);
            } else {
                return Math.max(getHighestArity(currentValue), accumulator);
            }
        },
        0
    );
    return highestArity;
}

function applySpec(specification) {
    const highestArity = getHighestArity(specification);

    function factory(...filledArray) {
        let results = Array.isArray(specification) ? [] : {};

        for (const [key, value] of Object.entries(specification)) {
            if (typeof value === 'function') {
                results[key] = value(...filledArray);
            } else if (Array.isArray(value)) {
                results[key] = value.map((item) => {
                    return applySpec(item)(...filledArray);
                });
            } else {
                results[key] = applySpec(value)(...filledArray);
            }
        }
        return results;
    }

    Object.defineProperty(factory, 'length', {
        value: highestArity,
        writable: false,
    });

    return factory;
}

export default applySpec;
