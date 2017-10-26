
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
    });
}