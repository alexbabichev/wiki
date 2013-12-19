
Template.craft.helpers({
	module: function(){
		return Modules.find();
	},
	list_formated: function(param){
		if ((param) && (param !== ''))
		{
			var temp = param.split(';');
					temp = '<ul><li>'+temp.join('</li><li>')+'</li></ul>';
			return temp;
		}
	},
	type1: function(){
		var type = [];
		for (i=1; i<5; i++){
			if (this['param'+i] !== '')
				type[i] = {text: this['param'+i], id: 'param'+i, _id: this._id};
		}
		return type;
	},
	type2: function(){
		var type = [];
		for (i=5; i<9; i++){
			if (this['param'+i] !== '')
				type[i] = {text: this['param'+i], id: 'param'+i, _id: this._id};
		}
		return type;	
	},	
	enabled: function(data){
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).enabled;		
	},
	mod_val: function(data){
		console.log(data, this);
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id])[this.id];
	},
	exp_val: function(data, name) {
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).exp;
	},
	href: function(){
		return this;
	},
	ammo_info: function(){
		var info = (this.ammo_details).split(';');
				info = '<ul><li>'+info.join('</li><li>')+'</li></ul>';
		return info;
	}
});

