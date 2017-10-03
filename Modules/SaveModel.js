
function modelToJSON(){
            var nodes = []
            $(".block").each(function (idx, elem) {
                var $elem = $(elem);
                var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
                    nodes.push({
                        blockId:   $elem.attr('id'),
                        blocktype: $elem.attr('blocktype'),
                        entityname: _Repository.list_ent.searchEntityById($elem.attr('id')).name,
                        description: _Repository.list_ent.searchEntityById($elem.attr('id')).description, 
                        positionX: parseInt($elem.css("left"), 10),
                        positionY: parseInt($elem.css("top"), 10)
                    });
            });
            
            var connections = [];
            for(var i = 1; i <= _Repository.list_rel._length; i++)
            {
                connections.push({
                    source: _Repository.list_rel.searchNodeAt(i)._parent_id,
                    target: _Repository.list_rel.searchNodeAt(i)._child_id,
                    verb_phrase: _Repository.list_rel.searchNodeAt(i).phrase,
                    type: _Repository.list_rel.searchNodeAt(i).type,
                    description: _Repository.list_rel.searchNodeAt(i).description
                });
            }            
            
            var flowChart = {};
            flowChart.project = "idef1x_project";
            flowChart.nodes = nodes;
            flowChart.connects = connections;

            var flowChartJson = JSON.stringify(flowChart, "", 4);
            console.log(flowChartJson);

    return flowChartJson;
}

function saveInBrowser(modelInJson){
    //Save project to localStorage
    localStorage.setItem("Project1", modelInJson); 
}

function saveInFile(modelInJson){
    //Save project in file
    var blob = new Blob([modelInJson], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function loadFromFile(){
    document.getElementById('files').click();

    $('#files').change(function(){
        var files = document.getElementById('files').files;
        var file = files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var flowChartJson = event.target.result;
            createModel(flowChartJson);
        };

        reader.readAsText(file);
    }); 
}

function loadFromLocalStorage(){
    var open_project = $("#ProjectsList").val();
    if (open_project == undefined){
        $("#ProjectsList").focus();
    }else{
        var load_pr = localStorage.getItem(open_project);
        createModel(load_pr);
    }
}

function makeProjectsList(){
    var pr = null;
    var list = $('#ProjectsList');
    list.empty();
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        try
        {
            pr = JSON.parse(localStorage.getItem(key));
        }
        catch(e)
        {
            pr = null;
        }
        if (pr != null && pr.project == 'idef1x_project'){
            $('<option></option>', { value: key, text: key }).appendTo(list);
        } 
    }
}

function createModel(flowChartJson){

    try
    {
        var flowChart = JSON.parse(flowChartJson);
        var nodes = flowChart.nodes;

        $.each(nodes, function( index, elem ) {
            AddEntity(elem.entityname, elem.description, $("input[name='lavel']").val() ,elem.positionX, elem.positionY);
        });
        
        var connections = flowChart.connects;
        $.each(connections, function( index, elem ) {
            createConnection(elem.source, elem.target, elem.verb_phrase, elem.type, elem.description);
        });
    }
    catch(e)
    {
        console.log("Open project file error!");
    }
}