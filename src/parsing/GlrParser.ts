import { IStringDictionary } from '../base/common/collections';
import { dbg, sprintf } from '../qb';
import { TreeNode, Location } from 'earley';

import { GlrReduceNode } from './GlrReduceNode';
import { GlrState } from './GlrState';
import { GlrShiftNode } from './GlrShiftNode';
import { GlrItem } from './GlrItem';
/** @constructor */
export class GlrParser {
  tokenizer: any;
  cached: IStringDictionary<GlrState> = {};
  errorState: any;
  startState: any;
  limit = 0;
  stackTops: GlrReduceNode[];
  nextTops: any;
  errors: string[];
  location: Location;
  debug: boolean;
  constructor(public ruleSet: any) {
    // this.ruleSet = ruleSet;
    this.tokenizer = this.ruleSet.createTokenizer();
    // this.cached = {};

    this.errorState = this.cache(new GlrState());

    // create initial Glr state.
    var state = new GlrState();
    this.addNonTerminalToState(state, '_start');
    this.startState = this.cache(state);

    // this.debug = true;
    // this.limit = 0;
  }

  parse(text: string) {
    this.tokenizer.setText(text);
    var token;
    var line = 0;
    var position = 0;
    var i;
    this.errors = [];

    this.stackTops = [new GlrReduceNode(new Location(0, 0), this.startState)];

    this.nextTops = [];

    for (;;) {
      token = this.tokenizer.nextToken(line, position);
      if (this.debug) {
        dbg.printf('Got token %s\n', token);
      }
      if (token === null) {
        this.errors.push(
          sprintf('Bad character at at %s:%s', line + 1, position + 1)
        );
        break;
      }

      this.location = token.location;

      for (i = 0; i < this.stackTops.length; i++) {
        this.reduceAll(this.stackTops[i], token);
      }

      for (i = 0; i < this.stackTops.length; i++) {
        this.shift(this.stackTops[i], token);
      }

      if (token === this.tokenizer.EOF_TOKEN) {
        for (i = 0; i < this.stackTops.length; i++) {
          this.reduceAll(this.stackTops[i], token);
        }
        break;
      }

      if (this.debug) {
        this.printStack(this.stackTops);
        this.printExpected(this.stackTops);
      }

      if (this.nextTops.length === 0) {
        this.errors.push(sprintf('Syntax error at %s: %s', token.locus, token));
        this.errors.push('Expected one of the following:');
        this.printExpected(this.stackTops);
        break;
      }

      this.stackTops = this.nextTops;
      this.nextTops = [];

      line = token.locus.line;
      position = token.locus.position + token.text.length;
    }

    for (i = 0; i < this.stackTops.length; i++) {
      if (this.stackTops[i].state.accept) {
        //dbg.printf("ACCEPT!\n");
        return this.stackTops[i].parents[0].evaluate();
      }
    }

    this.errors.push('Expected one of the following:');
    this.printExpected(this.stackTops);

    return null;
  }

  printExpected(tops: any) {
    for (var i = 0; i < tops.length; i++) {
      var state = tops[i].state;
      for (var key in state.items) {
        if (state.items.hasOwnProperty(key)) {
          var item = state.items[key];
          if (
            item.position < item.rule.symbols.length &&
            item.rule.symbols[item.position][0] == "'"
          ) {
            this.errors.push('    ' + item.rule.symbols[item.position]);
          }
        }
      }
    }
  }

  shift(node: any, symbol: any) {
    var nextState = this.computeNext(node.state, symbol.id);
    if (this.debug) {
      dbg.printf('Try to shift %s\n', symbol);
    }
    if (nextState) {
      var nextNode = this.findNode(this.nextTops, nextState);
      if (this.debug) {
        dbg.printf('Shift %s\n', symbol);
      }
      if (nextNode) {
        nextNode.addParent(node);
      } else {
        this.nextTops.push(
          new GlrShiftNode(this.location, nextState, [node], symbol.text)
        );
      }
    }
  }

  reduceAll(node: any, token: any) {
    node.processed = true;
    for (var i = 0; i < node.state.reductions.length; i++) {
      this.reduce(node, node.state.reductions[i], token);
    }
  }

  reduce(node: any, rule: any, token: any) {
    var inode;

    if (this.limit++ === 1000) {
      //var m = blah;
    }
    if (!(token.id in this.ruleSet.follow[rule.name])) {
      dbg.printf(
        'Skip reduction on %s due to follow set %s\n',
        rule.name,
        token
      );
      return;
    }
    if (node instanceof GlrReduceNode) {
      dbg.printf('Skip processing of reduce node.\n');
      return;
    }
    dbg.printf(
      'Trying to reduce node with state [%s] and %d parents\n',
      node.state.id,
      node.parents.length
    );
    var ancestors: any[] = [];
    this.ancestors(ancestors, node, rule.symbols.length);
    dbg.printf('    %s ancestors found\n', ancestors.length);
    for (var ai = 0; ai < ancestors.length; ai++) {
      var ancestor = ancestors[ai];
      dbg.printf('Process ancestor #%d.\n', ai);
      //dbg.printf("Ancestor is %s\n", ancestor);
      var nextState = this.computeNext(ancestor.state, rule.name);
      if (nextState === null) {
        continue;
      }
      var nextNode = this.findNode(this.stackTops, nextState);
      if (this.debug) {
        dbg.printf('Reduce by rule %s\n', rule);
      }
      if (nextNode === null) {
        var rnode = new GlrReduceNode(this.location, nextState);
        inode = rnode.getINode(rule, node);
        inode.addParent(ancestor);
        this.stackTops.push(rnode);
        if (this.debug) {
          dbg.printf(
            '    Connect state [%s] to [%s] via %s\n',
            ancestor.state.id,
            rnode.state.id,
            rule.name
          );
          dbg.printf('Recurse on new reduce node.\n');
        }
        this.reduceAll(inode, token);
      } else if (nextNode instanceof GlrReduceNode) {
        inode = nextNode.getINode(rule, node);
        dbg.printf(
          '    RN: Connect state [%s] to [%s] via %s\n',
          ancestor.state.id,
          nextNode.state.id,
          rule.name
        );
        if (inode.addParent(ancestor)) {
          if (this.debug) {
            dbg.printf('Recurse on processed reduce node.\n');
          }
          //this.reduce( nextNode, rule, token );
          this.reduceAll(inode, token);
        } else {
          dbg.printf('    RN: Node already existed. No change.\n');
          //if ( this.debug ) dbg.printf("Recurse on unprocessed reduce node.\n");
          //this.reduce( inode, rule, token );
        }
      } else {
        dbg.printf('Error! Tried to add already existing node.\n');
      }
    }
    dbg.printf('Returning.\n');
  }

  printStack(tops: any) {
    var str = '\nStack:\n';
    for (var i = 0; i < tops.length; i++) {
      str += '    ' + tops[i].toString() + '\n';
    }

    dbg.print(str);
  }

  ancestors(paths: any, v: any, k: any) {
    if (k === 0) {
      paths.push(v);
    } else {
      for (var i = 0; i < v.parents.length; i++) {
        this.ancestors(paths, v.parents[i], k - 1);
      }
    }
  }

  findNode(tops: any, state: any) {
    for (var i = 0; i < tops.length; i++) {
      if (tops[i].state === state) {
        return tops[i];
      }
    }
    return null;
  }

  addNonTerminalToState(state: any, ruleName: any) {
    // for each rule of that name, add it to the state at position 0.
    var rules = this.ruleSet.rules[ruleName];
    for (var i = 0; i < rules.length; i++) {
      this.addRuleToState(state, rules[i], 0);
    }
  }

  addRuleToState(state: any, rule: any, position: any) {
    // if state contains the rule already, do not add it again.
    var item = new GlrItem(rule, position);
    var key = item.key;
    if (state.items[key] !== undefined) {
      return;
    }

    // add the rule and position to the state.
    state.items[key] = item;
    state.itemCount++;

    // if the position completes the rule, the mark the state as reducing
    // to that symbol.
    if (item.position == item.rule.symbols.length) {
      state.reductions.push(item.rule);
      if (item.rule.name == '_start') {
        state.accept = true;
      }
    } else if (item.rule.symbols[item.position][0] != "'") {
      // if the next item of the rule is a non-terminal, then add all
      // rules by that name.
      this.addNonTerminalToState(state, item.rule.symbols[item.position]);
    }
  }

  cache(state: GlrState) {
    var key = state.key();
    if (key in this.cached) {
      GlrState.NextGlrStateId--;
    } else {
      this.cached[key] = state;
      if (this.debug) {
        dbg.printf('Created state:\n%s', state);
      }
    }
    return this.cached[key];
  }

  computeNext(state: any, symbol: any) {
    if (symbol in state.next) {
      return state.next[symbol];
    }
    var next = new GlrState();

    for (var key in state.items) {
      if (state.items.hasOwnProperty(key)) {
        // if the next item is the symbol, then add the rule to the
        // state.
        var item = state.items[key];
        if (
          item.position < item.rule.symbols.length &&
          item.rule.symbols[item.position] == symbol
        ) {
          this.addRuleToState(next, item.rule, item.position + 1);
        }
      }
    }

    next = this.cache(next);
    if (next === this.errorState) {
      next = null;
    }
    state.next[symbol] = next;
    return next;
  }
}
