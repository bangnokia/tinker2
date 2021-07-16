export function isBase64(string) {
    return (new RegExp(`(?:^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)`)).test(string)
}