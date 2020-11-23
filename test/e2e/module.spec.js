import { setupTest, expectModuleToBeCalledWith } from "@nuxt/test-utils";

describe("Module", () => {
  setupTest({
    server: true,
  });

  it("injects module @blokwise/dynamic", () => {
    expectModuleToBeCalledWith("requireModule", "@blokwise/dynamic", {
      withConsole: true,
    });
  });
});
