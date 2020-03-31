angular.module("app").component("messagesAlerts", {
  templateUrl: "./messagesAlerts.html",
  bindings: {},
  controller: function() {
    this.showLastMessage = function() {};
    this.showAllMessages = function() {};
    this.dontShowMessages = function() {};
  }
});
