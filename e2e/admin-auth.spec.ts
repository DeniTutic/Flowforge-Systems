import { test, expect } from "@playwright/test";

// Done/Delete are Server Actions, reachable only as POST /admin. They must be gated by the
// same Basic Auth as the page — authorization must never depend on the client.
test.describe("admin access control", () => {
  test("page requires credentials", async ({ request }) => {
    const res = await request.get("/admin");
    expect(res.status()).toBe(401);
  });

  test("server actions require credentials", async ({ request }) => {
    const res = await request.post("/admin", {
      headers: {
        "Next-Action": "0000000000000000000000000000000000000000",
        "Content-Type": "text/plain;charset=UTF-8",
      },
      data: '["aaaaaaaaaaaaaaaaaaaaaaaa"]',
    });
    expect(res.status()).toBe(401);
  });
});
