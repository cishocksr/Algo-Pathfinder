import { cn } from "./utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("filters falsy inputs", () => {
    expect(cn("base", false, null, undefined, "extra")).toBe("base extra");
  });

  it("returns empty string when given no classes", () => {
    expect(cn()).toBe("");
  });
});
