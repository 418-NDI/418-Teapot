function animSelectionEntreeSouris(event){
	setOpaciteImages(event.target.classList[0]);
}

function animSelectionSortieSouris(event){
	resetOpaciteImages();
}

function setOpaciteImages(classeSelectionnee){
	elements = document.getElementsByClassName("image-corps");
	console.log(elements.length);
	for(const element of elements)
	{
		console.log(element.id);
		if(!element.classList.contains(classeSelectionnee))
		{
			element.style["filter"] = "saturate(0%)";
		}
		else
		{
			element.style["filter"] = "saturate(150%)";
		}
	}
}

function resetOpaciteImages(){
	elements = document.getElementsByClassName("image-corps");
	for(const element of elements)
	{
		element.style["filter"] = "saturate(100%)";
	}
}