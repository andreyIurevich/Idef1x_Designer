
function deleteAttribute(){
	var AttributeID = $('#keys').val();

	$('#KeyName').val('');
	$('#KeyDescription').val('');

	if (AttributeID == "New key")
	{
		$('#keys option:selected').remove();
		return;
	}
	//Удаление атрибута из диаграммы
	$('div[data-repositoryId=' + AttributeID + ']').remove();
  jsPlumb.revalidate($(".block"));

	//Удаление атрибута из репозитория
	_Repository.Delete_Attribute(AttributeID);

	//Удаление атрибута из формы
	$('#keys').empty();
	var x =_Repository.list_ent.searchEntityById($('#EntityName').val()).atr_lynks;
	for (var i = 0; i < x.length;  i++)
	{
	   if(x[i]!=null)
	   $('#keys').append($('<option></option>').attr('value', x[i].id).text(
	        x[i].name + " (" + x[i].type + ")"));
	}

	if ($('#keys option').length == 0)
		$("#SaveAttribute").prop("disabled", false);
}

function deleteRelationship(){
  var relId = $('#connection_name').val();
  //var parentId = _Repository.list_rel.searchEntityById(relId)._parent_id;
  var childId = _Repository.list_rel.searchEntityById(relId)._child_id;
  //Удаление связи из диаграммы
  jsPlumb.detach(_Repository.list_rel.searchEntityById($('#connection_name').val()).jsPlumbConn);
  //Удаление связи из репозитория
  _Repository.Delete_Relationship($('#connection_name').val());

  if ($("input[name='lavel']").val() == "KB")
  {
    for (var i = 1; i <= _Repository.list_ent._length; i++)
    {
        Refresh_Atr(_Repository.list_ent.searchNodeAt(i).Get_ID());
    }

    for (var i = 1; i <= _Repository.list_rel._length; i++)
    {
      if(_Repository.list_rel.searchNodeAt(i)._child_id == childId || 
          _Repository.list_rel.searchNodeAt(i)._parent_id == childId)
        if (_Repository.list_rel.searchNodeAt(i).type == IDEN_REL)
            return;
    }

    $("#keys" + childId).css("border-top-left-radius", "0");
    $("#keys" + childId).css("border-top-right-radius", "0");
    $("#attributes" + childId).css("border-bottom-right-radius", "0");
    $("#attributes" + childId).css("border-bottom-left-radius", "0");
  }
}


function createEntityList(){
    var str, name;

    for(var i=1; i<=_Repository.list_ent._length; i++)
    {
      str=_Repository.list_ent.searchNodeAt(i).Get_ID();
      name = _Repository.list_ent.searchNodeAt(i).name;
      
      $('#EntityName').append($('<option></option>').attr('value', str).text(name));
    }

    $('#EntityName').change(function(){
      $('#keys').empty();

      var x =_Repository.list_ent.searchEntityById($(this).val()).atr_lynks;

      for (var i = 0; i < x.length;  i++)
      {
        if(x[i]!=null)
        $('#keys').append($('<option></option>').attr('value', x[i].id).text(
            x[i].name + " (" + x[i].type + ")"));
      }

      $("#CreateAttribute").prop("disabled", false);
      $("#DeleteAttribute").prop("disabled", false);
    });

    $('#keys').change(function(){
        var AttributeID = $('#keys').val();
        var AttributeName = _Repository.list_atr.searchEntityById(AttributeID).name;
        var AttributeDomain = _Repository.list_atr.searchEntityById(AttributeID).domainName;
        var AttributeType = _Repository.list_atr.searchEntityById(AttributeID).type;
        var AttributeDescription = _Repository.list_atr.searchEntityById(AttributeID).description;

        $('#KeyName').val(AttributeName);
        $('#DataType option[value=' + AttributeDomain + ']').prop('selected', true);
        $('#KeyType option[value=' + AttributeType + ']').prop('selected', true);
        $('#KeyDescription').val(AttributeDescription);
        $("#SaveAttribute").prop("disabled", false);
    });
}





