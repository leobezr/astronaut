import Scene from "./scene";

describe("Testing scene", () => {
    it("Should create a new layer", () => {
        const game = new Scene("game");
        
        game.createLayer("spaceDust")
    })
})