import { Order, OrderStore } from "../order";
import { UserStore } from "../user";

const store = new OrderStore();

var id: string;

describe("order Model Tests",()=>{
    beforeAll(async()=>{
        const userStore = new UserStore();
        const user = await userStore.create({username:"hamed",password:"ahmed"});
        id = user.id as string;
    })
    it("expects index method to be defined",()=>{
        expect(store.index).toBeDefined();
    });
    it("expects show method to be defined",()=>{
        expect(store.show).toBeDefined();
    });
    it("expects create method to be defined",()=>{
        expect(store.create).toBeDefined();
    });
    it("expects addProduct method to be defined",()=>{
        expect(store.addProduct).toBeDefined();
    });
    it("create method should create new order",async()=>{
        const order: Order = {
            status: "open",
            user_id: id
        };
        
        const createdOrder = await store.create(order) as unknown;

        expect(createdOrder).toEqual({
            id: 2,
            status: "open",
            user_id: `${id}`
        });
    });
    it("index method should show all orders",async()=>{
        const orders = await store.index() as unknown;
        expect(orders).toEqual([{
            id: 2,
            status: "open",
            user_id: `${id}`
        }]);
    });
    it("show method should show specified order",async()=>{
        const order = await store.show('2') as unknown;
        expect(order).toEqual({
            id: 2,
            status: "open",
            user_id: `${id}`
        });
    });
    
    it("delete method should delete specified order",async()=>{
        const order = await store.delete('2') as unknown;
        expect(order).toEqual({
            id: 2,
            status: "open",
            user_id: `${id}`
        });
    });
    
    afterAll(async()=>{
        const userStore = new UserStore();
        await userStore.delete(id);
    });
});
