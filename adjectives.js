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

// masc/fem sing/plural direct/oblique
let types = "msd mpd fsd fpd mso mpo fso fpo".split(' ');

function get_rand (arr) {
    return arr[Math.floor(Math.random()*arr.length)].trim()
}

function newSentence() {
    let who = get_rand(whose);
    let adj = get_rand(adjs);
    let noun = get_rand(nouns);

    str = who + " " + adj + " " + noun;

    let oblique = Math.random() < 0.5;
    if (oblique) str += " को ...";

    let fem = fems.includes(noun) || fems.includes(noun.slice(0,-1));
    let plural = noun.endsWith('s');

    let type = fem ? 'f' : 'm' ;
    type += plural ? 'p' : 's';
    

    $("#sentence").text(str);
    
    let translated = "";

    if (type === "ms") {
	if (oblique)
	    translated = a2e(who) + " " + a2e(adj) + " " +  a2e(noun);
	else
	    translated = tr(who) + " " + map.get(adj) + " " +  map.get(noun);
    } else if (type === "fs")
	translated = a2i(who) + " " + a2i(adj) + " " + map.get(noun);
    else if (type === "mp")
	translated = a2e(who) + " " + a2e(adj) + " " +
	(oblique ? a2on(noun.slice(0,-1)): a2e(noun.slice(0,-1)));
    else if (type === "fp") 
	    translated = a2i(who) + " " + a2i(adj) + " " +
	(oblique ? i2iyon(noun.slice(0,-1)): i2iyan(noun.slice(0,-1)));
    
    if (oblique)
	translated += " को ...";
    
    console.log (str, translated);
    $("#answer").text(translated.replace('.', ' ')).hide();
    
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

    let links = `https://docs.google.com/document/d/196NO9lbiLuXnQ5i4RUa9cCHnN2lVWVpjsb64Tz8EOMY/edit?authkey=CNH9i-wE&hl=en_US
    https://docs.google.com/document/d/1_xecskJVnpze1A96vOKthwVcYFSZkZR2VqD7-YQbQe8/edit?authkey=CLSgg4YI&hl=en_US&authkey=CLSgg4YI
    https://docs.google.com/document/d/1-iuPvhtjwFZNB8thDkjN7qL-4lZIL2tjgXiJbQ6Wb3I/edit?hl=en_US
    https://docs.google.com/document/d/1_xecskJVnpze1A96vOKthwVcYFSZkZR2VqD7-YQbQe8/edit?authkey=CLSgg4YI&hl=en_US&authkey=CLSgg4YI
    https://docs.google.com/document/d/1snNpyA97mZ1qqixRiTYegjruc15dfH6ZD8dd9FF2L4E/edit?authkey=CLyKvugH&hl=en_US&authkey=CLyKvugH
    https://docs.google.com/document/d/1_xecskJVnpze1A96vOKthwVcYFSZkZR2VqD7-YQbQe8/edit?authkey=CLSgg4YI&hl=en_US&authkey=CLSgg4YI`.split(/\s+/);

    let i=0;
    $("a").each(function () {
	this.href = links[i++];
	console.log(this.href);
    });
    
    newSentence();
});
