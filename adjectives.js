let possessives = "My, Your, His, Her, Their, These men's, Those women's, This woman's, That man's";
let singulars = "book, flower, thing, boy, girl";
let adjectives = "green, blue, red, black, fat, thin, big, small, old, new";

let hindi_translations = `मेरा आपका उसका उसका उनका उन उस  इन इस
पुस्तक फूल चीज़ लड़का लड़की आदमी.का आदमियों.का औरत.का औरतों.का 
हरा नीला लाल काला मोटा पतला बड़ा छोटा पुराना नया`.split(/\s+/);

let english_words = `my your his her their those that these this
book flower thing boy girl man's men's woman's women's
green blue red black fat thin big small old new`.split(/\s+/);

let fems = `book thing girl woman women`.split(' ');

const buildMap = (keys, values) => {
    const map = new Map();
    for(let i = 0; i < keys.length; i++){
	map.set(keys[i], values[i]);
    };
    return map;
}


let map = buildMap(english_words, hindi_translations);
    
let whose = possessives.split(",");
let nouns =  singulars.split(",");
let adjs = adjectives.split(",");

function get_rand (arr) {
    return arr[Math.floor(Math.random()*arr.length)].trim()
}

function createPhrase (p) {
    let str = p.whose + " " + p.adj + " " + p.noun;
    if (p.oblique) str += " को ...";
    return str;
}

function newSentence() {
    let phrase = {
	whose : get_rand(whose),
	adj : get_rand(adjs),
	noun : get_rand(nouns),
	oblique : Math.random() < 0.5
    };

    let str = createPhrase(phrase);

    let fem = fems.includes(phrase.noun) || fems.includes(phrase.noun.slice(0,-1));
    let plural = phrase.noun.endsWith('s');

    let type = fem ? 'f' : 'm' ;
    type += plural ? 'p' : 's';
    

    $("#sentence").text(str);
    
    let translated = phrase;

    switch (type) {
    case "ms":
	if (phrase.oblique) {
	    translated.whose = a2e(phrase.whose) ;
	    translated.adj = a2e(phrase.adj) ;
	    translated.noun = a2e(phrase.noun);
	} else {
	    translated.whose = tr(phrase.whose) ;
	    translated.adj = map.get(phrase.adj) ;
	    translated.noun = map.get(phrase.noun);
	}
	break;
	
    case "fs":
	translated.whose = a2i(phrase.whose) ;
	translated.adj = a2i(phrase.adj) ;
	translated.noun = map.get(phrase.noun);
	break;
	
    case "mp":
	translated.whose = a2e(phrase.whose) ;
	translated.adj = a2e(phrase.adj) ;
	translated.noun = 
	    (phrase.oblique ? a2on(phrase.noun.slice(0,-1)): a2e(phrase.noun.slice(0,-1)));
	break;
	
    case "fp":
	translated.whose = a2i(phrase.whose) ;
	translated.adj = a2i(phrase.adj) ;
	translated.noun = 
	    (phrase.oblique ?
	     i2iyon(phrase.noun.slice(0,-1)): i2iyan(phrase.noun.slice(0,-1)));
    }
    
    let tstr = createPhrase(translated);
    $("#answer").text(tstr.replace('.', ' ')).hide();
    
    return str;
}

function seeAnswer () {
    $("#answer").show();
}

const unicode_a = 2366;
const unicode_i = 2368;

function convert_ending_if (word, ending, case1, case2) {
    word = tr(word)
    let lastchar = word.charCodeAt(word.length-1);
    if (lastchar == ending) return word.slice(0,-1) + case1;
    return word + case2;
}

function a2i (word) {
    return convert_ending_if (word, unicode_a, "ी", "");   
}

function a2e (word) {
    return convert_ending_if (word, unicode_a, "े", "");
}

function i2iyan (word) {
    return convert_ending_if (word, unicode_i, "ियाँ", "ें");
}

function i2iyon (word) {
    return convert_ending_if (word, unicode_i, "ियों", "ों");
}

function a2on (word) {
    return convert_ending_if (word, unicode_a,  "ों",  "ों");
}

function tr(word) {
    word = word.toLowerCase();
    if (map.has(word))
	return map.get(word);
    let ret = ""
    for (let w of word.split(' ')) {
	ret += tr(w) + " ";
    }
    return ret.trim();
}


$( document ).ready(function() {
    let nl = nouns.length;
    for (let i = 0; i < nl; i++) {
	nouns.push(nouns[i]+"s");
    }
    newSentence();
});
