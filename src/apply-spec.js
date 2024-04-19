import R from 'ramda';

function getHighestArity(specification) {
    const highestArity = Object.values(specification).reduce(
        (highestArity, currentValue) => {
            let currentArity;
            if (typeof currentValue === 'function') {
                currentArity = currentValue.length;
            } else {
                currentArity = getHighestArity(currentValue);
            }
            return Math.max(currentArity, highestArity);
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

    return R.curry(factory);
}

export default applySpec;
