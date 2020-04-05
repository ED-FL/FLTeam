angular.module("app").component("alert", {
  templateUrl: "./alert.html",
  bindings: {
    message: "="
  },
  controller: function(messageTypeService) {
    this.$onInit = function() {
      this.messageType = messageTypeService;
      this.type = this.message.getType();
    };
  }
});
