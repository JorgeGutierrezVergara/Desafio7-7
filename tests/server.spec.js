const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200 -- Test /GET", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  it("Obteniendo un 404 -- Test /DELETE", async () => {
    const id = Math.floor(Math.random() * 999);
    const jwt = "token";
    const response = await request(server)
      .delete(`/cafes/${id}`)
      .set("Authorization", jwt)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });
  it("Obteniendo un 201 -- Test /POST", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "nuevoCafe" };
    const response = await request(server).post("/cafes").send(cafe);
    const status = response.status;
    expect(status).toBe(201);
    const cafes = response.body;
    expect(cafes).toContainEqual(cafe);
  });
  it("Obteniendo un 400 -- Test /PUT", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id: id + 1, nombre: "nuevoCafe" };
    const response = await request(server).put(`/cafes/${id}`).send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
