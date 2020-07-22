let nummern;

function addNummer(event) {
	if (event.keyCode !== 13)
		return;
	let nummer = document.getElementById("inputText").value;
	document.getElementById("inputText").value = "";
	nummern.push(nummer);
	window.localStorage.setItem("nummern",JSON.stringify(nummern));
	updateUiWithAnimation();
}


function searchNummer(event) {
if (event.keyCode !== 13)
		return;
	
	let result = document.getElementById("result");
	let input = document.getElementById("inputSearch");
	
	console.log(input.innerHTML);
	
	if(nummern.filter(elem => elem === input.value).length === 0){
	result.innerText = "Nicht Gefunden"
	result.style.color = "red";
	}
	else {
		result.innerText = "Gefunden";
		result.style.color = "green";
	}
	input.value = "";
}

function wegInput(event) {
if (event.keyCode !== 13)
		return;
	
	let input = document.getElementById("wegText");
	let div = document.getElementById("weg");
	let textSpan = document.getElementById("text1");
	
	textSpan.innerText = input.value;
	div.requestFullscreen();
	div.className = "fullscreen";
	input.value = "";
}

function removeElement(element){
	if(!confirm("Wirklich löschen?!"))
		return;
	nummern = nummern.filter(elem => elem !== element.innerText);
	window.localStorage.setItem("nummern",JSON.stringify(nummern));
	element.style.animation = "flyOut 1s cubic-bezier(.68,-0.55,.27,1.55)";
	element.addEventListener("animationend",() => updateUiWithAnimation());
}
	
function updateUiWithAnimation() {
	let listDiv = document.getElementById("listDiv");
	let oldHeight = getComputedStyle(listDiv).height;
	updateUI();
	let newHeight = getComputedStyle(listDiv).height;
	
	console.log("new: "+newHeight+" old: "+oldHeight);
	
	listDiv.style.transition = "height 1s cubic-bezier(.77,0,.18,1)";
	listDiv.addEventListener("transitionend",transitionendFunc);
	listDiv.style.height = oldHeight;
	setTimeout(()=> listDiv.style.height = newHeight,100);
}
	
function transitionendFunc(){
		console.log("Transition has ended");
		listDiv.style.height = "";
		listDiv.style.transition = "";
		listDiv.removeEventListener("transitionend",transitionendFunc);
		}
	
function updateUI(){
	if(nummern === null)
		nummern = [];
	
	let liste = document.getElementById("liste");
	liste.innerHTML = "";
	
	for(let nummer of nummern) {
		let li = document.createElement("li");
		li.innerText = nummer;
		li.addEventListener("click",() => removeElement(li));
		liste.appendChild(li);
	}
}

function fullscreenchangefunc(event){
	if(document.fullscreenElement === null)
		document.getElementById("weg").className = "hidden";
}

function removeNewline(event) {
	let input = document.getElementById("entfernerInput");
	let output = input.value.replace(/\r/g,"");
	output = output.replace(/\n/g," ");
	let outputElem = document.getElementById("entfernerOutput")
	outputElem.value = output;
	outputElem.select();
	outputElem.setSelectionRange(0,9999);
	document.execCommand("copy");
	input.focus();
}

document.getElementById("inputSearch").addEventListener("keypress",searchNummer);
document.getElementById("inputText").addEventListener("keypress", addNummer);
document.getElementById("wegText").addEventListener("keypress",wegInput);
document.addEventListener("fullscreenchange", fullscreenchangefunc);
document.getElementById("weg").addEventListener("click", () => document.exitFullscreen());
document.getElementById("entfernerInput").addEventListener("input", removeNewline);

nummern = JSON.parse(window.localStorage.getItem("nummern"));
updateUI();