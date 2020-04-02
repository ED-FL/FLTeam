import { MESSAGE_TYPE } from "../messageTypeService";
import * as angular from "angular";

angular.module("app").component("alert", {
  templateUrl: "./alert.html",
  bindings: {
    message: "="
  },
  controller: function(messageTypeService) {}
});
