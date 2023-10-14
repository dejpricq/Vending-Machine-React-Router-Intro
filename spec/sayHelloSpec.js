import * as sayHello from "../src/scripts/sayHello.js";

describe("Greet", function(){
    it("concats Hello and a name", function() { 
        var actual = sayHello.greet("World"); 
        var expected = "Hello, World"; 
        expect(actual).toEqual(expected);
    });
});