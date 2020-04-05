angular.module("app").component("singleMessage", {
  templateUrl: "./singleMessage.html",
  bindings: {
    message: "=",
  },
  controller: function (messageTypeService) {
    this.$onInit = function () {
      this.messageType = messageTypeService;
      this.type = this.message.getType();
    };
  },
});
