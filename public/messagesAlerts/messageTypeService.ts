import * as angular from "angular";

export enum MESSAGE_TYPE {
  ERROR,
  SUCCESS,
  LOADING,
}

const messagesTypes = {
  [MESSAGE_TYPE.ERROR]: {
    icon: "error",
    styleClass: "error-message",
  },
  [MESSAGE_TYPE.SUCCESS]: {
    icon: "done",
    styleClass: "success-message",
  },
  [MESSAGE_TYPE.LOADING]: {
    icon: "autorenew",
    styleClass: "loading-message",
  },
};

angular.module("app").service(
  "messageTypeService",
  class MessageTypeService {
    getMessageIcon = function (type: MESSAGE_TYPE) {
      return messagesTypes[type].icon;
    };

    getMessageStyle = function (type: MESSAGE_TYPE) {
      return messagesTypes[type].styleClass;
    };
  }
);
