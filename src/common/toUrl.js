/**
 * Takes an object representing the url query and transform it into a string
 * @param query: f.ex: {q: "Java", fruits: ["Apple", "Banana"], count: 10}
 * @returns {string} f.ex: q=Java&names=Apple_Banana&count=10
 */
export default function toUrl(query) {
    let result = {};

    Object.keys(query).forEach((key) => {
        if (query[key] !== undefined) {
            if (query[key] !== '') {
                result = {
                    ...result,
                    [key]: query[key]
                };
            }
        }
    });

    const urlQuery = Object.keys(result)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}`)
        .join('&')
        .replace(/%20/g, '+')
        .replace(/%2C/g, ',');


    return urlQuery && urlQuery.length > 0 ? `?${urlQuery}` : '';
}