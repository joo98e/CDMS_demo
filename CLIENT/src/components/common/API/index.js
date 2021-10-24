/**
 * @param {HAPPEND_config}  / Object, key : message, type, ref_id
 */

import axios from "axios"
const API = {
    insertNews: (HAPPEND_config) => {
        const URL = "/api/org/insertnews"
        axios.post(URL, HAPPEND_config)
            .then(res => {
                console.log(res.data);
                return res.data;
            })
            .catch(err => {
                console.error(err);
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