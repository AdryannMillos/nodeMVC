const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");

describe("Get all users --> /api/v1/users", () => {
  const usersFound = User.findAll();
  it("Gets an array of users", async () => {
    await usersFound;
    if (usersFound.length > 0) {
      return await request(app)
        .get("/api/v1/users")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect.arrayContaining([
          expect.objectContaining({
            firstname: expect.any(String),
            lastname: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          }),
        ]);
    }
  });
  it("Did not found any user", async () => {
    await usersFound;
    if (usersFound.length < 0) {
      return await request(app).get("/api/v1/users").expect(404);
    }
  });
}),
  describe("GET an specific user --> /api/v1/user/:id", () => {
    it("Found the specific user --> /api/v1/user/1", async () => {
      const user = await User.findOne({ where: { id: 4 } });
      return await request(app)
        .get("/api/v1/user/4")
        .expect("Content-Type", /json/)
        .expect(200)
        .send(
          expect.objectContaining({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
          })
        );
    });
    it("Do not found the specific user --> /api/v1/user/9999990", async () => {
      return await request(app)
        .get("/api/v1/user/9999990")
        .expect(404)
        // .expect(request).toEqual(
        //   expect.objectContaining({
        //      message: "",
        //   })
        // );
    });
  });

describe("Post create an user --> /api/v1/register/user", () => {
  it("Create an user", async () => {
    return await request(app)
      .post("/api/v1/user/register")
      .send({
        firstname: "João",
        lastname: "freitas",
        email: "luluzinha123@1234567.com",
        password: "123456",
      })
      .expect(201);
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "luluzinha123@1234567.com" } });
  });
});
describe("Delete, Delete an specific user --> /api/v1/user/:id/delete", () => {
  beforeAll(async () => {
    return await User.create({
      firstname: "João",
      lastname: "freitas",
      email: "luluzinha123@1234567890.com",
      password: "123456",
    })});
  it("Delete an user", async () => {
    const foundUser = await User.findOne({ where: {email: "luluzinha123@1234567890.com"}})
    const userId = foundUser.id
    return await request(app)
      .delete(`/api/v1/user/${userId}/delete`)
      .expect(200)
      // .expect((request(app)).toEqual(
      //   expect.objectContaining({
      //          message: 'User deleted successfully',
      //       })
      // ));
  });
  it("Delete an user", async () => {
    return await request(app)
    .delete(`/api/v1/user/90009090/delete`)
    .expect(404)
})
});
