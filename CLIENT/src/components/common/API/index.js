/**
 * @param {newsConfig}  / Object, key : message, type, ref_id
 */

import axios from "axios"

const API = {
    get: (URL, config) => {
        const promise = axios.get(URL, { params: config });
        const dataPromise = promise.then(res => res);
        return dataPromise;
    },
    post: () => {

    },
    put: () => {

    },
    del: () => {

    },

    permit: info => {
        const getter = axios.get("/api/member/permit", { params: info });
        return getter;
    },

    permitted: (action, res) => {
        const _result = res.data.result[0];
        let status;

        switch (action.toUpperCase()) {

            case "WRITE":
                status = _result.action.indexOf(action) !== -1 ? true : false
                break;

            case "DOWN":
                status = _result.action.indexOf(action) !== -1 ? true : false
                break;

            case "UPLOAD":
                status = _result.action.indexOf(action) !== -1 ? true : false
                break;

            case "EDIT":
                status = _result.action.indexOf(action) !== -1 ? true : false
                break;

            default:
                break;
        }

        return status;
    },

    insertNews: newsConfig => {
        const URL = "/api/org/insertnews"
        axios.post(URL, newsConfig)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
                return false;
            })
    },

    getNews: config => {
        const URL = "/api/org/getnews"
        const promise = axios.get(URL, { params: config });
        const dataPromise = promise.then(res => res);
        return dataPromise;
    }
}

export default API;