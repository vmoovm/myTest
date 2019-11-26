function insertAfter(newChild,refChild){
  var parElem=refChild.parentNode;
  if(!refChild.nextSibling){
			parElem.appendChild(newChild);
	} else if (parElem.lastChild == refChild) {
		refChild.appendChild(newChild);
		
	} else {
		parElem.insertBefore(newChild,refChild.nextSibling);
	}
}