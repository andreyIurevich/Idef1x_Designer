var entityCounter = 0;

function DeleteEntity(EntityId){
    if (EntityId.length > 0){
      jsPlumb.remove(EntityId);
      _Repository.Delete_Entity(EntityId);
    }else{
      $('#EditEntityName').focus();
    }
}

function AddEntity(EntityName, Description, Lavel, positionX, positionY){
    var entityID = "Entity" + _Repository.Add_Entity(EntityName, IND_ENT, Description);

    var Entity = $('<div></div>', { 
        id: entityID,
        blocktype: "entity",
        class: "block"
    }).css({
        "min-width": "120px",
        "min-height": "100px",
        "position": "absolute",
        "padding": "3px",
        "top": positionY,
        "left": positionX,
        "border": "none",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "flex-start",
        "align-items": "stretch"
    });

    var Keys, Attributes;

    if (Lavel == "ER"){
        var Content = $('<div></div>').attr('data', 'name').text(EntityName).css({
            "flex-grow": 1,
            "border": "1px solid black",
            "padding": "2px"
        }).appendTo(Entity);
    }
    else if(Lavel == "KB"){
            var Name = $('<div></div>').css({"padding": "1px"}).text(EntityName).appendTo(Entity);

            Keys = $('<div></div>', {id: "keys" + entityID}).css({
                "min-height": "20px",
                "flex-grow": 1,
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "flex-start",
                "align-items": "stretch",
                "border": "1px solid black"
            }).appendTo(Entity);

            Attributes = $('<div></div>', {id: "attributes" + entityID}).css({
                "flex-grow": 2,
                "border": "1px solid black",
                "border-top": "none",
                "min-height": "10px"
            }).appendTo(Entity);
        }
    $(Entity).appendTo('body');

    jsPlumb.draggable(Entity);
}

