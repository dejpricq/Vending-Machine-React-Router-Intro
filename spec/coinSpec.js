import { Coin } from "../src/scripts/coin";

describe("Coin", function() {
    var nickel;
    var penny;

    beforeEach(function() {
        nickel  = new Coin({name: "nickel"});
        penny   = new Coin({name: "penny"}); 
    });

    describe("name", function() {
        it("has a name", function() {
            expect(nickel.name).toEqual("nickel");
        });
    });

    describe("size", function () {
        it("has a size", function() {
            expect(nickel.size).toEqual(6);
        });
    });

    describe("weight", function() {
        it("has a weight", function() {
            expect(nickel.weight).toEqual(630);
        });
    
        it("a penny weighs 554", function(){
            expect(penny.weight).toEqual(554);
        });
    });
});