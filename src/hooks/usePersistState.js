import { useEffect, useState } from "react";
import DatabaseService from "../services/DatabaseService";

const db = new DatabaseService();

function usePersistState(key, defaultValue = undefined) {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        if (state !== undefined) {
            db.set(key, state);
        }
    }, [key, state])

    return [state, setState]
}

export default usePersistState;