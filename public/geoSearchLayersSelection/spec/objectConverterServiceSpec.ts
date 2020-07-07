import { ObjectUtils } from "./objectUtils";
import { ISouceListItems } from "../interfaces/ISoucesListItems";
import { ISourceOption } from "../interfaces/ISourceOptions";

describe("", () => {
  let service;
  let utils;

  beforeEach(() => {
    service = null; // inject ObjectConverterService;
    utils = new ObjectUtils();
  });
  describe("convert Options To ListItems", () => {
    it("one source with few layers", () => {
      const option: Dictionery<ISourceOption> = utils.getSourceOption();

      const actual: Dictionery<ISouceListItems> = service.convertOptionsToListItems(
        option
      );

      const expected: Dictionery<ISouceListItems> = utils.getSource();
      expect(actual).toBe(expected);
    });

    beforeEach(() => {});

    it("", () => {});
  });
});
