export const mapSource = (source: number) => {
    return source === 0 ? '线上挂号' : '线下挂号';
};

export const getSessionId = () => {
    return JSON.parse(sessionStorage.getItem('access_token')).id
}