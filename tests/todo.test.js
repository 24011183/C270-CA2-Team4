const request = require("supertest");
const app = require("../index");

describe("To-Do List API", () => {
  it("should create a new to-do", async () => {
    const res = await request(app).post("/todos").send({ title: "Buy milk" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Buy milk");
  });

  it("should fetch all to-dos", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should update a to-do", async () => {
    await request(app).post("/todos").send({ title: "Do laundry" });
    const res = await request(app).put("/todos/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("completed", true);
  });

  it("should delete a to-do", async () => {
    await request(app).post("/todos").send({ title: "Clean room" });
    const res = await request(app).delete("/todos/3");
    expect(res.statusCode).toEqual(204);
  });
});