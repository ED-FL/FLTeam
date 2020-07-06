import { SourceDriver } from "./sourceDriver";
import { ISouceListItems } from "../interfaces/ISoucesListItems";
import { DriverContext } from "../../app/testingUtils/DriverContext";

describe("", () => {
  let driver: SourceDriver;
  let source: ISouceListItems;
  let searchText: string;
  let selectAll: ({ source: ISouceListItems, selection: boolean }) => void;
  let selectLayer: ({ source: ISouceListItems, layerId: string }) => void;
  let unSelectLayer: ({ source: ISouceListItems, layerId: string }) => void;

  beforeEach(() => {
    driver = new SourceDriver(new DriverContext());
    initSource();
    searchText = "";
    selectAll = null;
    selectLayer = null;
    unSelectLayer = null;
  });

  function initSource() {
    source = {
      sourceData: {
        displayName: "elastic source",
        isSelected: null,
        isDisabled: null,
      },
      numSelectedLayers: null,
      canSelectAll: null,
      maxSelectedLayers: null,
      layers: null,
    };
  }

  function getLayer() {
    return {
      layer1: {
        displayName: "layer 1",
        isSelected: null,
        isDisabled: null,
      },
    };
  }

  function getLayers() {
    return {
      layer1: {
        displayName: "layer 1",
        isSelected: undefined,
        isDisabled: undefined,
      },
      layer2: {
        displayName: "layer 2",
        isSelected: undefined,
        isDisabled: undefined,
      },
      layer3: {
        displayName: "layer 3",
        isSelected: undefined,
        isDisabled: undefined,
      },
    };
  }

  describe("expend button", () => {
    describe("on expend clicked when initially closed", () => {
      beforeEach(() => {});

      it("icon is expand_less", () => {});

      it("isExpanded is true", () => {});

      it("onExpand function is called", () => {});

      it("layers are shown", () => {});

      // ToDo: consider search text
    });

    describe("on shrink clicked when initially opend", () => {
      it("icon is expand_more", () => {});

      it("isExpanded is false", () => {});

      it("onExpand function is called", () => {});

      it("layers are hidden", () => {});
    });
  });

  describe("checkbox", () => {
    describe("user click on source", () => {
      beforeEach(() => {
        source.sourceData.isDisabled = false;
        selectAll = jasmine.createSpy("selectAll", () => {});

        driver.given.source(source).and.selectAll(selectAll);
        driver.when.created().and.clickOnSourceCheckBox();
      });
      describe("on check", () => {
        it("selectAll should be called with true", () => {
          source.sourceData.isSelected = false;
          expect(selectAll).toHaveBeenCalledWith(source, true);
          expect(selectAll).toHaveBeenCalledTimes(1);
        });

        //ToDo
        it("should be expended", () => {});
      });

      describe("on uncheck", () => {
        it("selectAll should be called with false", () => {
          source.sourceData.isSelected = true;
          expect(selectAll).toHaveBeenCalledWith(source, true);
          expect(selectAll).toHaveBeenCalledTimes(1);
        });

        //ToDo
        it("should be expended", () => {});
      });
    });

    describe("source's initial state", () => {
      beforeEach(() => {});
      it("source disabled", () => {
        source.sourceData.isDisabled = true;
        driver.given.source(source).then.when.created();
        expect(driver.get.isSourceDisabled()).toBeTruthy();
      });
      it("source enabled", () => {
        source.sourceData.isDisabled = false;
        driver.given.source(source).then.when.created();
        expect(driver.get.isSourceDisabled()).toBeFalsy();
      });
      it("source checked", () => {
        source.sourceData.isSelected = true;
        driver.given.source(source).then.when.created();
        expect(driver.get.isSourceChecked()).toBeTruthy();
      });
      it("source unchecked", () => {
        source.sourceData.isSelected = false;
        driver.given.source(source).then.when.created();
        expect(driver.get.isSourceChecked()).toBeFalsy();
      });
    });

    describe("source display name", () => {
      driver.given.source(source).then.when.created();
      expect(driver.get.sourceDisplayName()).toBe(
        source.sourceData.displayName
      );
    });
  });

  describe("single layer", () => {
    let layerId;
    beforeEach(() => {
      layerId = getLayer().layer1.displayName;
      source.layers = getLayer();
    });

    describe("user click on layer", () => {
      beforeEach(() => {
        source.layers[layerId].isDisabled = false;
      });

      describe("on check", () => {
        it("selectLayer should be called", () => {
          source.layers[layerId].isSelected = false;
          selectLayer = jasmine.createSpy("selectLayer", () => {});

          driver.given.source(source).and.selectLayer(selectLayer);
          driver.when.created().and.clickOnLayerCheckBox(layerId);

          expect(selectLayer).toHaveBeenCalledWith(source, layerId);
          expect(selectLayer).toHaveBeenCalledTimes(1);
        });
      });

      describe("on uncheck", () => {
        it("unSelectLayer should be called", () => {
          source.layers[layerId].isSelected = true;
          unSelectLayer = jasmine.createSpy("unSelectLayer", () => {});

          driver.given.source(source).and.unSelectLayer(unSelectLayer);
          driver.when.created().and.clickOnLayerCheckBox(layerId);

          expect(unSelectLayer).toHaveBeenCalledWith(source, layerId);
          expect(unSelectLayer).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("layer's initial state", () => {
      beforeEach(() => {
        driver.given.source(source).then.when.created;
      });

      it("layer disabled", () => {
        source.layers[layerId].isDisabled = true;
        expect(driver.get.isLayerDisabled(layerId)).toBeTruthy;
      });

      it("layer enabled", () => {
        source.layers[layerId].isDisabled = false;
        expect(driver.get.isLayerDisabled(layerId)).toBeFalsy;
      });

      it("layer checked", () => {
        source.layers[layerId].isSelected = true;
        expect(driver.get.isLayerChecked(layerId)).toBeTruthy;
      });

      it("layer unChecked", () => {
        source.layers[layerId].isSelected = false;
        expect(driver.get.isLayerChecked(layerId)).toBeFalsy;
      });
    });

    it("layer displayname", () => {
      driver.given.source(source).then.when.created();
      expect(driver.get.layerDisplayName(layerId)).toBe(
        getLayer()[layerId].displayName
      );
    });
  });

  describe("search text", () => {
    beforeEach(() => {
      source.layers = getLayers();
      driver.given.source(source);
    });

    it("empty text -  display all layers in source", () => {
      searchText = "";
      driver.given.searchText(searchText).then.when.created();
      let suitableLayers = driver.get.controller().getSuitableLayersByText;
      expect(suitableLayers.count()).toBe(Object.keys(source.layers).length);
    });

    describe("text search", () => {
      it("all layers fit", () => {
        searchText = "layer";
        driver.given.searchText(searchText).then.when.created();
        let suitableLayers = driver.get.controller().getSuitableLayersByText;
        expect(suitableLayers.count()).toBe(Object.keys(source.layers).length);
      });

      it("non of the layers fit", () => {
        searchText = "4";
        driver.given.searchText(searchText).then.when.created();
        let suitableLayers = driver.get.controller().getSuitableLayersByText;
        expect(suitableLayers.count()).toBe(0);
      });

      it("one layer fit", () => {
        searchText = "1";
        driver.given.searchText(searchText).then.when.created();
        let suitableLayers = driver.get.controller().getSuitableLayersByText;
        expect(suitableLayers.count()).toBe(1);
        expect(suitableLayers.hasOwnProperty("layer1")).toBeTruthy();
      });
    });
  });

  beforeEach(() => {});

  describe("", () => {});

  it("", () => {});
});
