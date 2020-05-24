import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { API_URL, API_BASE_URL } from "../../services/webhookz";
import WebhookData from "../WebhookData";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import { Typography } from "antd";
import wretch from "wretch";

function Webhook() {
    const { Paragraph, Text } = Typography;
    const { webhook } = useParams();
    const webhookUrl = `${process.env.REACT_APP_BACKEND_URL}/a/${webhook}`;

    const [hooksData, setHooksData] = useState({});
    const [selectedWebhookData, setSelectedWebhookData] = useState({});
    const [selectedWebhookIndex, setSelectedWebhookIndex] = useState(1);
    const [isValidWebhook, setIsValidWebhook] = useState(true);

    useEffect(() => {
        JavascriptTimeAgo.locale(en);

        wretch(`${API_URL}/${webhook}/data`)
            .headers({
                "Access-Control-Allow-Origin": "*",
                crossDomain: true
            })
            .get()
            .json(response => {
                setHooksData(response);

                const selectedWebhookData = response.find(
                    data => data.id === response[0].id
                );
                setSelectedWebhookData(selectedWebhookData);
            })
            .catch(error => {
                setIsValidWebhook(false);
                console.log("error getting all data ", error);
            });
    }, []);

    const select = (id, index) => {
        const selectedWebhookData = hooksData.find(data => data.id === id);
        setSelectedWebhookData(selectedWebhookData);
        setSelectedWebhookIndex(index);
    };

    const isEmpty = obj => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };

    const deleteWebhook = webhook => {
        if (
            window.confirm(
                `Are you sure you want to delete this webhook (${webhook})? This will also delete all requests sent to the webhook`
            )
        ) {
            wretch(`${API_URL}/${webhook}`)
                .headers({
                    "Access-Control-Allow-Origin": "*",
                    crossDomain: true
                })
                .delete()
                .json(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log("error deleting webhook ", error);
                });
        }
    };

    const deleteWebhookData = webhook => {
        if (
            window.confirm(
                `Are you sure you want to delete all request data for this webhook (${webhook})?`
            )
        ) {
            wretch(`${API_BASE_URL}/d/${webhook}/data`)
                .headers({
                    "Access-Control-Allow-Origin": "*",
                    crossDomain: true
                })
                .delete()
                .json(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log("error deleting all webhook data ", error);
                });
        }
    };

    return (
        <div className="col-md-12">
            {isValidWebhook === false && (
                <div className="error-alert">
                    Invalid webhook provided. Please try again or generate a new
                    webhook URL
                </div>
            )}
            {hooksData.length > 0 && (
                <>
                    <div className="webhooks-nav">
                        <p className="request-total">
                            <span>{hooksData.length}</span> Total Requests
                        </p>
                        <p className="delete-webhook-data">
                            <button
                                className="c_button"
                                onClick={() => deleteWebhook(webhook)}
                            >
                                Delete Webhook
                            </button>
                            <button
                                className="c_button"
                                onClick={() => deleteWebhookData(webhook)}
                            >
                                Delete Data
                            </button>
                        </p>
                        <ul>
                            {hooksData.length > 0 &&
                                hooksData.map((data, index) => (
                                    <WebhookItemListView
                                        key={data.id}
                                        select={select}
                                        webhook={data}
                                        index={index + 1}
                                        active={
                                            index + 1 === selectedWebhookIndex
                                        }
                                    />
                                ))}
                        </ul>
                    </div>
                </>
            )}
            {isValidWebhook && (
                <article className="webhooks_content">
                    <p className="request-syntax">
                        Here's your unique webhook URL. You can now make any
                        kind of request.
                        <span>
                            <b>
                                <Paragraph copyable={{ text: webhookUrl }}>
                                    <Text strong code>
                                        {webhookUrl}
                                    </Text>
                                </Paragraph>
                            </b>
                        </span>
                    </p>
                    {isEmpty(selectedWebhookData) ? (
                        `No request data selected.`
                    ) : (
                        <WebhookData
                            details={selectedWebhookData}
                            selectedWebhookIndex={selectedWebhookIndex}
                        />
                    )}
                </article>
            )}
        </div>
    );
}

const WebhookItemListView = ({ webhook, select, index, active }) => {
    const data = JSON.parse(webhook.data);

    return (
        <li
            key={webhook.id}
            style={{ cursor: "pointer" }}
            onClick={() => select(webhook.id, index)}
            className={active ? "selected" : ""}
        >
            <span className="counter">#{index}</span>{" "}
            <span
                className={`webhook-item-method webhook-item-method-${data.method.toLowerCase()}`}
            >
                {data.method}
            </span>{" "}
            <span className="webhook-item-date">
                <ReactTimeAgo date={webhook.created_at} />
            </span>
            <br />
            <span className="webhook-item-http-version">
                HTTP Version: {data.httpVersion}
            </span>
        </li>
    );
};

export default Webhook;
