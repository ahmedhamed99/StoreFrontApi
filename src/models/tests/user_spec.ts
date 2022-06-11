import { User, UserStore } from "../user";

const store = new UserStore();

var id:string;

describe("User Model Tests",()=>{
    it("expects index method to be defined",()=>{
        expect(store.index).toBeDefined();
    });
    it("expects show method to be defined",()=>{
        expect(store.show).toBeDefined();
    });
    it("expects create method to be defined",()=>{
        expect(store.create).toBeDefined();
    });
    it("create method should create new user",async()=>{
        const user: User = {
            firstName: "Ahmed",
            lastName: "Hamed",
            username: "ahmed",
            password: "ahmed"
        };
        const newUser = await store.create(user) as unknown;
        id = (newUser as User).id as string;
        
        expect(newUser).toEqual({
            id: id,
            firstname: "Ahmed",
            lastname: "Hamed",
            username: "ahmed",
            password: (newUser as User).password
        });
    });
    it("index method should show all users",async()=>{
        const users = await store.index() as unknown;
        expect(users).toEqual([{
            id: id,
            firstname: "Ahmed",
            lastname: "Hamed",
            username: "ahmed"
        }])
    });
    it("show method should show specified user",async()=>{
        const user = await store.show(id) as unknown;
        expect(user).toEqual({
            id:id,
            firstname: "Ahmed",
            lastname: "Hamed",
            username: "ahmed"
        })
    });
    it("delete method should delete specified user",async()=>{
        const user = await store.delete(id) as unknown;
        expect(user).toEqual({
            id:id,
            firstname: "Ahmed",
            lastname: "Hamed",
            username: "ahmed"
        })
    });
});