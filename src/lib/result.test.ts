import { describe, expect, it } from "vitest";

import { err, ok, type Result } from "./result";

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return err({ kind: "validation", message: "Cannot divide by zero" });
  }
  return ok(a / b);
}

describe("Result", () => {
  it("wraps a success value", () => {
    expect(divide(6, 3)).toEqual({ ok: true, value: 2 });
  });

  it("wraps an expected failure with a named kind", () => {
    const result = divide(1, 0);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.kind).toBe("validation");
    }
  });
});
