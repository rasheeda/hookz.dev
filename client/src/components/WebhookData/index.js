import React from "react";
import ReactJson from "react-json-view";
import "./styles.css";

const WebhookData = ({ details, selectedWebhookIndex }) => {
    const data = JSON.parse(details.data);
    return (
        <div>
            {details.id && (
                <div className="webhook-data-content">
                    <p className="selected-index">#{selectedWebhookIndex}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>{data.method}</td>
                                <td>{data.url}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{details.created_at}</td>
                            </tr>
                            <tr>
                                <td>Host</td>
                                <td>{data.ip}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className="headers">Headers</h3>
                    <ReactJson
                        src={data.headers}
                        theme="ashes"
                        iconStyle="circle"
                    />

                    <h3 className="query">Query</h3>
                    <ReactJson src={data.query} theme="google" />

                    <h3 className="request-body">Request Body</h3>
                    <ReactJson src={data.body} theme="greenscreen" />
                </div>
            )}
        </div>
    );
};

export default WebhookData;
