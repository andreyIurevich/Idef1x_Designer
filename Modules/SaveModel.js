
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

            var attributes = [];
            if (_Repository.list_atr._length != 0)
                for (var i = 1; i <= _Repository.list_atr._length; i++)
                {
                    attributes.push({
                        id:             _Repository.list_atr.searchNodeAt(i).id,  
                        _owner_id:      _Repository.list_atr.searchNodeAt(i)._owner_id,
                        type:           _Repository.list_atr.searchNodeAt(i).type,
                        name:           _Repository.list_atr.searchNodeAt(i).name,
                        domainName:     _Repository.list_atr.searchNodeAt(i).domainName,
                        description:    _Repository.list_atr.searchNodeAt(i).description,
                        mig_id:         _Repository.list_atr.searchNodeAt(i).mig_id,
                        mig_type:       _Repository.list_atr.searchNodeAt(i).mig_type
                    });
                }            
            
            var flowChart = {};
            flowChart.project = "idef1x_project";
            flowChart.nodes = nodes;
            flowChart.connects = connections;

            /*if ($("input[name='lavel']").val() == "KB")
            {*/
                flowChart.attributes = attributes;
            //}

            var flowChartJson = JSON.stringify(flowChart, "", 4);
            console.log(flowChartJson);

    return flowChartJson;
}

function saveInBrowser(modelInJson){
    //Save project to localStorage
    localStorage.setItem($('#ProjectName').val(), modelInJson); 
}

function saveInSession(modelInJson){
    //Save project to localStorage
    if ($('.block').size() != 0)
        sessionStorage.setItem('CurrentProject', modelInJson); 
}

function saveInFile(modelInJson){
    //Save project in file
    var blob = new Blob([modelInJson], {type: "text/plain;charset=utf-8"});
    saveAs(blob, $('#ProjectName').val() + ".txt");
}

function loadFromSession(){
    var load_pr = sessionStorage.getItem('CurrentProject');
    if (load_pr != null)
        createModel(load_pr);
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

function loadFromLocalStorage(ProjectName){
    if (ProjectName == undefined){
        $("#ProjectsList").focus();
    }else{
        var load_pr = localStorage.getItem(ProjectName);
        createModel(load_pr);
    }
}

function deleteFromLocalStorage(ProjectName){
    if (ProjectName != undefined){
        localStorage.removeItem(ProjectName);
        makeProjectsList();
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

    $('#ProjectsList').change(function(){
        if ($(this).children().size() != 0)
        {
            $('#OpenProjectButton').prop("disabled", false);
            $('#DeleteProjectButton').prop("disabled", false);
        }
    });
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
        console.log(flowChart.attributes);
        if (/*$("input[name='lavel']").val() == "KB" &&*/ flowChart.attributes.length != null)
        {
            var attributes = flowChart.attributes;
            $.each(attributes, function( index, elem ) {
                if(elem.mig_id == null){
                _Repository.Add_Attribute(elem.name, elem._owner_id, elem.type, elem.domainName, 
                            elem.description, elem.mig_id, elem.mig_type);
                }
                for (var i = 1; i <= _Repository.list_ent._length; i++)
                {
                    Refresh_Atr(_Repository.list_ent.searchNodeAt(i).Get_ID());
                }
            });
        }

    }
    catch(e)
    {
        console.log("Open project file error!");
        console.log(e);
    }
}