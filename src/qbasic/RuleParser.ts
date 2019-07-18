import { RuleSet } from "./RuleSet";
import { EarleyParser } from "./EarleyParser";


/**
    Copyright 2010 Steve Hanov

    This file is part of qb.js

    qb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with qb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
//#include <RuleSet.js>
// --------------------------------------------------------------------------
// The ruleparser uses the parser to parse your rules from a string 
// into a RuleSet. It extends the grammar to handle *, +, ?, and | operators 
// in the grammar.
// --------------------------------------------------------------------------
/** @constructor */
export class RuleParser {
    // a unique number to let us make up rule names.
    nextRuleId = 0;

    // The buildset is the rules that we are building.
    buildSet = new RuleSet();

    action: () => void;
    parser: EarleyParser;
    constructor() {
        // The rules are the grammar of the rules themselves.
        var rules = new RuleSet();

        // Lets us access this from local functions inside this function.
        var self = this;

        rules.addRule("start", ["rule"]);
        rules.addRule("identifier", ["'[A-Za-z0-9_]+'"]);
        rules.addRule("terminal", ["''([^'\\\\]|\\\\.)*''"]);
        rules.addRule("expr", ["or_expr"]);
        rules.addRule("rule", ["identifier", "':'", "expr"],
            function (args: [string, string, string[]]) {
                self.buildSet.addRule(args[0], args[2], self.action);
                return args[0];
            });
        rules.addRule("rule", ["identifier", "':'"],
            function (args: string[]) {
                self.buildSet.addRule(args[0], [], self.action);
                return args[0];
            });
        rules.addRule("or_expr", ["or_expr", "'\\|'", "cat_expr"],
            function (args: [string[], string, string[]]) {
                // Implement the or operator by making two new rules.
                var name = "_" + self.nextRuleId++;
                self.buildSet.addRule(name, args[0]);
                self.buildSet.addRule(name, args[2]);
                return [name];
            });
        rules.addRule("or_expr", ["cat_expr"]);
        rules.addRule("cat_expr", ["cat_expr", "list_expr"],
            function (args: [string[], string]) {
                args[0].push(args[1]);
                return args[0];
            });
        rules.addRule("cat_expr", ["list_expr"],
            function (args: string[]) {
                return [args[0]];
            });

        rules.addRule("list_expr", ["kleene_expr"]);
        rules.addRule("list_expr", ["'\\['", "kleene_expr", "','", "kleene_expr", "'\\]'"],
            function (args: string[]) {
                var nameOpt = "_" + self.nextRuleId++;
                var name = "_" + self.nextRuleId++;

                self.buildSet.addRule(nameOpt, [name]);

                self.buildSet.addRule(nameOpt, [],
                    function (_args: string[]): any {
                        return [];
                    });

                self.buildSet.addRule(name, [args[1]],
                    function (args: string[]) {
                        return args; // list of one element.
                    });

                self.buildSet.addRule(name, [name, args[3], args[1]],
                    function (args: [string[], string, string]) {
                        // join the lists and return the result.
                        args[0].push(args[2]);
                        return args[0];
                    });

                return nameOpt;
            });

        rules.addRule("kleene_expr", ["basic_expr", "'[\\+\\*\\?]'"],
            function (args: string[]) {
                var name = "_" + self.nextRuleId++;

                // Simulates kleene-star operations by adding more rules.
                if (args[1] == '*') {

                    self.buildSet.addRule(name, [name, args[0]], function (args: [string[], string]) {
                        args[0].push(args[1]);
                        return args[0];
                    });
                    self.buildSet.addRule(name, [], function (_args: string[]): any {
                        return [];
                    });

                } else if (args[1] == '?') {

                    self.buildSet.addRule(name, [args[0]]);
                    self.buildSet.addRule(name, [],
                        function (args: string[]): any {
                            return null;
                        });

                } else if (args[1] == '+') {

                    var name2 = "_" + self.nextRuleId++;
                    self.buildSet.addRule(name, [name2, args[0]]);
                    self.buildSet.addRule(name2, [name2, args[0]]);
                    self.buildSet.addRule(name2, []);
                }

                return name;
            });
        rules.addRule("kleene_expr", ["basic_expr"]);
        rules.addRule("basic_expr", ["identifier"]);
        rules.addRule("basic_expr", ["'\\('", "expr", "'\\)'"],
            function (args: any) {
                var name = "_" + self.nextRuleId++;
                self.buildSet.addRule(name, args[1]);
                return name;
            });

        rules.addRule("basic_expr", ["terminal"]);

        rules.finalize();
        //dbg.printf("%s", rules);

        this.parser = new EarleyParser(rules);
    }



    // ----------------------------------------------------------------------
    // Add a token to the rules. See RuleSet.addToken().
    // ----------------------------------------------------------------------
    addToken(name: string, re: string) {
        this.buildSet.addToken(name, re);
    }

    // ----------------------------------------------------------------------
    // Add a rule to the grammar. The rule will be parsed and can include
    // regular-expression-like syntax.
    // ----------------------------------------------------------------------
    addRule(str: string, action?: any) {
        this.action = action;
        this.parser.parse(str);
    }
}