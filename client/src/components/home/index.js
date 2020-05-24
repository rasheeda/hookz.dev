import React from "react";
import "./styles.css";
import wretch from "wretch";
import { API_URL } from "../../services/webhookz";

function Home() {
    const createWebhook = () => {
        wretch(API_URL)
            .headers({
                "Access-Control-Allow-Origin": "*",
                crossDomain: true
            })
            .post()
            .json(response => {
                if (response.id.name) {
                    window.location.replace(`/${response.id.name}`);
                }
            })
            .catch(() => {
                console.log("error making request");
            });
    };

    return (
        <div className="col-md-12 home">
            <h1 className="d-block mb-5">
                hookz.dev is a free online tool for helping developers
                test/debug web hooks and other types of HTTP requests.
            </h1>
            <span className="d-block mb-5 caption">
                To get started, click the button below to generate a URL to test
                your webhook requests.
            </span>
            <button onClick={createWebhook} className="btn-custom">
                <span>Create New Webhook</span>
            </button>
        </div>
    );
}
export default Home;
