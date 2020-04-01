import { MESSAGE_TYPE } from "../MESSAGE_TYPE";
import * as angular from "angular";

const types = {
  [MESSAGE_TYPE.ERROR]: {
    icon: "error",
    styleClass: "error"
  },
  [MESSAGE_TYPE.SUCCESS]: {
    icon: "done",
    styleClass: "success"
  },
  [MESSAGE_TYPE.LOADING]: {
    icon: "autorenew",
    styleClass: "loading"
  }
};

angular.module("app").component("message", {
  templateUrl: "./alert.html",
  bindings: {
    //message: "="
  },
  controller: function() {
    this.stlye = types[MESSAGE_TYPE.SUCCESS].styleClass;
    this.icon = types[MESSAGE_TYPE.SUCCESS].icon;
  }
});
