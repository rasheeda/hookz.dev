module.exports = app => {
    const webhookData = require("../controller/webhookDataController");
    const rateLimit = require("express-rate-limit");

    app.get(`/hookz/data`, async (req, res) => {
        return res.status(200).send({ 1: "test!" });
    });

    app.route("/hookz/:webhook/data").get(webhookData.getDataByWebhook);

    const createWebhookDataRequestLimit = rateLimit({
        windowMs: 30 * 60 * 1000,
        max: 500,
        message: "Too many requests created from this IP. You can make 500 post requests within 30 minutes. Please try again in 30 minutes"
    });

    app.route("/a/:webhook").all(createWebhookDataRequestLimit, webhookData.create);

    app.route("/d/:webhook/data").delete(webhookData.deleteDataByWebhook);
};
