/* --------------------------------------------------------------------------------------------------------- */
var isolate = 0;

Template.add_craft.rendered = function(){
	//if (isolate == 0)
	{
		$('.redactor').redactor({ minHeight: 100, lang: 'ru' });
		$('select').selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'}).each(function(){
			$(this).val($(this).attr('data-value')).selectpicker('render');
		});
		$('.tagsinput').tagsInput();
		$('.ttip').tooltip();
		
		$('.ammo_type').change(function(){
			if ($(this).val != '') 
			$(this).parents('.ammo').find('.ammo_details').fadeIn();
		});
		
		if (this.data.links) {
			_.each(this.data.links, function(link, idx){
				var block = $('.links .form-group').get(idx);
				$(block).find('input').each(function(){
					var name = $(this).data('name');
					$(this).val(link[name]);
				});
			});
		}

		if (this.data.ammo) {
			$('.ammo_details ').show();
		}
		
		isolate++;
	}
}

/* --------------------------------------------------------------------------------------------------------- */
	
Template.add_craft.helpers({
	module: function(){
		return Modules.find();
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
	mod_val: function(data){
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id])[this.id];
		else return '';
	},
	exp_val: function(data, name) {
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).exp;
	},
	price_val: function(data, name) {
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).price;
	},
	gold_price_val: function(data, name) {
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).gold_price;
	},
	repair_price: function(data, name) {
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		return (data.modules[this._id]).repair_price;
	},
	dat_ammo: function(param){
		//console.log(this, param, this[param]);
		return this[param];
	},
	disabled: function(data)
	{
		if ((this._id) && (data.modules))
		if (_.isObject(data.modules[this._id]))
		{
			if (!(data.modules[this._id]).enabled) return 'disabled';
		}
		else return 'disabled';
	}
	
});

/* --------------------------------------------------------------------------------------------------------- */

Template.add_craft.events({
	'click .module a': function(e)
	{
		$(e.currentTarget).parents('.module').toggleClass('disabled');
	},
	'click .save' : function(e){
		e.preventDefault();
		var that = this,
				id,
				data = appRoutine.getFormData($('form'));
				data.modules = {};
				data.ammo = [];
				data.links = [];
				data.params = {};

		
		data.class = $('#class').val();
		
		$('tr.module').each(function(){
			if (!$(this).hasClass('disabled'))
			{
				var id = $(this).data('id');
				var params = {};
				$(this).find('input').each(function(){
					params[$(this).data('name')] = $(this).val();
				})
				params.enabled = true;
				data.modules[id] = params;				
			}
		});

		$('div.params').each(function(){
				var params = {};
				$(this).find('input').each(function(){
					params[$(this).attr('id')] = $(this).val();
				})
				_.extend(data.params, params)
		});
		
		$('article.ammo').each(function(){
			var params = {};
			if ($(this).find('input.ammo').val() != '')
			{
				$(this).find('input').each(function(){
					params[$(this).data('name')] = $(this).val();
				});
				params['ammo_type'] = $(this).find('.ammo_type').val();
				data.ammo.push(params);
			}
		});

		$('div.links .form-group').each(function(){
			var params = {};
			if ($(this).find('input.link').val() != '')
			{
				$(this).find('input').each(function(){
					params[$(this).data('name')] = $(this).val();
				});
				data.links.push(params);
			}
		});
		
		console.log(data);		
		
		id = appRoutine.data_upsert(that._id, data, Crafts, EditLog);
		
		Router.go('/craft/'+id);
	},
	'click .cancel': function()
	{
		$('form').trigger('reset');
		if (this._id)
		Router.go('/craft/'+this._id);
		else Router.go('homepage');
	},
	'click .delete': function()
	{
		Crafts.remove(this._id);
		Router.go('homepage');
	},
	'click .add': function(e){
		$(e.currentTarget).parents('article.ammo')
											.clone()
											.appendTo('.ammo_wrapper')
											.find('.btn-group.select').remove();
		$('select').selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'})
	},
	'click .del': function(e){
		if ($('article.ammo').size() > 1)
		$(e.currentTarget).parents('article.ammo').remove();
	},	
});

/* --------------------------------------------------------------------------------------------------------- */