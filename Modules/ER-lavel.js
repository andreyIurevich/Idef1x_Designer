function Validation(ModalWindow){

            switch (ModalWindow){
              
              case "myModal":

                  var Entity_name_length = $('#entity_name').val().length;
                  var DescriptionEntity_length = $('#DescriptionEntity').val().length;

                  if (Entity_name_length > 0 && DescriptionEntity_length > 0){
                    AddEntity($('#entity_name').val(), 
                                $('#DescriptionEntity').val(),
                                $("input[name='lavel']").val(),
                                80, 80);
                    $('#myModal').modal("hide");
                  }else{
                    if (Entity_name_length == 0){
                      $('#entity_name').focus();
                    }else{
                      $('#DescriptionEntity').focus();
                    } 
                  }
                  break;

              case "EditModal":

                  var EditEntityName_length = $('#EditEntityName').val().length;
                  var entity_name_2_length = $('#entity_name_2').val().length;
                  var EditDescriptionEntity_length = $('#EditDescriptionEntity').val().length;

                  console.log($('#' + $('#EditEntityName').val()).children('[data*="name"]'));

                  if (EditEntityName_length > 0 && entity_name_2_length > 0 && EditDescriptionEntity_length > 0){
                      _Repository.Edit_Entity($('#EditEntityName').val(), 
                        $('#entity_name_2').val(), $('#EditDescriptionEntity').val());

                        $('#' + $('#EditEntityName').val()).children('[data*="name"]').text($('#entity_name_2').val());

                        $('#EditModal').modal("hide");

                  }else{
                      if (EditEntityName_length == 0){
                        $('#EditEntityName').focus();
                      }else{
                        if (entity_name_2_length == 0){
                          $('#entity_name_2').focus()
                        }else{
                          $('#EditDescriptionEntity').focus();
                        }
                      }
                  }
                  break;

              case "KeysModal":
                  var EntityID = $('#EntityName').val();
                  var KeyName = $('#KeyName').val();
                  var DataType = $('#DataType').val();
                  console.log(DataType);
                  var KeyType = $('#KeyType').val();
                  var KeyDescription = $('#KeyDescription').val();

                  if (
                      EntityID.length > 0 &&
                      KeyName.length    > 0 &&
                      DataType.length   > 0 &&
                      KeyType.length    > 0 &&
                      KeyDescription.length > 0
                      )
                  {
                    var AttributeID;

                    if ($('#keys').val() == "New key")
                      AttributeID = _Repository.Add_Attribute(KeyName, EntityID, KeyType, DataType, KeyDescription);
                    else
                      if (_Repository.list_atr.searchEntityById($('#keys').val()) != null)
                        _Repository.Edit_Attribute($('#keys').val(), KeyName, KeyType, DataType, KeyDescription);

                    var EntityKeys = $("#keys" + EntityID);
                    var EntityAttr = $("#attributes" + EntityID);
                    EntityKeys.empty();
                    EntityAttr.empty();

                    $('#keys').empty();

                    var x =_Repository.list_ent.searchEntityById(EntityID).atr_lynks;
                    for (var i = 0; i < x.length;  i++)
                    {
                      if(x[i]!=null){
                      $('#keys').append($('<option></option>').attr('value', x[i].id).text(
                          x[i].name + " (" + x[i].type + ")"));
                      var element = $("<div></div>", {class: "attribute"}).attr('data-repositoryId', x[i].id).text(x[i].name);

                      if (x[i].type == "PK")
                      {
                        element.appendTo(EntityKeys);
                      }
                      else
                      {
                        element.appendTo(EntityAttr);
                      }
                    }
                    }

                    for (var i = 1; i <= _Repository.list_ent._length; i++)
                      Refresh_Atr(_Repository.list_ent.searchNodeAt(i).Get_ID());

                    $('#KeyName').val('');
                    $("#DataType :nth-child(1)").attr("selected", "selected");
                    $("#KeyType :nth-child(1)").attr("selected", "selected");
                    $("#KeyDescription").val('');
                  }
                  break;
              }
}

function AAAAcreateComment(TextComment){
    CommentCounter++;
    var comment_container = $('<div></div>', {
      id : "CommentId" + CommentCounter,
      class: "text-center", 
      blocktype: "comment" 
    }).css({
      //"min-width": "120px",
      //"min-height": "50px",
      "position": "absolute",
      "padding": "5px",
      "left": "130px",
      "top": "200px",
      "color": "red",
      "cursor": "pointer",
      "border": /*"1px dotted red"*/ "none"
    });

    //var text_in_comment = $('<div contenteditable="true"></div>').text(TextComment).attr("contenteditable", "true").appendTo(comment_container);

    var text_in_comment = $('<textarea rows="2"></textarea>')
    .keydown(function(e) { 
        if (e.which == 46) { $(this).remove(); }
    })
    .val(TextComment)
    .appendTo(comment_container);

    $(comment_container).appendTo('body');

    jsPlumb.draggable(comment_container);
}

/* Выбор имени сущности. Для окна редактирования сущности.*/
function EditName(EntityName){
    document.getElementById('EditEntityName').value = EntityName;
}

function createEntityListForConnection(list){

      var str, name;

      for(var i=1; i<=_Repository.list_ent._length; i++)
      {
        str=_Repository.list_ent.searchNodeAt(i).Get_ID();
        name = _Repository.list_ent.searchNodeAt(i).name;
        
        list.append($('<option></option>').attr('value', str).text(name + ' - ' + str));
      }
}

function createEntityListER(){
      var str, name;

      for(var i=1; i<=_Repository.list_ent._length; i++)
      {
        str=_Repository.list_ent.searchNodeAt(i).Get_ID();
        name = _Repository.list_ent.searchNodeAt(i).name;
        
        $('#EditEntityName').append($('<option></option>').attr('value', str).text(str));
      }

      $('#EditEntityName').change(function(){
          $('#entity_name_2').val(_Repository.list_ent.searchEntityById($(this).val()).name);
          $('#EditDescriptionEntity').val(_Repository.list_ent.searchEntityById($(this).val()).description);
      });
}

function clearElements(ModalWindow){
          /*
            Параметр ModalWindow - имя модального окна, в котором будут отчищаться значения полей.
          */
        switch (ModalWindow){
            case "EditRelationship":
                    $('#connection_name').empty();
                    $('#entity_name_connection5').val('');
                    $('#entity_name_connection6').val('');
                    $('#verb_phrase_con').val('');
                    $('ConDescription').val('');
                    getConnectionNames($('#connection_name'));
                    $('#connection_name').val('');
                break;
            case "myModal":
                    $('#entity_name').val('');
                    $('#DescriptionEntity').val('');
                    $('#entity_name').focus();
                break;
            case "EditModal":
                    $('#EditEntityName').empty();
                    createEntityListER();
                    $('#EditEntityName').val('');
                    $('#entity_name_2').val('');
                    $('#EditDescriptionEntity').val('');
                    $('#EditEntityName').focus();
                break;
            case "Many-to-many":
                    $('#Many-to-many_label').val('');
                    $('#Many-to-many_Description').val('');
                    $('#EntityName1').empty();
                    $('#EntityName2').empty();
                    $('#Many-to-many_Description').val('');
                    createEntityListForConnection($('#EntityName1'));
                    createEntityListForConnection($('#EntityName2'));
                    $('#EntityName1').val('');
                    $('#EntityName2').val('');
                break;
            case "One-to-many":
                    $('#ParentEntityName').empty();
                    $('#ChildEntityName').empty();
                    $('#verb_phrase').val('');
                    $('#One-to-many_Description').val('');
                    createEntityListForConnection($('#ParentEntityName'));
                    createEntityListForConnection($('#ChildEntityName'));
                    $('#ParentEntityName').val('');
                    $('#ChildEntityName').val('');
                break;
            case "KeysModal":
                    $("#EditEntityName").val('');
                    $('#KeyName').val('');
                    $("#DataType :nth-child(1)").attr("selected", "selected");
                    $("#KeyType :nth-child(1)").attr("selected", "selected");
                    $("#KeyDescription").val('');
                    $("#keys").empty();
                    $("#EntityName").empty();
                    createEntityList();
                    $("#EntityName").val('');
                    $("#CreateAttribute").prop("disabled", true);
                    $("#DeleteAttribute").prop("disabled", true);
                    $("#SaveAttribute").prop("disabled", true);
                break;
          }
          $('.badge').text(''); $('.badge').text(_Repository.list_ent._length);
}

function getConnectionNames(list){

        var str, name;

        for(var i=1; i<=_Repository.list_rel._length; i++)
        {
          str=_Repository.list_rel.searchNodeAt(i).Get_ID();
          list.append($('<option></option>').attr('value', str).text(str));
        }

        list.change(function(){

          var parent_name =_Repository.list_ent.searchEntityById(
                        _Repository.list_rel.searchEntityById($(this).val())._parent_id).picture_id;
          var child_name = _Repository.list_ent.searchEntityById(
            _Repository.list_rel.searchEntityById($(this).val())._child_id).picture_id;
          var phrase = _Repository.list_rel.searchEntityById($(this).val()).Get_Phrase();
          var rel_description = _Repository.list_rel.searchEntityById($(this).val()).description;
          
          $('#entity_name_connection5').val(parent_name);
          $('#entity_name_connection6').val(child_name);
          $('#verb_phrase_con').val(phrase);
          $('#ConDescription').val(rel_description);

        });

          /*
            $(entity_list).children('ul').remove();
          
            var list = $('<ul></ul>').addClass("dropdown-menu dropdown-menu-right");
            var list_element;
            console.log(entity_list);

            for(var i=1; i<=_Repository.list_rel._length; i++){
                str=_Repository.list_rel.searchNodeAt(i).Get_ID();

                list_element = $('<li></li>').append(
                    $('<a href="#"></a>').attr('class', i).text(str).click(
                      function(){
                        console.log($(this).attr('class'));
                        var parent_name =_Repository.list_ent.searchEntityById(
                          _Repository.list_rel.searchNodeAt($(this).attr('class'))._parent_id).picture_id;
                        var child_name = _Repository.list_ent.searchEntityById(
                          _Repository.list_rel.searchNodeAt($(this).attr('class'))._child_id).picture_id;
                        var phrase = _Repository.list_rel.searchNodeAt($(this).attr('class')).Get_Phrase();
                        var rel_description = _Repository.list_rel.searchNodeAt($(this).attr('class')).description;
                        $(input).val($(this).text());
                        $('#entity_name_connection5').val(parent_name);
                        $('#entity_name_connection6').val(child_name);
                        $('#verb_phrase_con').val(phrase);
                        $('#ConDescription').val(rel_description);
                        console.log(_Repository.list_rel);
                })).appendTo(list);
            }
            list.appendTo(entity_list);
            */
}

