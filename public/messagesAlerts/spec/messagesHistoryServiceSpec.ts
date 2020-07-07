import { MESSAGE_TYPE } from "../messageTypeService";
import { Message } from "../message";

describe("", () => {
  let service;
  beforeEach(() => {
    service = null; //inject
  });

  describe("add Message", () => {
    it("add first message in series", () => {
      const message = new Message("1", MESSAGE_TYPE.ERROR);
      service.addMessage();
      // should have one message in array - #1;
    });
    it("add message to series", () => {
      const message1 = new Message("1", MESSAGE_TYPE.LOADING);
      const series = message1.getSeriesId();
      const message2 = new Message("2", MESSAGE_TYPE.ERROR, series);
      const message3 = new Message("3", MESSAGE_TYPE.SUCCESS, series);
      service.addMessage(message1);
      service.addMessage(message2);
      service.addMessage(message3);
      // should have one message in array - #3
    });

    it("add messages with different series", () => {
      const message1 = new Message("1", MESSAGE_TYPE.LOADING);
      const message2 = new Message("2", MESSAGE_TYPE.ERROR);
      const message3 = new Message("3", MESSAGE_TYPE.SUCCESS);
      service.addMessage(message1);
      service.addMessage(message2);
      service.addMessage(message3);
      // should have 3 messages in array - #1 #2 #3
    });
  });
  describe("get Top Messages", () => {
    let message1;
    let message2;
    let message3;

    beforeEach(() => {
      message1 = new Message("1", MESSAGE_TYPE.LOADING);
      message2 = new Message("2", MESSAGE_TYPE.ERROR);
      message3 = new Message("3", MESSAGE_TYPE.SUCCESS);
      service.addMessage(message1);
      service.addMessage(message2);
      service.addMessage(message3);
    });

    it("num requested is smaller then num messages", () => {
      const actual = service.getTopMessages(1);
      const expected = [message3];
      expect(actual).toBe(expected);
    });
    it("num requested is bigger then num messages", () => {
      const actual = service.getTopMessages(4);
      const expected = [message3, message2, message1];
      expect(actual).toBe(expected);
    });
    it("num requested is equal to num messages", () => {
      const actual = service.getTopMessages(3);
      const expected = [message3, message2, message1];
      expect(actual).toBe(expected);
    });

    // it("order of messages should start from last", () => {});
  });
  describe("get Hidden Loading Messages", () => {
    it("param is null", () => {});
    it("param is smaller then num messages", () => {});
    it("param is bigger then num messages", () => {});
    it("param is equal to num messages", () => {});

    it("loading messages in shown only ", () => {});
    it("loading messages in hidden only", () => {});
    it("loading messages in hidden and shown", () => {});
  });
});
