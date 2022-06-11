import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

var token: string;

describe("Test users endpoints", () => {

    const user = { firstName: "ahmed", lastName: "hamed", username: "ahmed", password: "ahmed" }
    it("test response for '/users' POST", async (done) => {
        const response = await request.post('/users').send(user);
        token = response.body;
        expect(response.status).toEqual(200);
        done();
    });

    it("test response for '/users/authenticate' POST", async (done) => {
        const response = await request.post('/users/authenticate').send(user);
        expect(response.status).toEqual(200);
        done();
    });

    it("test response for '/users' GET", async (done) => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([{
            id: 2,
            firstname: "ahmed",
            lastname: "hamed",
            username: "ahmed"
        }]);
        done();
    });

    it("test response for '/users:id' GET", async (done) => {
        const response = await request.get(`/users/2`).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 2,
            firstname: "ahmed",
            lastname: "hamed",
            username: "ahmed"
        });
        done();
    });

    it("test response for '/users:id' DELETE", async (done) => {
        const response = await request.delete(`/users/2`).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 2,
            firstname: "ahmed",
            lastname: "hamed",
            username: "ahmed"
        });
        done();
    });

});