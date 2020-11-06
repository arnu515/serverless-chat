export function queryString(unparsed: string): {} {
    const separated = unparsed.replace("?", "").split("&");
    if (!separated) return {};
    const query = {};
    for (let item of separated) {
        const x = item.split("=");
        query[x[0]] = x[1];
    }
    return query;
}
