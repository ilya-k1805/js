function http() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', () => {
                if (Math.floor(xhr.status / 100) !== 2) {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                    return;
                }
                const response = JSON.parse(xhr.responseText);
                cb(null, response);
                });

                xhr.addEventListener('error', () => {
                cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                xhr.send();
            } catch (error) {
                cb(error);
            }
        },
        post(url, body, headers, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener('load', () => {
                if (Math.floor(xhr.status / 100) !== 2) {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                    return;
                }
                const response = JSON.parse(xhr.responseText);
                cb(null, response);
                });

                xhr.addEventListener('error', () => {
                cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
                }

                xhr.send(JSON.stringify(body));
            } catch (error) {
                cb(error);
            }
        },
    };
}

function httpFetch() {
    function handleResponse(response, cb) {
        response.then(function (res) {
            if (!res.ok) {
                throw Error(`Status code: ${res.status}`);
            }

            return res.json()
        })
            .then(data => cb(null, data))
            .catch(error => cb(error));
    }

    return {
        get(url, cb) {
            handleResponse(fetch(url), cb);
        },
        post(url, body = {}, headers = {}, cb) {
            const response = fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            handleResponse(response, cb);
        },
    };
}
