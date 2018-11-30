const isJson = (str) => {
    try {
        return Array.isArray(JSON.parse(str));
    } catch (e) {
        return false;
    }
    return true;
};

export default isJson;