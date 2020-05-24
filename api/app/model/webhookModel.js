var db = require("../../utils/db.js");
var uniqid = require("uniqid");

// Webhook oject
var webhook = function() {
    this.name = uniqid();
    this.created_at = new Date();
};

webhook.create = function(newWebhook, result) {
    db.query("INSERT INTO hookz set ? ", newWebhook, function(err, res) {
        if (err) {
            console.log("could not insert new webhook");
            result(err, null);
        } else {
            result(null, newWebhook);
        }
    });
};

webhook.getAll = function(result) {
    db.query("SELECT * from hookz", function(err, res) {
        if (err) {
            console.log("error fetching webhookz: ", err);
            result(null, err);
        } else {
            //console.log("successfully fetched all webhookz: ", res);
            result(null, res);
        }
    });
};

webhook.delete = function(webhook, result) {
  db.query("DELETE FROM hookz WHERE name = ?", webhook, function(err) {
      if (err) {
          console.log("error deleting webhook: ", err);
          result(null, error);
      }
  });

  db.query("DELETE FROM hookz_data WHERE webhook = ?", webhook, function(err, res) {
      if (err) {
          console.log("error deleting webhook data: ", err);
          result(null, error);
      } else {
        result(null, res);
      }
  });;
}

module.exports = webhook;
