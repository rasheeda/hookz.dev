module.exports = app => {
    var webhook = require("../controller/webhookController");

    app.get(`/hookz/test`, async (req, res) => {
        return res.status(200).send({ 1: "something :)" });
    });

    // GET or POST webhooks
    app.route("/hookz")
        .get(webhook.getAll)
        .post(webhook.create);

    app.route("/hookz/:webhook").delete(webhook.delete);
};
