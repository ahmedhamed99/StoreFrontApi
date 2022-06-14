import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

var token: string;

describe("Test orders endpoints", () => {
    beforeAll(async () => {
        const response = await request.post('/users').send({ firstName: "ahmed", lastName: "hamed", username: "ahmed", password: "ahmed" });
        token = response.body;
    });
    const order = { status: "open", user_id: "1"};
    it("test response for '/orders' POST", async (done) => {
        const response = await request.post('/orders').send(order).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...order
        });
        done();
    });

    it("test response for '/orders' GET", async (done) => {
        const response = await request.get('/orders').set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([{
            id: 1,
            ...order
        }]);
        done();
    });

    it("test response for '/orders/:id' GET", async (done) => {
        const response = await request.get(`/orders/1`).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...order
        });
        done();
    });

    it("test response for '/orders/:id' DELETE", async (done) => {
        const response = await request.delete(`/orders/1`).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...order
        });
        done();
    });
    afterAll(async () => {
        await request.delete('/users/1').set('Authorization', 'Bearer ' + token);
    });
});

