let o_nouns = "I , You(तुम) , You(आप) , We, They";
let s_nouns = "He , She";
let singulars = "girl, boy ,man, woman, owl, monkey";
let forms = "prsi,prco,prpe,pasi,paco,pape,fusi,if,used to,should,want,have";
let verbs = `eat/ate/eaten, go/went/gone, come/came/come, read/read/read, write/wrote/written, 
               see/saw/seen, give/gave/given, take/took/taken`;

let nouns = o_nouns.split(",");
nouns = nouns.concat(s_nouns.split(","));
let sing_array = singulars.split(",");

for (let i = 0; i < sing_array.length; i++) {
    let str = sing_array[i].trim();
    nouns.push(str);
    nouns.push(str+"s");
}
 
let verb_array = verbs.split(",");
let forms_array = forms.split(",");

function rand (arr) {
    return arr[Math.floor(Math.random()*arr.length)].trim();
}
function newSentence() {
    let str = rand(nouns); 
    let triplets = rand(verb_array).split("/");
    let root = triplets[0].trim();
    let plural = (/You/.test(str) ||
		  "I We They".indexOf(str) != -1 ||
		  /s$/.test(str));
    if (str == "mans") str = "men";
    else if (str == "womans") str = "women";
    
    
    let s = "";
    if (!plural && true) s = "s"; // tbd
    if (/[a-z]/.test(str[0])) str = "The " + str;

    let verbform = rand(forms_array); 

    switch (verbform) {
    case "prsi" :		// present simple : I go
	if (root == "go" && !plural) root = "goe";
	str += " " + root + s +  ".";
	if (root == "read") str += "(present tense)";
	break;
	
    case "prco":		// present continuous : I am going
	if (str == "I") is = " am ";
	else if (plural) is = " are ";
	else is = " is ";
	if (/e$/.test(root) && root != "see") root = root.substr(0,root.length-1);  
	str += is + root + "ing.";
	break;
      
    case "prpe" :		// present perfect : I have gone
	if (plural) has = " have ";
	else has = " has ";
	str += has + triplets[2] + ".";
	break;
	
    case "pasi":		// past simple : I went
	str += " " + triplets[1] + ".";
	if (root == "read") str += "(past tense)";
	break;
	
    case "paco":		// past continuous : I was going
	if (str == "I") was = " was ";
	else if (plural ) was = " were ";
	else was = " was ";
	if (/e$/.test(root) && root != "see") root = root.substr(0,root.length-1);
	str += was + root + "ing.";
	break;
	
    case "pape":		// past pefect : I had gone
	str += " had " + triplets[2] + ".";
	break;
	
    case "fusi":		// future : I will go
	str += " will " + triplets[0] + ".";
	break;
	
    case "if":			//  if I go
	str = "If " + str.toLowerCase() + " ";
	if (root == "go" && !plural) root = "goe";
	str += root + s ;
	str += "...";
	break;
	
    case  "used to":
    case "should":
	str += "  " + verbform + " " + triplets[0] + ".";
      break;
	
    case "want":
	str += "  " + verbform +s + " to " + triplets[0] + ".";
	break;
	
    case "have":
	if (s == "") have = " have to ";
	else have = " has to ";
	str += have + triplets[0] + ".";
	break;
	
    }
  
    console.log(str);
  
    $("#sentence").text(str);
}


$( document ).ready(function() {
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
