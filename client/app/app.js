Meteor.subscribe("crafts");
Meteor.subscribe("modules");
Meteor.subscribe("editlog");

Handlebars.registerHelper("title", function(title) {
    if(title) {
        document.title = title + " | War Thunder wiki";
    } else {
        document.title = "War Thunder wiki app";
    }
});

/* --------------------------------------------------------------------------------------------------------- */

Template.homepage.helpers({
	craft: function(){
		return Crafts.find({});
	},
	craft_class: function(){
		if (_.isArray(this.class))
			return (this.class).join(' ');
		else return this.class;
	},
	craft_class_br: function(){
		if (_.isArray(this.class))
			return (this.class).join('<br/>');
		else return this.class;
	},
});

Template.homepage.created = function(){
	$('body').on("click", "#filter a", function(){
		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
		var clss = '';
		$('#filter li.active a').each(function(){
			clss = clss + $(this).text()+' ';
		});

		clss = clss.trim().split(' ').join('.');
		$('.view_crafts > div').hide();
		$('.view_crafts > div.'+clss).show();
	});
	$('body').on("keyup", "input.search", function() {
      var value = $(this).val().toLowerCase().trim();
      $(".view_crafts > div").each(function(index) {
          var id = $(this).find("span.name").text().toLowerCase().trim();
          $(this).toggle(id.indexOf(value) !== -1);
      });
  });	
}



/* --------------------------------------------------------------------------------------------------------- */


Template.craft.helpers({
	module: function(){
		return Modules.find();
	},
	list_formated: function(param){
		if ((param) && (param !== ''))
		{
			var temp = param.split(';');
					temp = '<ul><li>'+temp.join('</li><li>')+'</li><ul/>';
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
				info = '<ul><li>'+info.join('</li><li>')+'</li><ul/>';
		return info;
	}
});


/* --------------------------------------------------------------------------------------------------------- */

Template.export_craft.helpers({
	list_formated: function(param){
		console.log(param);
		if ((param) && (param !== ''))
		{
			var temp = param.split(';');
					temp = '<ul><li>'+temp.join('</li><li>')+'</li><ul/>';
			return temp;
		}
	},
});

