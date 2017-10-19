var ConnectionCounter = 0; 

function createConnection(source_n, target_n, verb_phrase, type, description){

    var jsPlumbConn;
    console.log("createConnection : ", source_n, target_n);
    _Repository.Add_Relationship(description, source_n, target_n, type, verb_phrase, null);
    ConnectionCounter++;

    switch (type) {
		/*Создание соединения один-ко-многм*/
		case "OneToMany":

			var s = jsPlumb.addEndpoint(source_n, {
				endpoint: "Blank",/*["Rectangle", {width: 7, height: 2}],*/
				anchor: "Continuous",
				endpointStyle : { fill: "#797D7F" }
			});

			var t = jsPlumb.addEndpoint(target_n, {
				endpoint: ["Dot", {radius: 5}],
				anchor: "Continuous",
				endpointStyle : { fill: "black" },
			});

			jsPlumbConn = jsPlumb.connect({
				source: s,
				target: t,
				deleteEndpointsOnDetach: true,
				connector: [ "Flowchart", { stub: 100 } ],
				paintStyle: { stroke: "black", strokeWidth:1 },
				overlays:[
    				[ "Label", {
    					label: verb_phrase, 
    					id: "label" + _Repository.list_rel.searchNodeAt(_Repository.list_rel._length)._id, 
    					padding: "5px", 
    					cssClass: "aLabel" 
    				} ]
  				]
			});
		break;
		/*Соединение многие-ко-многим*/
		case "ManyToMany":
			var s = jsPlumb.addEndpoint(source_n, {
				endpoint: ["Dot", {radius: 5}],
				anchor: "Continuous",
				endpointStyle : { fill: "black" }
			});

			var t = jsPlumb.addEndpoint(target_n, {
				endpoint: ["Dot", {radius: 5}],
				anchor: "Continuous",
				endpointStyle : { fill: "black" }
			});

			jsPlumbConn = jsPlumb.connect({
				source: s,
				target: t,
				deleteEndpointsOnDetach: true,
				connector: [ "Flowchart", { stub: 100 } ],
				paintStyle: { stroke: "black", strokeWidth:1 },
				overlays:[
    				[ "Label", {
    					label: verb_phrase, 
    					id: "label" + _Repository.list_rel.searchNodeAt(_Repository.list_rel._length)._id, 
    					padding: "5px", 
    					cssClass: "aLabel" 
    				} ]
  				]
			});
		break;
	}

	_Repository.list_rel.searchNodeAt(_Repository.list_rel._length).jsPlumbConn = jsPlumbConn;
	console.log();
}