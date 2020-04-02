import { MESSAGE_TYPE } from "../messageTypeService";
import * as angular from "angular";

angular.module("app").component("alert", {
  templateUrl: "./alert.html",
  bindings: {
    message: "="
  },
  controller: function(messageTypeService) {
    this.$onInit = function() {
      let type = this.message.getType();
      this.style = this.messagesTypes.getMessageStyle(type);
      this.icon = this.messagesTypes.getMessageIcon(type);
    };
  }
});
