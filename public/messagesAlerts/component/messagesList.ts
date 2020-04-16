import { MESSAGE_TYPE } from "../messageTypeService";
import { ALARM_TYPE } from "../alartOptionsService";
import * as angular from "angular";

angular.module("app").component("messagesList", {
  templateUrl: "./messagesList.html",
  bindings: {},
  controller: class MessagesList {
    messagesHistory;
    messageTypes;
    lastMessageIcon: string;
    lastMessageStyle: string;
    currentalarmType: ALARM_TYPE;
    numMessages: number;
    lastMessageContent: string;

    constructor(messagesHistoryService, messageTypeService) {
      this.messagesHistory = messagesHistoryService;
      this.messageTypes = messageTypeService;
    }

    $onInit = function () {
      this.initLastMessage();
    };

    private initLastMessage() {
      this.lastMessageIcon = this.messageTypes.getMessageIcon(
        MESSAGE_TYPE.LOADING
      );
      this.lastMessageStyle = "last-message";
    }

    private doAction(num, type) {
      this.numMessages = num;
      this.currentalarmType = type;
    }

    public showOnlyAlarm() {
      return this.currentalarmType == ALARM_TYPE.NO;
    }

    public showLastMessage() {
      if (this.currentalarmType == ALARM_TYPE.LAST) {
        let numHiddenLoading = this.messagesHistory.getHiddenLoadingMessages()
          .length;

        this.lastMessageContent =
          "ישנם " + numHiddenLoading + " פריטים נוספים בטעינה";

        return numHiddenLoading > 0;
      }
      return false;
    }
  },
});
