import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

var token: string;

describe("Test products endpoints", () => {
    beforeAll(async () => {
        const response = await request.post('/users').send({ firstName: "ahmed", lastName: "hamed", username: "ahmed", password: "ahmed" });
        token = response.body;
    });
    const product = { name: "test", price: 10, category: "test" };
    it("test response for '/products' POST", async (done) => {
        const response = await request.post('/products').send(product).set('Authorization', 'Bearer ' + token);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...product
        });
        done();
    });

    it("test response for '/products' GET", async (done) => {
        const response = await request.get('/products');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([{
            id: 1,
            ...product
        }]);
        done();
    });

    it("test response for '/products/:id' GET", async (done) => {
        const response = await request.get(`/products/1`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...product
        });
        done();
    });

    it("test response for '/products/:id' DELETE", async (done) => {
        const response = await request.delete(`/products/1`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: 1,
            ...product
        });
        done();
    });
    afterAll(async () => {
        await request.delete('/users/1').set('Authorization', 'Bearer ' + token);
    });
});

