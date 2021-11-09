import { fetch, Body } from "@tauri-apps/api/http";

export async function validateLicenseKey(key) {
    const response = await fetch('https://tinker2.com/api/licenses/verify', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: Body.json({ license_key: key })
    });

    return response.data;
}
