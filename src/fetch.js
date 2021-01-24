export async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export async function putData(url, data) {
    const headers = {
        'Content-Type': 'application/json'
    };
    const res = await fetch(url, {
        method: 'PUT',
        headers,
        body: data,
    });
    return res;
}
