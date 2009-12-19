var Jison = require("../setup").Jison,
    Lexer = require("../setup").Lexer,
    assert = require("assert");

var lexData = {
    rules: [
       ["x", "return 'x';"],
       ["y", "return 'y';"]
    ]
};

exports["test tokens as a string"] = function () {

    var grammar = {
        tokens: "x y",
        startSymbol: "A",
        bnf: {
            "A" :[ 'A x',
                   'A y',
                   ''      ]
        }
    };

    var parser = new Jison.Parser(grammar);
    parser.lexer = new Lexer(lexData);
    assert.ok(parser.parse('xyx'), "parse xyx");
};

exports["test extra spaces in productions"] = function () {

    var grammar = {
        tokens: "x y",
        startSymbol: "A",
        bnf: {
            "A" :[ 'A x ',
                   'A y',
                   ''      ]
        }
    };

    var parser = new Jison.Parser(grammar);
    parser.lexer = new Lexer(lexData);
    assert.ok(parser.parse('xyx'), "parse xyx");
};

exports["test | seperated rules"] = function () {

    var grammar = {
        tokens: "x y",
        startSymbol: "A",
        bnf: {
            "A" :"A x | A y | "
        }
    };

    var parser = new Jison.Parser(grammar);
    parser.lexer = new Lexer(lexData);
    assert.ok(parser.parse('xyx'), "parse xyx");
};

exports["test start symbol optional"] = function () {

    var grammar = {
        tokens: "x y",
        bnf: {
            "A" :"A x | A y | "
        }
    };

    var parser = new Jison.Parser(grammar);
    var ok = true;
    assert.ok(ok, "no error");
};

exports["test start symbol should be nonterminal"] = function () {

    var grammar = {
        tokens: "x y",
        startSymbol: "x",
        bnf: {
            "A" :"A x | A y | "
        }
    };

    assert.throws(function(){new Jison.Parser(grammar);}, "throws error");
};

exports["test token list as string"] = function () {

    var grammar = {
        tokens: "x y",
        startSymbol: "A",
        bnf: {
            "A" :"A x | A y | "
        }
    };

    var parser = new Jison.Parser(grammar);
    assert.deepEqual(parser.terminals, ["$end", "x", "y"]);
};
