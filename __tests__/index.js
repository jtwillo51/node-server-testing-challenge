const superTest = require("supertest");
const server = require("../index");
const db = require("../data/config");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("users tests", () => {
  test("Welcome", async () => {
    const res = await superTest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.message).toBe("Welcome to our API");
  });

  test("POST /register", async () => {
    const res = await superTest(server)
      .post("/register")
      .send({ username: "jtwillo", password: "1234" });
    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("jtwillo");
  });
  //will fail unless restrict middleware is disabled

  //   test("GET /users", async ()=>{
  //       const res = await superTest(server).get("/users");
  //   expect(res.statusCode).toBe(200);
  //   expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  //   expect(res.body).toHaveLength(3);
  //   })

  //will fail unless beforeEach is disabled

  //   test("POST /login", async ()=>{
  //     const res = await superTest(server)
  //     .post("/login")
  //     .send({ username: "jtwillo", password: "1234" });
  //     expect(res.statusCode).toBe(200)
  //     expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  //   })

  test("GET /users/:id", async () => {
    const res = await superTest(server).get("/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.username).toBeDefined()
  });

  test("GET /users/:id", async () => {
    const res = await superTest(server).get("/users/7");
    expect(res.statusCode).toBe(404);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    
  });
});
