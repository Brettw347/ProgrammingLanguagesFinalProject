// Interpreter
// Parser
// pretty print in JS --- https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript

const fs = require('fs');

const Type = {
    IDENTIFIER: "IDENTIFIER",
    OPERATOR: "OPERATOR",
    EOC: "ENDOFCOMMAND",
    NUMBER: "NUMBER",
    KEYWORD: "KEYWORD",
    COMMENT: "COMMENT"
};
// what cat should : go in

class Lexer {
    constructor(input) {
        this.lines = input.split('\n'); // split input into lines
        this.out = [];
    }

    lexLine(line) {
        // keywords
        const p_int = /^manifest$/;
        const p_string = /^yap$/;
        // operators
        const p_equals = /^=$/;
        const p_add = /^\+$/;
        const p_sub = /^\-$/;
        const p_div = /^\*$/;
        const p_mult = /^\/$/;
        // number literals
        const p_digits = /^\d+$/;
        // EOC
        const p_eoc = /^\.\.$/;
        // comments
        const p_singlecomm = /@.*$/;
        const p_multicomm_start = /^\?\?$/;
        const p_multicomm_end = /^\?\?$/;

        let insideMultiComm = false;

        const tokens = line.split(/\s+/); // split line into tokens based on whitespace

        for (let token of tokens) {
            if (p_singlecomm.test(token)) {
                break; // skip the rest of the line if single-line comment is encountered
            }

            if (p_multicomm_start.test(token)) {
                insideMultiComm = true;
                continue; // skip the start of multiline comment token
            }

            if (insideMultiComm) {
                if (p_multicomm_end.test(token)) {
                    insideMultiComm = false;
                }
                continue; // skip tokens inside multiline comment
            }

            if (p_int.test(token) || p_string.test(token)) {
                this.out.push({"Type": Type.KEYWORD, "value": token});
            } else if (p_equals.test(token) || p_add.test(token) || p_sub.test(token) || p_div.test(token) || p_mult.test(token)) {
                this.out.push({"Type": Type.OPERATOR, "value": token});
            } else if (p_digits.test(token)) {
                this.out.push({"Type": Type.NUMBER, "value": token});
            } else if (p_eoc.test(token)) {
                this.out.push({"Type": Type.EOC, "value": token});
            }
        }
    }

    lex() {
        for (let line of this.lines) {
            this.lexLine(line);
        }
        return this.out;
    }
}



class grammarChdeck(){
    g1= [Type.number + Type.Operator + Type.number + Type.EOC]; 
    g2= [Type.manifest + Type.string + Type.EOC];
    g3= [Type.yap + Type.number + Type.EOC];
}
class Parser{
    constructor(tokens){
        this.tokens = tokens;
        this.index = 0;
        this.currentToken = this.tokens[this.index];
    }
    nextToken(){
        this.index++;
        if(this.index < this.tokens.length){
            this.currentToken = this.tokens[this.index];
        }
    }
    parse(){
        const token = this.currentToken;
        if(!token){
            throw new Error("   Syntax Error: This aint it Chief.Try Again.");
            //    console.log(token);

        }
    }

}
//Where do I check the grammar? 
//In the parser before ou pass anything if the graamar has issues then give an error message 
//scan through tokens tosee if they match
//otherwise error message
//func check_grammar(){
  //  g1 =[Type.numb]
//}
//
//How do I handle multiple lines of commands?

//Where do I store vars


const filename = 'input.txt';
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lexer = new Lexer(data);
    const tokens = lexer.lex();

    console.log("\n--------TOKENS--------");
    console.log("");
    for (let t of tokens) {
        console.log(t);
    }
    console.log("");
});