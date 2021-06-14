import { useEffect, useState } from "react";

function useDebounced(value, timeout) {
    let [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, timeout);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, timeout]);
    return debouncedValue;
}

export default useDebounced;