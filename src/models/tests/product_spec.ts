import { Product, ProductStore } from "../product";

const store = new ProductStore();

var id: number;

describe("Product Model Tests",()=>{
    it("expects index method to be defined",()=>{
        expect(store.index).toBeDefined();
    });
    it("expects show method to be defined",()=>{
        expect(store.show).toBeDefined();
    });
    it("expects create method to be defined",()=>{
        expect(store.create).toBeDefined();
    });
    it("create method should create new product",async()=>{
        const product: Product = {
            name: "test",
            price: 10,
            category: "test"
        };
        
        const createdProduct = await store.create(product) as unknown;
        id = parseInt((createdProduct as Product).id as string);
        expect(createdProduct).toEqual({
            id: id,
            name: "test",
            price: 10,
            category: "test"
        });
    });
    it("index method should show all products",async()=>{
        const products = await store.index() as unknown;
        expect(products).toEqual([{
            id: id,
            name: "test",
            price: 10,
            category: "test"
        }]);
    });
    it("show method should show specified product",async()=>{
        const product = await store.show(id.toString()) as unknown;
        expect(product).toEqual({
            id: id,
            name: "test",
            price: 10,
            category: "test"
        });
    });
    it("delete method should delete specified product",async()=>{
        const product = await store.delete(id.toString()) as unknown;
        expect(product).toEqual({
            id: id,
            name: "test",
            price: 10,
            category: "test"
        });
    });
});
