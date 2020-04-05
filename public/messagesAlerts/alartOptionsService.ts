import * as angular from "angular";

export enum ALARM_TYPE {
  LAST,
  NO,
  ALL,
}

const alarms = {
  [ALARM_TYPE.ALL]: {
    icon: "alarm_add",
    numMessages: 7,
    title: "show all messages",
  },
  [ALARM_TYPE.NO]: {
    icon: "alarm_off",
    numMessages: 0,
    title: "dont show messages",
  },
  [ALARM_TYPE.LAST]: {
    icon: "alarm",
    numMessages: 1,
    title: "show last message",
  },
};

angular.module("app").service(
  "alartOptionsService",
  class AlartOptionsService {
    getAlarms = function () {
      return [ALARM_TYPE.LAST, ALARM_TYPE.NO, ALARM_TYPE.ALL];
      // for (let value in ALARM_TYPE) {
      //   alarms.push(value);
      // }
    };

    getAlarmIcon = function (type: ALARM_TYPE) {
      return alarms[type].icon;
    };

    getAlarmNumMessages = function (type: ALARM_TYPE) {
      return alarms[type].numMessages;
    };

    getAlarmTitle = function (type: ALARM_TYPE) {
      return alarms[type].title;
    };
  }
);
