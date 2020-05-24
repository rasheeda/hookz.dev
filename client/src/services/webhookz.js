import wretch from "wretch";

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/hookz`;
export const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const create = () => {
    wretch(API_URL)
        .headers({
            "Access-Control-Allow-Origin": "*",
            crossDomain: true
        })
        .post();
};

export const getWebhooksData = webhook => {
    wretch(`${API_URL}/${webhook}/data`)
        .headers({
            "Access-Control-Allow-Origin": "*",
            crossDomain: true
        })
        .get();
};
