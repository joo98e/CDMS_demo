/**
 * @param {newsConfig}  / Object, key : message, type, ref_id
 */

import axios from "axios"
const API = {
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