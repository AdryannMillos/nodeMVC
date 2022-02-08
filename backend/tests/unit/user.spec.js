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
        .send(
          expect.objectContaining({
            message: "Not Found this user",
          })
        );
    });
  });

// describe("Post create an user --> /api/v1/register/user", () => {
//   const user = User.create({
//     firstname: "adryann",
//     lastname: "freitas",
//     email: "luluzinha123@12345.com",
//     password: "123456",
//   });
//   const deleteUser = User.destroy({where: {email: user.email}});
//   it("Create an user", async () => {
//     return await request(app)
//       .post("/api/v1/user/register")
//       .send(
//         user
//       )
//       .expect(201)
//       .then((response) => {
//         expect(response.body).toEqual(
//           expect.objectContaining({
//             message: "Success registered",
//           })
//         );
//         deleteUser
//       });
//       ;
//   });
// });

// it("GET /api/v1/user/:id --> get an specific user", async () => {
// return await request(app)
//   .get("/api/v1/user/:id")
//   .expect("Content-Type", /json/)
//   .expect(200)
//   .then((response) => {
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         firstname: expect.any(String),
//         lastname: expect.any(String),
//         email: expect.any(String),
//         password: expect.any(String),
//       })
//     );
//   });
// });
// it("GET /api/v1/user/:id --> 404 if not found", () => {});
// it("POST /api/v1/user/register --> create an user", async () => {
// return await request(app)
//   .post("/api/v1/user/register")
//   .send({
//     firstname: "adryann",
//     lastname: "freitas",
//     email: "lulu@123.com",
//     password: "123456",
//   })
//   .expect("Content-Type", /json/)
//   .expect(201)
//   .then((response) => {
//     expect(response.body).toEqual(
//       expect.objectContaining({
//        message: "Success registered",
//       })
//     );
//   });
// });
// it("GET /api/v1/user/:id --> validates request body", () => {});
