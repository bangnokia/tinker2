import { useEffect, useRef, useState } from "react";
import DatabaseService from "../services/DatabaseService";

function usePersistState(key, defaultValue = '') {
    const [state, setState] = useState(defaultValue)

    useEffect(() => {
        const database = new DatabaseService();
        database.set(key, state);
    }, [key, state])

    return [state, setState]
}

export default usePersistState;