var ConnectionCounter = 0;

function Refresh_Atr(entityId){
	var EntityKeys = $("#keys" + entityId);
  var EntityAttr = $("#attributes" + entityId);
        EntityKeys.empty();
        EntityAttr.empty();
	$('#keys' + entityId).empty();
	var x =_Repository.list_ent.searchEntityById(entityId).atr_lynks;
    for (var i = 0; i < x.length;  i++)
    {
      if(x[i]!=null){
      	  var attr_name;
      	  if (x[i]._owner_id != entityId)
      	  	attr_name = x[i].name + " (FK)";
      	  else
      	  	attr_name = x[i].name;
          var element = $("<div></div>", {class: "attribute"}).attr('data-repositoryId', x[i].id).text(attr_name);
          if (x[i].type == "PK" && x[i].mig_id == null)
          {
            element.appendTo(EntityKeys);
          }
          else
          {
            if(x[i].mig_type == IDEN_REL)
              element.appendTo(EntityKeys);
            else
            element.appendTo(EntityAttr);
          }
    	}
    }
    jsPlumb.revalidate($(".block"));
} 

function createConnection(source_n, target_n, verb_phrase, type, description){

    var jsPlumbConn;

    if ($("input[name='lavel']").val() == "ER")
    	_Repository.Add_Relationship(description, source_n, target_n, type, verb_phrase, null);
    else
    	if ($("input[name='lavel']").val() == "KB")
    	{
    		_Repository.Add_RelationshipKB(description, source_n, target_n, type, verb_phrase, null);
        
        if (type == IDEN_REL)
        {
          $("#keys" + target_n).css("border-top-left-radius", "10px");
          $("#keys" + target_n).css("border-top-right-radius", "10px");
          $("#attributes" + target_n).css("border-bottom-right-radius", "10px");
          $("#attributes" + target_n).css("border-bottom-left-radius", "10px");
        }
      
    		Refresh_Atr(target_n);
    	}

    ConnectionCounter++;

    switch (type) {
		/*Создание соединения один-ко-многм*/
		case IDEN_REL:

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
		case MANY_TO_MANY:
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

    /*Создание неидентифицирующей связи на диаграмме*/
    case NON_IDEN_REL:

      var s = jsPlumb.addEndpoint(source_n, {
        endpoint: /*"Blank",*/["Rectangle", {cssClass: "no-ident-endpoint" , width: 8, height: 8}],
        anchor: "Continuous",
        /*endpointStyle : { fill: "black" },*/
        /*paintStyle:{ outlineStroke: "black" }*/
        endpointStyle:{ fill:"white", outlineStroke:"black" }
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
        paintStyle: { stroke: "black", strokeWidth: 1, dashstyle: "7 4" },
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
}