Template.add_module.rendered = function(){
		$("select[name='type']").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'}).each(function(){
			$(this).val($(this).attr('data-value')).selectpicker('render');
		});
	}

Template.add_module.events({
	'click .save' : function(e){
		e.preventDefault();
		var that = this,
				id,
				data = appRoutine.getFormData($('form'));
		
		id = appRoutine.data_upsert(that._id, data, Modules, EditLog);
		
		var file = $('#file-icon')[0].files[0];
		var reader = new FileReader();
		reader.onload = function(fileLoadEvent) {
		  //Meteor.call('file-upload', file, reader.result, id);
		  Images.storeFile(file, {name: id});
		};		
		reader.readAsBinaryString(file);
		//Router.go('modules');
	},
	'click .cancel' : function()
	{
		$('form').trigger('reset');
	},
	'click .delete' : function()
	{
		Modules.remove(this._id);
		Router.go('modules');
	}
});

Template.add_module.helpers({
	file: function(){
		return Images.find({'metadata.name': this._id});
	}
})


Template.modules.rendered = function(){
	appRoutine.autosearch();
}

Template.modules.module = function(){
	
	return Modules.find();
}

Template.view_module.helpers({
	type1: function(){
		var type = [];
		for (i=1; i<5; i++){
			if (this['param'+i] !== '')
				type[i] = {text: this['param'+i], id: 'param'+i};
		}
		return type;
	},
	type2: function(){
		var type = [];
		for (i=5; i<9; i++){
			if (this['param'+i] !== '')
				type[i] = {text: this['param'+i], id: 'param'+i};
		}
		return type;	
	},	

});
