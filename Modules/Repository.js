/*function Repository() {
    this.list_ent = new SinglyList();
    this.list_atr = new SinglyList();
    this.list_rel = new SinglyList();
    this.list_comp = new SinglyList();
    this.list_keygroup = new SinglyList();
};
Repository.prototype.Add_Entity = function (name, type, description, picture_id)  {
    this.list_ent.add(new Entity(name, type, description, picture_id));
};
Repository.prototype.Add_Attribute = function (name, id_ent, type,domain_name)  {
	var object=this.list_ent.searchEntityById(id_ent);
	var tmp_atr=this.list_atr.add(new Attributes(name, id_ent, type,domain_name)).data;
	object.atr_lynks.push(tmp_atr);
	if(tmp_atr.type==PRIMARY_KEY)  {	
	for(var i=1;i<=this.list_rel._length;i++)  {
		if(this.list_rel.searchNodeAt(i)._parent_id==id_ent)  {
		var tmp_child_ent=this.list_ent.searchEntityById(this.list_rel.searchNodeAt(i)._child_id);
		tmp_child_ent.atr_lynks.push(tmp_atr);	
			}
		}
	}
    
};
Repository.prototype.Delete_Attribute = function (id_atr)  {
	var object=this.list_atr.searchEntityById(id_atr);
	var owner_ent=this.list_ent.searchEntityById(object._owner_id);
	for(var i=0;i<owner_ent.atr_lynks.length;i++)
	{
		for(var j=1;j<this.list_ent._length;j++)  {
			if(owner_ent.atr_lynks[i]!=null)  {
				for(var k=0;k<this.list_ent.searchNodeAt(j+1).atr_lynks.length;k++){
			if(this.list_ent.searchNodeAt(j+1).atr_lynks[k]!=null)  {
				if(owner_ent.atr_lynks[i].id==this.list_ent.searchNodeAt(j+1).atr_lynks[k].id&&owner_ent.atr_lynks[i].id==id_atr)
					this.list_ent.searchNodeAt(j+1).atr_lynks[k]=null;
			}
			}
					
			}
		}
	}
	for(var i=0;i<owner_ent.atr_lynks.length;i++)  {
		
		if (owner_ent.atr_lynks[i]!=null){
		if (owner_ent.atr_lynks[i].id==id_atr)
			owner_ent.atr_lynks[i]=null;
	}
	}
	this.list_atr.remove(id_atr);
	

};
Repository.prototype.Add_Relationship = function (name, parent_id, child_id, type, phrase, conn) {
    this.list_rel.add(new Relationship(name, parent_id, child_id, type, phrase, conn));
};
Repository.prototype.Add_RelationshipKB = function (name, parent_id, child_id, type, phrase, conn) {
    
   this.list_rel.add(new Relationship(name, parent_id, child_id, type, phrase, conn));
    var obj_parent=this.list_ent.searchEntityById(parent_id);
    var obj_child=this.list_ent.searchEntityById(child_id);
    for(var i=0;i<obj_parent.atr_lynks.length;i++)  {
		if(obj_parent.atr_lynks[i].type==PRIMARY_KEY)  {	
			var temp = this.list_atr.searchEntityById(obj_parent.atr_lynks[i].id);
			obj_child.atr_lynks.push(temp);		
		}
		
}
};
Repository.prototype.Delete_Relationship = function (id_rel)  {
    var obj_tmp=this.list_rel.searchEntityById(id_rel);
    var obj_child_ent=this.list_ent.searchEntityById(obj_tmp._child_id);
    if(obj_child_ent.atr_lynks.length!=0)  {
    	for(var i=0;i<obj_child_ent.atr_lynks.length;i++)  {
    			if(obj_child_ent.atr_lynks[i]._owner_id==obj_tmp._parent_id)
    			obj_child_ent.atr_lynks[i]=null;	
    	}
    }
    this.list_rel.remove(id_rel);
};
Repository.prototype.Edit_Relationship = function (id_rel, new_description,new_phrase)  {
    this.list_rel.searchEntityById(id_rel).description = new_description;
    this.list_rel.searchEntityById(id_rel).phrase = new_phrase;
};
Repository.prototype.Edit_Entity = function (id_ent, new_name, new_description)  {
    this.list_ent.searchEntityById(id_ent).name = new_name;
    this.list_ent.searchEntityById(id_ent).description = new_description;
};
Repository.prototype.Delete_Entity = function (id_ent)  {
    var k, k1;
    var c=[];
    k = this.list_rel._length;
   
    if (k == 1)  {
        if (this.list_rel.searchNodeAt(k)._parent_id == id_ent || this.list_rel.searchNodeAt(k)._child_id == id_ent)  {
            var c = this.list_rel.searchNodeAt(k)._id;
            this.list_rel.remove(c);
        }
    }
    else  {
        for (var i = 1; i <= k; i++)  {
            if (this.list_rel.searchNodeAt(i)._parent_id == id_ent || this.list_rel.searchNodeAt(i)._child_id == id_ent)  {

                c.push(this.list_rel.searchNodeAt(i)._id);
            }
        }
    }
    for (var j = 0; j < c.length; j++)  {
        this.list_rel.remove(c[j]);
    }
    for(var i=0;i<this.list_ent.atr_lynks.length;i++)
    {
    	Repository.Delete_Attribute(this.list_ent.atr_lynks[i]._id);
    }    
        this.list_ent.remove(id_ent);
    
};
Repository.prototype.Add_Group=function(name_kg,ent_id,type_kg)  {

this.list_keygroup.add(new KeyGroup(name_kg,ent_id,type_kg));
}
Repository.prototype.Add_Component=function(name_kg, attribute_id)  {

this.list_keygroup.add(new Component(name_kg, attribute_id));
}
Repository.prototype.Delete_Group=function(id_group)  {

this.list_keygroup.remove(id_group);
}*/
var IND_ENT = 'Independent';
var DEP_ENT = 'Dependent';
var KEY_ATR = 'Key';
var NON_KEY_ATR = 'Non-key';
var PRIMARY_KEY = 'PK';
var FOREING_KEY = 'FK';
var ALT_KEY = 'AK';
var IDEN_REL = 'Identificate';
var NON_IDEN_REL = 'Non-identificate';

function Entity(name, type, description) {
    //Ид объекта
    this.id = Entity.counter++;
    //Имя сущности
    this.name = name;
    //Ид графич. объекта
    this.picture_id = "Entity" + this.id;
    //Тип сущности
    this.type = type;
    //Описание сущности
    this.description = description;
    //Массив ссылок на атрибуты сущности
    this.atr_lynks = [];
}
Entity.counter = 0;
Entity.prototype.Get_ID = function () {
    return this.picture_id;
}

function Attributes(name, entId, type, domain, descp) {
    //Ид атрибута
    this.id = Attributes.counter++;
    //Ид владельца атрибута
    this._owner_id = entId;
    //Тип атрибута (PK,FK,AK)
    this.type = type;
    //Имя атрибута
    this.name = name;
    //Домен атр
    this.domainName = domain;

    this.description = descp;
}
Attributes.counter = 0;
Attributes.prototype.Get_ID = function () {
    return this.id;
}
Relationship.counter = 0;
function Relationship(description, parentId, childId, type, phrase, conn) {
    //Ид связи
    this._id = "R" + Relationship.counter++;
    //Описание связи
    this.description = description;
    //Ид род. сущности
    this._parent_id = parentId;
    //Ид доч. сущности
    this._child_id = childId;
    //Тип связи
    this.type = type;
    //Глагольная фраза
    this.phrase = phrase;
    //Объект Jsplumb
    this.jsPlumbConn = conn;
}


Relationship.prototype.Get_ID = function () {
    return this._id;
}
Relationship.prototype.Get_Parent_ID = function () {
    return this._parent_id;
}
Relationship.prototype.Get_Child_ID = function () {
    return this._child_id;
}
Relationship.prototype.Get_Phrase = function () {
    return this.phrase;
}
Relationship.prototype.Get_Description = function () {
    return this.description;
}

function KeyGroup(nameKg, entId, typeKg) {
    //Ид группы
    this.id = KeyGroup.counter++;
    //Имя группы
    this.name_kg = nameKg;
    //Ид владельца группы
    this.ent_id = entId;
    //Тип группы
    this.type_kg = typeKg;
}
KeyGroup.prototype.Get_ID = function () {
    return this.id;
}
KeyGroup.counter = 0;
function Component(nameKg, attributeId) {
    //Ид компонента
    this.id = Component.counter++;
    //Имя группы в которую входит атрибут
    this.name_kg = nameKg;
    //Ид атрибута
    this.atr_id = attributeId;
}
Component.prototype.Get_ID = function () {
    return this.id;
}
Component.counter = 0;

function Domain(datatype,limit){
    this.id = Domain.counter++;
    this.name="D"+id;
    this.dataType=datatype;
    this.limit=limit;
}
Domain.counter = 0;

function Repository() {
    //Список сущностей
    this.list_ent = new SinglyList();
    //Список атрибутов
    this.list_atr = new SinglyList();
    //Список свзяей
    this.list_rel = new SinglyList();
    //Список компонентов
    this.list_comp = new SinglyList();
    //Список групп
    this.list_keygroup = new SinglyList();
};
/*
Функция добавления Сущности
*/
Repository.prototype.Add_Entity = function (name, type, description, pictureId) {
   return this.list_ent.add(new Entity(name, type, description, pictureId)).data.id;
};
/*
Функция добавления Атрибута
*/
Repository.prototype.Add_Attribute = function (name, idEnt, type, domainName,description) {


    //Сущность к которой добавляется Атрибут
    var curEntity = this.list_ent.searchEntityById(idEnt);

    //Ссылка на созданный объект Атрибут
    var linkAtr = this.list_atr.add(new Attributes(name, idEnt, type, domainName,description)).data;

    curEntity.atr_lynks.push(linkAtr);

    this.Add_Group('G' + type + idEnt, idEnt, type,linkAtr.id);
    //Добавить в новую группу?
    
    if (linkAtr.type === PRIMARY_KEY) {
        for (var i = 1; i <= this.list_rel._length; i++) {
            if (this.list_rel.searchNodeAt(i)._parent_id === idEnt) {
                var tmpChildEnt = this.list_ent.searchEntityById(this.list_rel.searchNodeAt(i)._child_id);
                //linkAtr.type="FK";
                tmpChildEnt.atr_lynks.push(linkAtr);
            }
        }
    }
    console.log(this.list_atr);
    return linkAtr.id;

};
/*Удаление Атрибута*/
Repository.prototype.Delete_Attribute = function (idAtr) {

    //Атрибут для удаления
    var atrToDelete = this.list_atr.searchEntityById(idAtr);

    // Сущность-владелец атрибута
    var ownerEnt = this.list_ent.searchEntityById(atrToDelete._owner_id);

    var i;
    //Удаление атрибута из сущностей у которых есть связи с текущей
    /*for (i = 0; i < ownerEnt.atr_lynks.length; i++) {
        for (var j = 1; j < this.list_ent._length; j++) {
            if (ownerEnt.atr_lynks[i] != null) {
                for (var k = 0; k < this.list_ent.searchNodeAt(j + 1).atr_lynks.length; k++) {
                    if (this.list_ent.searchNodeAt(j + 1).atr_lynks[k] != null) {
                        if (ownerEnt.atr_lynks[i].id == this.list_ent.searchNodeAt(j + 1).atr_lynks[k].id && ownerEnt.atr_lynks[i].id == idAtr)
                            this.list_ent.searchNodeAt(j + 1).atr_lynks[k] = null;
                    }
                }

            }
        }
    }*/
    for (i = 0; i < ownerEnt.atr_lynks.length; i++) {

        if (ownerEnt.atr_lynks[i] != null) {
            if (ownerEnt.atr_lynks[i].id == idAtr)
                ownerEnt.atr_lynks[i] = null;
        }
    }
    for (i = 1; i <= this.list_comp._length; i++) {
        if (this.list_comp.searchNodeAt(i).atr_id == idAtr)
            this.list_comp.remove(this.list_comp.searchNodeAt(i).id);
    }
    this.list_atr.remove(idAtr);


};
/*Добавление отношения*/
Repository.prototype.Add_Relationship = function (name, parentId, childId, type, phrase, conn) {
    this.list_rel.add(new Relationship(name, parentId, childId, type, phrase, conn));
};
/*Добавление отношения уровня KB*/
Repository.prototype.Add_RelationshipKB = function (name, parentId, childId, type, phrase, conn) {

    //Сущность-родитель
    var entParent = this.list_ent.searchEntityById(parentId);

    //Сущность-потомок
    var objChild = this.list_ent.searchEntityById(childId);


    for (var i = 0; i < entParent.atr_lynks.length; i++) {
        if (entParent.atr_lynks[i].type === PRIMARY_KEY) {           
            var temp = this.list_atr.searchEntityById(entParent.atr_lynks[i].id);
            //temp.type="FK";
            this.Add_Group('G' + temp.type+childId, childId, temp.type,temp.id);
            objChild.atr_lynks.push(temp);
        }

    }
    this.list_rel.add(new Relationship(name, parentId, childId, type, phrase, conn));
};
/*Удаление отношения*/
Repository.prototype.Delete_Relationship = function (idRel) {
    var relationToDelete = this.list_rel.searchEntityById(idRel);
    var objChildEnt = this.list_ent.searchEntityById(relationToDelete._child_id);

    //Удаление внешних ключей
    if (objChildEnt.atr_lynks.length !== 0) {
        for (var i = 0; i < objChildEnt.atr_lynks.length; i++) {
            if (objChildEnt.atr_lynks[i]._owner_id === relationToDelete._parent_id)
                objChildEnt.atr_lynks[i] = null;
        }
    }
    this.list_rel.remove(idRel);
};
/*Редактирование отношения*/
Repository.prototype.Edit_Relationship = function (idRel, newDescription, newPhrase) {
    this.list_rel.searchEntityById(idRel).description = newDescription;
    this.list_rel.searchEntityById(idRel).phrase = newPhrase;
};
/*Редактирование сущности*/
Repository.prototype.Edit_Entity = function (idEnt, newName, newDescription) {
    this.list_ent.searchEntityById(idEnt).name = newName;
    this.list_ent.searchEntityById(idEnt).description = newDescription;
};
/*Удаление сущности*/
Repository.prototype.Delete_Entity = function (idEnt) {

    //Массив id-шников связей
    var idRelToDelete = [];
    var tmpEnt = this.list_ent.searchEntityById(idEnt);
    var i;
    //Проверка на наличие связей у удаляемой сущности
    if (this.list_rel._length === 1) {
        if (this.list_rel.searchNodeAt(this.list_rel._length)._parent_id === idEnt || this.list_rel.searchNodeAt(this.list_rel._length)._child_id === idEnt) {
            this.list_rel.remove(this.list_rel.searchNodeAt(this.list_rel._length)._id);
        }
    }
    else {
        for (i = 1; i <= this.list_rel._length; i++) {
            if (this.list_rel.searchNodeAt(i)._parent_id === idEnt || this.list_rel.searchNodeAt(i)._child_id === idEnt) {

                idRelToDelete.push(this.list_rel.searchNodeAt(i)._id);
            }
        }
    }
    //Удаление всех групп и компонентов сущности
    for (i = 1; i <= this.list_keygroup._length; i++) {
        var groupToDeleteId = this.list_keygroup.searchNodeAt(i).ent_id;
        if (groupToDeleteId == idEnt)
            this.Delete_Group(this.list_keygroup.searchNodeAt(i).Get_ID());
    }
    //Удаление всех ссылок на атрибуты
    for (i = 0; i < tmpEnt.atr_lynks.length; i++) {
        if (tmpEnt.atr_lynks[i] != null)
            this.Delete_Attribute(tmpEnt.atr_lynks[i].id);
    }
    //Удаление всех связей имеющихся у удаляемой сущности
    for (var j = 0; j < idRelToDelete.length; j++) {
        this.Delete_Relationship(idRelToDelete[j]);
    }
    //Удаление сущности
    this.list_ent.remove(idEnt);

};
/*Добавление группы*/
Repository.prototype.Add_Group = function (nameKg, entId, typeKg,atrId) {
    
    var isOldGroup = false;

    for (var i = 1; i < this.list_keygroup._length + 1; i++) {
        if (this.list_keygroup.searchNodeAt(i).ent_id === entId) {

            if (this.list_keygroup.searchNodeAt(i).type_kg === typeKg) {
                isOldGroup = true;
                this.Add_Component(this.list_keygroup.searchNodeAt(i).name_kg, atrId);
            }
        }
    }
    if (!isOldGroup) {
        var newGroupItem=this.list_keygroup.add(new KeyGroup(nameKg, entId, typeKg)).data;
        this.Add_Component(newGroupItem.name_kg, newGroupItem.id);
    }
}
/*Добавление компонента*/
Repository.prototype.Add_Component = function (nameKg, attributeId) {
    return this.list_comp.add(new Component(nameKg, attributeId)).data;
}
/*Удаление группы*/
Repository.prototype.Delete_Group = function (idGroup) {
    var groupToDelete = this.list_keygroup.searchEntityById(idGroup);
    for (var i = 1; i <= this.list_comp._length; i++) {
        if (this.list_comp.searchNodeAt(i).name_kg === groupToDelete.name_kg)
            this.list_comp.remove(this.list_comp.searchNodeAt(i).id);
    }
    this.list_keygroup.remove(idGroup);

}