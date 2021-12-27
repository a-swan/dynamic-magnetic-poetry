// updateWords();
parseWords();

function updateWords() {
  const words = document.getElementsByClassName("word");

  for (let i = 0; i < words.length; i++) {
    dragElement(words[i]);
  }
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.zIndex = 1;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.zIndex = 0;
  }
}

function parseWords() {
  //remove punctuation & split by " "
  const wordList = document
    .getElementById("target-words")
    .value.replaceAll(/[\.,-\/#!$%'"^&*;:{}=_`~()-]/gm, "")
    .split(" ");
  clearBlocks();
  
  const wordBin = document.getElementById("word-bin");
  for(let z = 0; z < wordList.length; z++){
    wordBin.appendChild(makeWordBlock(wordList[z], z));
  }
  
  updateWords();
}

function clearBlocks() {
  const wordBlocks = document.getElementsByClassName("word");
  
  while(wordBlocks.length > 0){
    wordBlocks[0].remove();
  }
}

function makeWordBlock(text, iter) {
      let outerDiv = document.createElement("DIV");
      outerDiv.className = "word";
      outerDiv.id = "word-"+iter;
      let innerP = document.createElement("P");
      let textNode = document.createTextNode(text);

      innerP.appendChild(textNode);
      outerDiv.appendChild(innerP);
      return outerDiv;
}
