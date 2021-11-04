/**
 * @param {newsConfig}  / Object, key : message, type, ref_id
 * 
 * 헤더에 전송 방식을 추가할 수 있고 각기 맞는 상황에 사용해야
 * 효율을 높일 수 있다. 경우에 따라 전송이 안되는 경우도 있다.
 * const config = {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
            application/x-www-form-urlencoded : 텍스트 형식
            
            application/json                  : 제이슨 형식
            "content-type": "application/json"
            
            multipart/form-data               : 폼 데이터 형식(파일)
            "content-type": "multipart/form-data"
        }
    }
 */

import axios from "axios"

const API = {
    get: (URL, config) => {
        const promise = axios.get(URL, { params: config });
        const dataPromise = promise.then(res => res);
        return dataPromise;
    },
    post: (URL, config) => {
        const promise = axios.post(URL, config);
        const dataPromise = promise.then(res => res);
        return dataPromise;
    },
    put: () => {

    },
    del: () => {

    },

    uploads: (baseURL, files, config) => {
        const URL = `${baseURL}/${config.headers.dest.agency}/${config.headers.dest.project}`
        console.log(URL)
        const promise = axios.post(URL, files, config);
        const dataPromise = promise.then(res => res);
        return dataPromise;
    },

    permit: info => {
        // info : prop.member
        const getter = axios.get("/api/member/permit", { params: info });
        return getter;
    },

    permitted: (action, res) => {
        // action : "WRITE", "READ", "UPLOAD", ...
        // res    : return by permit
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