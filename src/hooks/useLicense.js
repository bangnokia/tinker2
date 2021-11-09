import { useContext } from "react"
import { LicenseContext } from "../contexts/LicenseContext"

export function useLicense() {
    const context = useContext(LicenseContext)

    if (!context) {
        throw new Error("useLicense must be use within a LicenseProvider.")
    }

    return context
}
