function constructMenuItem(adventureAttribute, elementId, defaultChecked) {
    var allElements = {};
    adventures.forEach(function (adventure) {
	    adventure[adventureAttribute].split(",").forEach(function (attribute) {
		    allElements[attribute] = true;
	    });
    });

    var divElement = document.getElementById(elementId);
    Object.keys(allElements).forEach(function (attribute) {
	    var listElement = document.createElement("LI");

	    var inputElement = document.createElement("INPUT");
	    inputElement.setAttribute("type","checkbox");
	    inputElement.setAttribute("id",attribute);
	    if (defaultChecked == true) {
		inputElement.checked = true;
	    }
	    listElement.appendChild(inputElement);

	    var labelElement = document.createElement("LABEL");
	    labelElement.setAttribute("for",attribute);
	    labelElement.appendChild(document.createTextNode(attribute));
	    listElement.appendChild(labelElement);

	    divElement.appendChild(listElement);
    });    
}

function constructMenu() {
	constructMenuItem("season", "seasons");
	constructMenuItem("duration", "durations", true);

	var seasonMap = {
	    "winter" : [11,0,1],
	    "spring" : [2,3,4],
	    "summer" : [5,6,7],
	    "fall" : [8,9,10]
	};

	var date = new Date();
	var month = date.getMonth();

	Object.keys(seasonMap).forEach(function (season) {
		var months = seasonMap[season];
		if (months.indexOf(month) >= 0) {
		    document.getElementById(season).checked = true;
		}
	});
}

function getChecked(elementId) {
    var checked = {};
    var children = document.getElementById(elementId).getElementsByTagName("INPUT");

    for (var i=0; i < children.length; i++) {
	var child = children[i];
	if (child.checked) {
	    checked[child.getAttribute("id")] = true;
	}
    }

    return Object.keys(checked);
}

function getRandomAdventure() {
    var checkedSeasons = getChecked("seasons");
    var checkedDurations = getChecked("durations");

    var validAdventures = [];

    adventures.forEach(function (adventure) {
	    var validSeason = false;
	    var validDuration = false;
	    
	    adventure["season"].split(",").forEach(function (season) {
		    if (checkedSeasons.indexOf(season) >= 0) {
			validSeason = true;
		    }
	    });

	    adventure["duration"].split(",").forEach(function (duration) {
		    if (checkedDurations.indexOf(duration) >= 0) {
			validDuration = true;
		    }
	    });

	    if (validSeason && validDuration) {
		validAdventures.push(adventure);
	    }
    });

    if (validAdventures.length == 0) {
	document.getElementById("current-adventure").innerHTML= "none found";
    } else {
	var randomIndex = Math.floor(Math.random()*(validAdventures.length-1));
	var adventure = validAdventures[randomIndex];
	document.getElementById("current-adventure").innerHTML= adventure["summary"];
    }
}

constructMenu();