import { useEffect, useState } from "react";
import DatabaseService from "../services/DatabaseService";

const database = new DatabaseService();

function usePersistState(key, defaultValue = '') {
    const [state, setState] = useState(() => database.get(key, defaultValue));

    useEffect(() => {
        database.set(key, state);
    }, [key, state])

    return [state, setState]
}

export default usePersistState;