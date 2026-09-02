/* Quick smoke test: boots the Express app (unconnected to Mongo) and
 * exercises routes that don't require a DB round-trip, to catch wiring
 * bugs (bad imports, broken middleware chains, route typos, etc.)
 * This does NOT replace real integration testing against a live MongoDB.
 */
import request from "supertest";
import app from "../src/app";

async function main() {
  let passed = 0;
  let failed = 0;

  function check(name: string, cond: boolean, detail?: string) {
    if (cond) {
      console.log(`  PASS - ${name}`);
      passed++;
    } else {
      console.log(`  FAIL - ${name}${detail ? " :: " + detail : ""}`);
      failed++;
    }
  }

  console.log("== Health check ==");
  const health = await request(app).get("/api/health");
  check("GET /api/health returns 200", health.status === 200);
  check("GET /api/health success:true", health.body.success === true);

  console.log("== 404 handling ==");
  const notFound = await request(app).get("/api/does-not-exist");
  check("Unknown route returns 404", notFound.status === 404);
  check("404 body has success:false", notFound.body.success === false);

  console.log("== Auth guard on protected routes ==");
  const noAuthBanners = await request(app).get("/api/banners");
  check("GET /api/banners without auth returns 401", noAuthBanners.status === 401);

  const noAuthDoctors = await request(app).get("/api/doctors");
  check("GET /api/doctors without auth returns 401", noAuthDoctors.status === 401);

  const noAuthSocial = await request(app).get("/api/social");
  check("GET /api/social without auth returns 401", noAuthSocial.status === 401);

  const noAuthSettings = await request(app).get("/api/settings");
  check("GET /api/settings without auth returns 401", noAuthSettings.status === 401);

  const noAuthAppointments = await request(app).get("/api/appointments");
  check("GET /api/appointments without auth returns 401", noAuthAppointments.status === 401);

  const noAuthEnquiries = await request(app).get("/api/enquiries");
  check("GET /api/enquiries without auth returns 401", noAuthEnquiries.status === 401);

  const noAuthDashboard = await request(app).get("/api/dashboard");
  check("GET /api/dashboard without auth returns 401", noAuthDashboard.status === 401);

  console.log("== Login input validation (no DB needed to fail fast) ==");
  const badLogin = await request(app).post("/api/auth/login").send({});
  check("POST /api/auth/login with empty body returns 400", badLogin.status === 400);

  console.log("== Public route shape (will fail at DB layer, that's OK here) ==");
  const publicBanners = await request(app).get("/api/public/banners");
  check(
    "GET /api/public/banners is routed (not 404)",
    publicBanners.status !== 404,
    `got ${publicBanners.status}`
  );

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(1);
});
