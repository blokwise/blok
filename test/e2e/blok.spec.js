import { setupTest, createPage } from "@nuxt/test-utils";

describe("Blok", () => {
  setupTest({
    browser: true,
  });

  it("loads bloks dynamically", async () => {
    const page = await createPage("/");
    const html = await page.innerHTML("body");

    expect(html).toContain("This is totally foo!");
    expect(html).toContain("This is a bar");
    expect(html).toContain("This bar is somewhat different");
    expect(html).toContain("Another bar hanging with the cool kids");
  });

  // it("handles slots correctly", async () => {
  //   const page = await createPage("/slots");
  //   const html = await page.innerHTML("body");

  //   expect(html).toContain("<div>page</div>");
  //   expect(html).toContain("<div>article</div>");
  // });
});
