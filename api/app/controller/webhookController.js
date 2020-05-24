var webhookModel = require("../model/webhookModel");

exports.create = function(req, res) {
    var newWebhook = new webhookModel();

    if (!newWebhook.name) {
        res.status(400).send({
            error: true,
            message: "Please provide a webhook name"
        });
    } else {
        webhookModel.create(newWebhook, function(err, webhook) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send({ id: webhook });
            }
        });
    }
};

exports.getAll = function(req, res) {
    webhookModel.getAll(function(err, webhooks) {
        if (err) res.send(err);
        res.status(201).send(webhooks);
    });
};

exports.delete = function(req, res) {
    if (!req.params.webhook) {
        res.status(400).send({
            error: true,
            message: "Please provide a valid webhook"
        });
    } else {
        webhookModel.delete(req.params.webhook, function(err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send({ "message": "webhook + webhook data deleted successfully" });
            }
        });
    }
};
