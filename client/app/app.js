Meteor.subscribe("crafts");
Meteor.subscribe("modules");
Meteor.subscribe("editlog");
Meteor.subscribe("images");

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

	Meteor.loginWithPassword('alex', '123');

}



/* --------------------------------------------------------------------------------------------------------- */

Template.view_all.helpers({
	crafts: function(){
		console.log(this);
		return this;
	}
})

Template.view_all.created = function(){
	$('body').on("keyup", "input.search", function() {
		appRoutine.autosearch();
	});
}

/* --------------------------------------------------------------------------------------------------------- */

Template.export_craft.helpers({
	list_formated: function(param){
		//console.log(param);
		if ((param) && (param !== ''))
		{
			var temp = param.split(';');
					temp = '<ul><li>'+temp.join('</li><li>')+'</li></ul>';
			return temp;
		}
	},
	ammo_info: function(){
		var info = (this.ammo_details).split(';');
				info = '<ul><li>'+info.join('</li><li>')+'</li></ul>';
		return info;
	},
	href: function(){
		return this;
	},
});

