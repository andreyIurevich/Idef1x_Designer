function Validation(ModalWindow){

            switch (ModalWindow){
              
              case "myModal":

                  var Entity_name_length = $('#entity_name').val().length;
                  var DescriptionEntity_length = $('#DescriptionEntity').val().length;

                  if (Entity_name_length > 0 && DescriptionEntity_length > 0){
                    AddEntity($('#entity_name').val(), 
                                $('#DescriptionEntity').val(),
                                $("input[name='lavel']").val(),
                                20, 20);
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
                    var AttributeID = _Repository.Add_Attribute(KeyName, EntityID, KeyType, DataType);

                    var EntityKeys = $("#keys" + EntityID);
                    var EntityAttr = $("#attributes" + EntityID);
                    EntityKeys.empty();
                    EntityAttr.empty();

                    $('#keys').empty();

                    var x =_Repository.list_ent.searchEntityById(EntityID).atr_lynks;
                    for (var i = 0; i < x.length;  i++)
                    {
                      $('#keys').append($('<option></option>').attr('value', x[i].id).text(
                          x[i].name + " (" + x[i].type + ")"));
                      var element = $("<div></div>", {class: "attribute"}).text(x[i].name);
                      if (x[i].type == "PK")
                      {
                        element.appendTo(EntityKeys);
                      }
                      else
                      {
                        element.appendTo(EntityAttr);
                      }
                    }

                    $('#KeyName').val('');
                    $("#DataType :nth-child(1)").attr("selected", "selected");
                    $("#KeyType :nth-child(1)").attr("selected", "selected");
                    $("#KeyDescription").val('');
                  }
                  break;
              }
}

/* Выбор имени сущности. Для окна редактирования сущности.*/
function EditName(EntityName){
    document.getElementById('EditEntityName').value = EntityName;
}

/*Создание списка имён сущностей из репозитория*/
/*
function createEntityList(element_id){

          $('#' + element_id).children('ul').remove();
          
          var entity_list = $('<ul></ul>').addClass("dropdown-menu dropdown-menu-right");
          var str;
          var list_element;
          var name;

          for(var i=1; i<=_Repository.list_ent._length; i++){

            str=_Repository.list_ent.searchNodeAt(i).Get_ID();
            name = _Repository.list_ent.searchNodeAt(i).name;
            
            list_element = $('<li></li>').append(
                $('<a href="#"></a>').attr('id', i).text(str + " - " + name).click(
                  function(){
                    
                    $('#EditEntityName').val("Entity" + $(this).attr('id'));
                    var id_value=$(this).attr('id');
                    $('#entity_name_2').val(_Repository.list_ent.searchNodeAt(id_value).name);
                    $('#EditDescriptionEntity').val(_Repository.list_ent.searchNodeAt(id_value).description);
                    
                    $('#keys').empty();

                    var x =_Repository.list_ent.searchEntityById($(this).attr('data-EntityID')).atr_lynks;
                    for (var i = 0; i < x.length;  i++)
                    {
                      $('#keys').append($('<option></option>').text(x[i].name).attr('value', x[i].id));
                    }
                console.log('click ' + x);
                })).appendTo(entity_list);
          }

          entity_list.appendTo($('#' + element_id));
          console.log($('#' + element_id));
}
*/

function createEntityList(){
    var str, name;
    for(var i=1; i<=_Repository.list_ent._length; i++){
        str=_Repository.list_ent.searchNodeAt(i).Get_ID();
        name = _Repository.list_ent.searchNodeAt(i).name;
        
        $('#EntityName').append($('<option></option>').attr('value', str).text(name));
          /*
          .on("click",
            function(){
                $('#keys').empty();

                var x =_Repository.list_ent.searchEntityById($(this).val()).atr_lynks;
                for (var i = 0; i < x.length;  i++)
                {
                  $('#keys').append($('<option></option>').attr('value', x[i].id).text(x[i].name));
                }
                console.log(this);
            }
          ));
          */
        }

        $('#EntityName').change(function(){
          $('#keys').empty();
          var x =_Repository.list_ent.searchEntityById($(this).val()).atr_lynks;
          for (var i = 0; i < x.length;  i++)
          {
            $('#keys').append($('<option></option>').attr('value', x[i].id).text(
              x[i].name + " (" + x[i].type + ")"));
          }
          $("#CreateAttribute").prop("disabled", false);
          $("#DeleteAttribute").prop("disabled", false);
          //
        });
}

function createEntityListForConnection(input, entity_list){

            $(entity_list).children('ul').remove();
          
            var list = $('<ul></ul>').addClass("dropdown-menu dropdown-menu-right");
            var list_element;
            console.log(entity_list);
            var name;

            for(var i=1; i<=_Repository.list_ent._length; i++){
                str=_Repository.list_ent.searchNodeAt(i).Get_ID();
                name = _Repository.list_ent.searchNodeAt(i).name;
                list_element = $('<li></li>').append(
                    $('<a href="#"></a>').attr('id', i).text(str + " - " + name).click(
                      function(){
                        $(input).val("Entity" + $(this).attr('id'));
                })).appendTo(list);
            }
            list.appendTo(entity_list);
}

function clearElements(ModalWindow){
          /*
            Параметр ModalWindow - имя модального окна, в котором будут отчищаться значения полей.
          */
        switch (ModalWindow){
            case "myModal":
                    $('#entity_name').val('');
                    $('#DescriptionEntity').val('');
                    $('#entity_name').focus();
                break;
            case "EditModal":
                    $('#EditEntityName').val('');
                    $('#entity_name_2').val('');
                    $('#EditDescriptionEntity').val('');
                    $('#EditEntityName').focus();
                break;
            case "Many-to-many":
                    $('#entity_name_connection1').val('');
                    $('#entity_name_connection2').val('');
                    $('#Many-to-many_label').val('');
                    $('#Many-to-many_Description').val('');
                break;
            case "One-to-many":
                    $('#entity_name_connection3').val('');
                    $('#entity_name_connection4').val('');
                    $('#verb_phrase').val('');
                    $('#One-to-many_Description').val('');
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

function getConnectionNames(input, entity_list){

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
}

