import { MessagesListDriver } from "./messagesListDriver";
import { DriverContext } from "../../app/testingUtils/DriverContext";
import { ALARM_TYPE } from "../alartOptionsService";

describe("", () => {
  let driver;

  beforeEach(() => {
    driver = new MessagesListDriver(new DriverContext());
  });

  describe("show all messages", () => {
    it("container class should be 'messages-alarts-container'", () => {});
    it("alarm container class should be 'first-message'", () => {});
    it("should show alarm container title", () => {});
    it("should not show last message", () => {});

    describe("creates single message with the right params", () => {});
  });

  describe("show last message only", () => {
    beforeEach(() => {
      driver.get.controller().currentAlarmType = ALARM_TYPE.LAST;
    });
    it("container class should be 'messages-alarts-container'", () => {});
    it("alarm container class should be 'first-message'", () => {});
    it("should show alarm container title", () => {});
    describe("show last message", () => {
      it("should not show last message", () => {});

      describe("should show last message", () => {
        describe("should create single-message properly", () => {});

        it("show last message should return true", () => {});
      });
    });

    describe("creates single message with the right params", () => {});
  });

  describe("dont show messages", () => {
    it("container class should be 'no-alarm-container'", () => {});
    it("alarm container class should be empty", () => {});
    it("should not show alarm container title", () => {});
    it("should not show last message", () => {});

    describe("creates single message with the right params", () => {});
  });

  describe("alarm changed", () => {
    beforeEach(() => {});
    describe("alarm change to ALL", () => {
      it("num messages should be 7", () => {});
      it("current alarm type should be ALL", () => {});
    });

    describe("alarm change to LAST", () => {
      beforeEach(() => {});
      it("num messages should be 1", () => {});
      it("current alarm type should be LAST", () => {});
    });

    describe("alarm change to NO", () => {
      beforeEach(() => {});
      it("num messages should be 0", () => {});
      it("current alarm type should be NO", () => {});
    });
  });
});
