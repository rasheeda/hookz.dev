module.exports = app => {
    var webhook = require("../controller/webhookController");

    app.get(`/hookz/test`, async (req, res) => {
        return res.status(200).send({ 1: "testing host sync :)" });
    });

    // GET or POST hooks
    app.route("/hookz")
        .get(webhook.getAll)
        .post(webhook.create);

    app.route("/hookz/:webhook").delete(webhook.delete);
};
