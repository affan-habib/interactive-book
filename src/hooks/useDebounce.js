import { useEffect, useState } from "react";
import { DEBOUNCE_TIMEOUT } from "@/constant/data";

export default function useDebounce(value) {
    const [debounceValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, DEBOUNCE_TIMEOUT);

        return () => {
            clearTimeout(handler);
        };
    }, [value, DEBOUNCE_TIMEOUT]);

    return debounceValue;
}
