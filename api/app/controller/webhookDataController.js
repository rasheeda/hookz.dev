const webhookDataModel = require("../model/webhookDataModel");

exports.create = function(req, res) {
    var newWebhookData = new webhookDataModel(req);

    webhookDataModel.create(newWebhookData, function(err, webhookData) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(webhookData);
        }
    });
};

exports.getDataByWebhook = function(req, res) {
  webhookDataModel.checkWebhookValidity(req.params.webhook, function(
      err,
      count
  ) {
      if (err) res.send(err);
      if (count[0].count === 1) {
        webhookDataModel.getDataByWebhook(req.params.webhook, function(
            err,
            webhookData
        ) {
            if (err) res.send(err);
            res.status(201).send(webhookData);
        });
      } else {
        res.status(404).send({"message":"invalid webhook"});
      }
  });
};

exports.deleteDataByWebhook = function (req, res) {
  webhookDataModel.checkWebhookValidity(req.params.webhook, function(
      err,
      count
  ) {
    if (err) res.send(err);
    if (count[0].count === 1) {
      webhookDataModel.deleteDataByWebhook(req.params.webhook, function(
      err, webhook
    ) {
      if (err) res.send(err);
      res.status(201).send({"message":"webhook data deleted successfully"});
    })
  } else {
    res.status(404).send({"message":"invalid webhook"});
  }
})};
