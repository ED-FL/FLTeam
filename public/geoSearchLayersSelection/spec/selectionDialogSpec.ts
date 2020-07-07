import { SelectionDialogDriver } from "./selectionDialogDriver";
import { DriverContext } from "../../app/testingUtils/DriverContext";
import { ISouceListItems } from "../interfaces/ISoucesListItems";
import { ObjectUtils } from "./objectUtils";

describe("", () => {
  let driver: SelectionDialogDriver;
  let onAllSources = null;
  let sources: Dictionery<ISouceListItems> = null;
  let searchText: string = null;
  let objectUtils: ObjectUtils;

  beforeEach(() => {
    driver = new SelectionDialogDriver(new DriverContext());
    objectUtils = new ObjectUtils();
  });

  describe("on select all clicked", () => {
    let sourceResult;
    let layersReasult;

    beforeEach(() => {
      sources = objectUtils.getSource();
    });

    describe("source has limited num selected layers", () => {
      beforeEach(() => {
        sources["source1"].sourceData.isSelected = false;
        sources["source1"].canSelectAll = false;
        sources["source1"].maxSelectedLayers = 2;
        sources["source1"].layers = objectUtils.getLayers();
      });

      describe("all layers initialy unselected", () => {
        beforeEach(() => {
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          driver.get.controller().sources = sources;
          driver.when.clickOnSelectAllButton();
          sourceResult = driver.get.controller().sources["source1"];
          layersReasult = sourceResult.layers;
        });

        it("source should be selected", () => {
          expect(sourceResult.sourceData.isSelected).toBeTruthy();
        });

        it("numSelectedLayers in source should be 2", () => {
          expect(layersReasult.numSelectedLayers).toBe(2);
        });

        it("first 2 layers should be selected", () => {
          expect(layersReasult["layer1"].isSelected).toBeTruthy();
          expect(layersReasult["layer2"].isSelected).toBeTruthy();
        });

        it("last layer should be unSelected", () => {
          expect(layersReasult["layer3"].isSelected).toBeFalsy();
        });

        it("last layer should be disabled", () => {
          expect(layersReasult["layer3"].isDisabled).toBe(true);
        });
      });
      describe("first layer initially selected", () => {
        beforeEach(() => {
          sources["source1"].layers["layer1"].isSelected = true;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          driver.get.controller().sources = sources;
          driver.when.clickOnSelectAllButton();
          sourceResult = driver.get.controller().sources["source1"];
          layersReasult = sourceResult.layers;
        });

        it("source should be selected", () => {
          expect(sourceResult.sourceData.isSelected).toBeTruthy();
        });

        it("numSelectedLayers in source should be 2", () => {
          expect(layersReasult.numSelectedLayers).toBe(2);
        });

        it("first 2 layers should be selected", () => {
          expect(layersReasult["layer1"].isSelected).toBeTruthy();
          expect(layersReasult["layer2"].isSelected).toBeTruthy();
        });

        it("last layer should be unSelected", () => {
          expect(layersReasult["layer3"].isSelected).toBeFalsy();
        });

        it("last layer should be disabled", () => {
          expect(layersReasult["layer3"].isDisabled).toBe(true);
        });
      });
      describe("last layer initially selected", () => {
        beforeEach(() => {
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = true;

          driver.get.controller().sources = sources;
          driver.when.clickOnSelectAllButton();
          sourceResult = driver.get.controller().sources["source1"];
          layersReasult = sourceResult.layers;
        });

        it("source should be selected", () => {
          expect(sourceResult.sourceData.isSelected).toBeTruthy();
        });

        it("numSelectedLayers in source should be 2", () => {
          expect(layersReasult.numSelectedLayers).toBe(2);
        });

        it("first and last layers should be selected", () => {
          expect(layersReasult["layer1"].isSelected).toBeTruthy();
          expect(layersReasult["layer3"].isSelected).toBeTruthy();
        });

        it("second layer should be unSelected", () => {
          expect(layersReasult["layer2"].isSelected).toBeFalsy();
        });

        it("second layer should be disabled", () => {
          expect(layersReasult["layer3"].isDisabled).toBe(true);
        });
      });
    });

    describe("can select all layers in source", () => {
      beforeEach(() => {
        sources["source1"].sourceData.isSelected = false;
        sources["source1"].canSelectAll = true;
        sources["source1"].layers = objectUtils.getLayers();
      });

      describe("all layers initialy unselected", () => {
        beforeEach(() => {
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          driver.get.controller().sources = sources;
          driver.when.clickOnSelectAllButton();
          sourceResult = driver.get.controller().sources["source1"];
          layersReasult = sourceResult.layers;
        });

        it("source should be selected", () => {
          expect(sourceResult.sourceData.isSelected).toBeTruthy();
        });

        it("numSelectedLayers in source should be 3", () => {
          expect(layersReasult.numSelectedLayers).toBe(3);
        });

        it("all layers should be selected", () => {
          expect(layersReasult["layer1"].isSelected).toBeTruthy();
          expect(layersReasult["layer2"].isSelected).toBeTruthy();
          expect(layersReasult["layer3"].isSelected).toBeTruthy();
        });
      });

      describe("one layer initialy selected", () => {
        beforeEach(() => {
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = true;
          sources["source1"].layers["layer3"].isSelected = false;

          driver.get.controller().sources = sources;
          driver.when.clickOnSelectAllButton();
          sourceResult = driver.get.controller().sources["source1"];
          layersReasult = sourceResult.layers;
        });

        it("source should be selected", () => {
          expect(sourceResult.sourceData.isSelected).toBeTruthy();
        });

        it("numSelectedLayers in source should be 3", () => {
          expect(layersReasult.numSelectedLayers).toBe(3);
        });

        it("all layers should be selected", () => {
          expect(layersReasult["layer1"].isSelected).toBeTruthy();
          expect(layersReasult["layer2"].isSelected).toBeTruthy();
          expect(layersReasult["layer3"].isSelected).toBeTruthy();
        });
      });
    });

    it("onAllSources method should be called with true", () => {
      onAllSources = jasmine.createSpy("onAllSources", () => {});

      driver.when.created().and.clickOnSelectAllButton();
      expect(onAllSources).toHaveBeenCalledWith(true);
      expect(onAllSources).toHaveBeenCalledTimes(1);
    });

    it("source already selected - sould stay selected", () => {
      sources["source1"].sourceData.isSelected = true;
      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      expect(sourceResult.sourceData.isSelected).toBeTruthy();
    });
  });

  describe("on clear all cliecked ", () => {
    let sourceResult;
    let layersReasult;

    beforeEach(() => {
      sources = objectUtils.getSource();
      sources["source1"].sourceData.isSelected = true;
      sources["source1"].layers = objectUtils.getLayers();
      sources["source1"].layers["layer1"].isSelected = true;
      sources["source1"].layers["layer2"].isSelected = true;
      sources["source1"].layers["layer3"].isSelected = true;
    });

    it("all layers initialy selected - all layers should be unSelected", () => {
      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      layersReasult = sourceResult.layers;

      expect(layersReasult["layer1"].isSelected).toBeFalsy();
      expect(layersReasult["layer2"].isSelected).toBeFalsy();
      expect(layersReasult["layer3"].isSelected).toBeFalsy();
    });

    it("one layer initialy unSelected - all layers should be unSelected", () => {
      sources["source1"].layers["layer2"].isSelected = false;

      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      layersReasult = sourceResult.layers;

      expect(layersReasult["layer1"].isSelected).toBeFalsy();
      expect(layersReasult["layer2"].isSelected).toBeFalsy();
      expect(layersReasult["layer3"].isSelected).toBeFalsy();
    });

    it("source should be unSelected", () => {
      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      layersReasult = sourceResult.layers;

      expect(sourceResult.sourceData.isSelected).toBeFalsy();
    });

    it("numSelectedLayers in source should be 0", () => {
      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      layersReasult = sourceResult.layers;

      expect(layersReasult.numSelectedLayers).toBe(0);
    });

    it("onAllSources method should be called with false", () => {
      onAllSources = jasmine.createSpy("onAllSources", () => {});
      driver.when.created().and.clickOnSelectAllButton();
      expect(onAllSources).toHaveBeenCalledWith(false);
      expect(onAllSources).toHaveBeenCalledTimes(1);
    });

    it("source already unSelected - sould stay unSelected", () => {
      sources["source1"].sourceData.isSelected = false;
      driver.get.controller().sources = sources;
      driver.when.clickOnSelectAllButton();
      sourceResult = driver.get.controller().sources["source1"];
      expect(sourceResult.sourceData.isSelected).toBeFalsy();
    });
  });

  describe("on Select Single Layer", () => {
    beforeEach(() => {
      sources = objectUtils.getSource();
    });

    describe("source has limited num selected layers", () => {
      beforeEach(() => {
        sources["source1"].maxSelectedLayers = 2;
        sources["source1"].canSelectAll = false;
      });

      describe("num selected layers is smaller then max selected layers", () => {
        beforeEach(() => {
          sources["source1"].numSelectedLayers = 0;
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          let selectedSource = sources["source1"];
          let selectedLayerId = "layer1";

          driver.get
            .controller()
            .onSingleLayerSelected(selectedSource, selectedLayerId);

          driver.when.created();
        });

        it("layer should be selected", () => {
          expect(sources["source1"].layers["layer1"].isSelected).toBeTruthy();
        });
        it("num selected layers should be 1", () => {
          expect(sources["source1"].numSelectedLayers).toBe(1);
        });
        it("no layers should be disabled", () => {
          expect(sources["source1"].layers["layer2"].isDisabled).toBeFalsy();
          expect(sources["source1"].layers["layer3"].isDisabled).toBeFalsy();
        });
        it("source should be unselected", () => {
          expect(sources["source1"].sourceData.isSelected).toBeFalsy();
        });
      });

      describe("num selected layers is greater then max selected layers", () => {
        beforeEach(() => {
          sources["source1"].numSelectedLayers = 2;
          sources["source1"].layers["layer1"].isSelected = true;
          sources["source1"].layers["layer2"].isSelected = true;
          sources["source1"].layers["layer3"].isSelected = false;

          driver.when.created();
        });
        it("last layer should be disabled", () => {
          expect(sources["source1"].layers["layer3"].isDisabled).toBeFalsy();
        });

        it("source should be selected", () => {
          expect(sources["source1"].sourceData.isSelected).toBeTruthy();
        });
      });

      describe("num selected layers is equal to max selected layers", () => {
        beforeEach(() => {
          sources["source1"].numSelectedLayers = 1;
          sources["source1"].layers["layer1"].isSelected = true;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          let selectedSource = sources["source1"];
          let selectedLayerId = "layer2";

          driver.get
            .controller()
            .onSingleLayerSelected(selectedSource, selectedLayerId);

          driver.when.created();
        });

        it("layer should be selected", () => {
          expect(sources["source1"].layers["layer2"].isSelected).toBeTruthy();
        });
        it("num selected layers should be 2", () => {
          expect(sources["source1"].numSelectedLayers).toBe(2);
        });
        it("last layer should be disabled", () => {
          expect(sources["source1"].layers["layer3"].isDisabled).toBeTruthy();
        });
        it("source should be selected", () => {
          expect(sources["source1"].sourceData.isSelected).toBeTruthy();
        });
      });
    });

    describe("can select all layers in source", () => {
      beforeEach(() => {
        sources["source1"].canSelectAll = true;
      });

      describe("num selected layers is smaller then num layers", () => {
        beforeEach(() => {
          sources["source1"].numSelectedLayers = 0;
          sources["source1"].layers["layer1"].isSelected = false;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = false;

          let selectedSource = sources["source1"];
          let selectedLayerId = "layer1";

          driver.get
            .controller()
            .onSingleLayerSelected(selectedSource, selectedLayerId);

          driver.when.created();
        });

        it("layer should be selected", () => {
          expect(sources["source1"].layers["layer1"].isSelected).toBeTruthy();
        });
        it("num selected layers should be 1", () => {
          expect(sources["source1"].numSelectedLayers).toBe(1);
        });
        it("no layers should be disabled", () => {
          expect(sources["source1"].layers["layer2"].isDisabled).toBeFalsy();
          expect(sources["source1"].layers["layer3"].isDisabled).toBeFalsy();
        });
        it("source should be unselected", () => {
          expect(sources["source1"].sourceData.isSelected).toBeFalsy();
        });
      });

      describe("num selected layers is equal to num layers", () => {
        beforeEach(() => {
          sources["source1"].numSelectedLayers = 2;
          sources["source1"].layers["layer1"].isSelected = true;
          sources["source1"].layers["layer2"].isSelected = true;
          sources["source1"].layers["layer3"].isSelected = false;

          let selectedSource = sources["source1"];
          let selectedLayerId = "layer3";

          driver.get
            .controller()
            .onSingleLayerSelected(selectedSource, selectedLayerId);

          driver.when.created();
        });

        it("layer should be selected", () => {
          expect(sources["source1"].layers["layer3"].isSelected).toBeTruthy();
        });
        it("num selected layers should be 3", () => {
          expect(sources["source1"].numSelectedLayers).toBe(3);
        });

        it("source should be selected", () => {
          expect(sources["source1"].sourceData.isSelected).toBeTruthy();
        });
      });
    });
  });

  describe("on UnSelect Single Layer", () => {
    beforeEach(() => {
      sources = objectUtils.getSource();
    });

    describe("source has limited num selected layers", () => {
      beforeEach(() => {
        sources["source1"].maxSelectedLayers = 2;
        sources["source1"].canSelectAll = false;
        sources["source1"].sourceData.isSelected = true;
        sources["source1"].layers = objectUtils.getLayers();

        sources["source1"].layers["layer1"].isSelected = true;
        sources["source1"].layers["layer2"].isSelected = true;
        sources["source1"].layers["layer3"].isSelected = false;
        sources["source1"].layers["layer3"].isDisabled = true;

        const unSelectedLayerId = "layer1";
        let selectedSource = sources["source1"];
        driver.get.controller().sources = sources;
        driver.get
          .controller()
          .onSingleLayerUnSelected(selectedSource, unSelectedLayerId);
        driver.when.created();
      });

      it("layer should be unselected", () => {
        expect(sources["source1"].layers["layer1"].isSelected).toBeFalsy();
      });

      it("source num selected layers should be 1", () => {
        expect(sources["source1"].numSelectedLayers).toBe(1);
      });

      it("source should be unselected ", () => {
        expect(sources["source1"].sourceData.isSelected).toBeFalsy();
      });

      it("layers should be not disabled", () => {
        expect(sources["source1"].layers["layer3"].isDisabled).toBeFalsy();
      });
    });

    describe("can select all layers in source", () => {
      beforeEach(() => {
        sources["source1"].canSelectAll = true;
        sources["source1"].sourceData.isSelected = true;
        sources["source1"].layers = objectUtils.getLayers();

        sources["source1"].layers["layer1"].isSelected = true;
        sources["source1"].layers["layer2"].isSelected = true;
        sources["source1"].layers["layer3"].isSelected = true;

        const unSelectedLayerId = "layer1";
        let selectedSource = sources["source1"];
        driver.get.controller().sources = sources;
        driver.get
          .controller()
          .onSingleLayerUnSelected(selectedSource, unSelectedLayerId);
        driver.when.created();
      });

      it("layer should be unselected", () => {
        expect(sources["source1"].layers["layer1"].isSelected).toBeFalsy();
      });

      it("source num selected layers should be 2", () => {
        expect(sources["source1"].numSelectedLayers).toBeFalsy(2);
      });

      it("source should be unselected", () => {
        expect(sources["source1"].sourceData.isSelected).toBeFalsy();
      });

      it("layers should be not disabled", () => {
        expect(sources["source1"].layers["layer1"].isDisabled).toBeFalsy();
      });
    });
  });

  describe("dynamic content", () => {
    // ToDo: check if creating chiled comp properly...
  });

  describe("dialog actions", () => {
    describe("on save clicked", () => {
      let sourceResult;
      let layersReasult;

      beforeEach(() => {
        sources = objectUtils.getSource();
        sources["source1"].layers = objectUtils.getLayers();
      });

      describe("all source selected", () => {
        it("source has limited num selected layers", () => {
          sources["source1"].canSelectAll = false;
          sources["source1"].maxSelectedLayers = 2;
          sources["source1"].sourceData.isSelected = true;

          sources["source1"].layers["layer1"].isSelected = true;
          sources["source1"].layers["layer2"].isSelected = false;
          sources["source1"].layers["layer3"].isSelected = true;

          driver.when.created();
          let actual = driver.get.controller().getUserFinelSelection();
          let expected = {
            source1: {
              isAllSelected: false,
              layersIds: ["layer1", "layer3"],
            },
          };
          expect(actual).toBe(expected);
        });

        it("can select all layers in source", () => {
          sources["source1"].canSelectAll = true;
          sources["source1"].sourceData.isSelected = true;

          driver.when.created();
          let actual = driver.get.controller().getUserFinelSelection();
          let expected = { sourceid: { isAllSelected: true } };
          expect(actual).toBe(expected);
        });
      });

      describe("source has few selected layers", () => {
        sources["source1"].canSelectAll = true;
        sources["source1"].sourceData.isSelected = true;

        sources["source1"].layers["layer1"].isSelected = true;
        sources["source1"].layers["layer2"].isSelected = false;
        sources["source1"].layers["layer3"].isSelected = true;

        driver.when.created();
        let actual = driver.get.controller().getUserFinelSelection();
        let expected = {
          source1: {
            isAllSelected: false,
            layersIds: ["layer1", "layer3"],
          },
        };
        expect(actual).toBe(expected);
      });

      describe("source has no selected layers", () => {
        sources["source1"].canSelectAll = true;
        sources["source1"].sourceData.isSelected = true;

        sources["source1"].layers["layer1"].isSelected = false;
        sources["source1"].layers["layer2"].isSelected = false;
        sources["source1"].layers["layer3"].isSelected = false;

        driver.when.created();
        let actual = driver.get.controller().getUserFinelSelection();
        let expected = {};
        expect(actual).toBe(expected);
      });

      it("should close dialog", () => {
        let closeDialog = jasmine.createSpy("closeDialog", () => {});
        driver.when.created().and.clickOnSelectAllButton();
        expect(closeDialog).toHaveBeenCalledTimes(1);
      });

      it("should send user selection to server", () => {});

      it("onSave method should be called", () => {
        let onSave = jasmine.createSpy("onSave", () => {});
        driver.when.created().and.clickOnSelectAllButton();
        expect(onSave).toHaveBeenCalledTimes(1);
      });
    });

    describe("on close cliked", () => {
      it("closeDialog method should be called", () => {
        let closeDialog = jasmine.createSpy("closeDialog", () => {});
        driver.when.created().and.clickOnSelectAllButton();
        expect(closeDialog).toHaveBeenCalledTimes(1);
      });
    });
  });

  beforeEach(() => {});

  describe("", () => {});

  it("", () => {});
});
