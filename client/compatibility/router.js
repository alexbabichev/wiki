Router.configure({
	layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
});


Router.map(function() { 

	this.route('homepage', 			{ path: '/'});
	
	/* --------------------------------------------------------------------------- */
	
	this.route('view_all', 			{ path: '/view_all', data: function(){ return Crafts.find({}, {nation: 1, name: 1});}});
	
	this.route('add_page');
	
	this.route('add_craft');
		this.route('craft', 			{ path: '/craft/:id', data: function(){ return Crafts.findOne({_id: this.params.id});}});
		this.route('add_craft', 	{ path: '/edit_craft/:id', data: function(){ return Crafts.findOne({_id: this.params.id});}});
		this.route('export_craft',{ path: '/export_craft/:id', data: function(){ return Crafts.findOne({_id: this.params.id});}});

	
	this.route('modules');
		this.route('add_module');
		this.route('add_module', 	{ path: '/edit_module/:id', data: function(){ return Modules.findOne({_id: this.params.id});}});

});