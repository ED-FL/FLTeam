import { MESSAGE_TYPE } from "../MESSAGE_TYPE";
import * as angular from "angular";

const messagesTypes = {
  [MESSAGE_TYPE.ERROR]: {
    icon: "error",
    styleClass: "error-message"
  },
  [MESSAGE_TYPE.SUCCESS]: {
    icon: "done",
    styleClass: "success-message"
  },
  [MESSAGE_TYPE.LOADING]: {
    icon: "autorenew",
    styleClass: "loading-message"
  }
};

angular.module("app").component("alert", {
  templateUrl: "./alert.html",
  bindings: {
    message: "="
  },
  controller: function() {
    this.$onInit = function() {
      let type = this.message.getType();
      this.style = messagesTypes[type].styleClass;
      this.icon = messagesTypes[type].icon;
    };
  }
});
