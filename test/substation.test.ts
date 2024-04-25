import supertest from "supertest";
import { web } from "../src/application/web";
import { SubstationTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/substations", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await SubstationTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new substation", async () => {
    const response = await supertest(web)
      .post("/api/substations")
      .set("X-API-TOKEN", "test")
      .send({
        name: "Ploso",
        address: "Jalan Raya Tembelang",
        contact: "085123456789",
        ip_address: "10.1.0.1",
        dcc: "Barat",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe("Ploso");
    expect(response.body.data.address).toBe("Jalan Raya Tembelang");
    expect(response.body.data.contact).toBe("085123456789");
    expect(response.body.data.ip_address).toBe("10.1.0.1");
    expect(response.body.data.dcc).toBe("Barat");
  });

  it("should reject create new substation if data is invalid", async () => {
    const response = await supertest(web)
      .post("/api/substations")
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        address: "",
        contact: "085123456789",
        ip_address: "10.1.0.1",
        dcc: "Barat",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/substations/:substationId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await SubstationTest.create();
  });

  afterEach(async () => {
    await SubstationTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get substation", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .get(`/api/substations/${substation.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe(substation.name);
    expect(response.body.data.address).toBe(substation.address);
    expect(response.body.data.contact).toBe(substation.contact);
    expect(response.body.data.ip_address).toBe(substation.ip_address);
    expect(response.body.data.dcc).toBe(substation.dcc);
  });

  it("should reject get substation if substation is not found", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .get(`/api/substations/${substation.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/substations/:substationId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await SubstationTest.create();
  });

  afterEach(async () => {
    await SubstationTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update substation", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .put(`/api/substations/${substation.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "Ploso",
        address: "Jalan Raya Kedung",
        contact: "08511111111",
        ip_address: "10.1.0.2",
        dcc: "Timur",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(substation.id);
    expect(response.body.data.name).toBe("Ploso");
    expect(response.body.data.address).toBe("Jalan Raya Kedung");
    expect(response.body.data.contact).toBe("08511111111");
    expect(response.body.data.ip_address).toBe("10.1.0.2");
    expect(response.body.data.dcc).toBe("Timur");
  });

  it("should reject update substation if request is invalid", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .put(`/api/substations/${substation.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        address: "",
        contact: "08511111111",
        ip_address: "10.1.0.2",
        dcc: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/substations/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await SubstationTest.create();
  });

  afterEach(async () => {
    await SubstationTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to remove substation", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .delete(`/api/substations/${substation.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject remove substation if substation is not found", async () => {
    const substation = await SubstationTest.get();
    const response = await supertest(web)
      .delete(`/api/substations/${substation.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/substations", () => {
  beforeEach(async () => {
    await UserTest.create();
    await SubstationTest.create();
  });

  afterEach(async () => {
    await SubstationTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search substation", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation using name", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        name: "Pl",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation using address", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        address: "Raya",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation using contact", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        contact: "08",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation using ip_address", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        ip_address: "10",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation using dcc", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        dcc: "Barat",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation no result", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        name: "salah",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search substation with paging", async () => {
    const response = await supertest(web)
      .get("/api/substations")
      .query({
        page: 2,
        size: 1,
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
});
