import { describe, expect, it } from "vitest";

import { site } from "./site";

describe("site", () => {
  it("has a name and a description", () => {
    expect(site.name.trim()).not.toBe("");
    expect(site.description.trim()).not.toBe("");
  });
});
