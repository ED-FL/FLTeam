angular.module("app").component("messagesAlerts", {
  templateUrl: "./messagesAlerts.html",
  bindings: {},
  controller: function() {
    this.currentAlerts = ["yael", "dolev", "ela"];
    this.$onInit = function() {};
    this.showLastMessage = function() {};
    this.showAllMessages = function() {};
    this.dontShowMessages = function() {};

    this.clearScrean = function() {};
    this.activeateButton = function() {};
    this.addAlert = function() {};
  }
});
