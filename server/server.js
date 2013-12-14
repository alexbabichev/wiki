Meteor.startup(function () {

	var fs = Npm.require('fs');

	/* publish ------------------------------------------------------------------ */  
	
  Meteor.publish("crafts", function () {
  	return Crafts.find({},{sort:{nation:1}});
	});
  Meteor.publish("modules", function () {
  	return Modules.find();
	});
	Meteor.publish("editlog", function () {
  	return EditLog.find();
	});
	
	/* methods ------------------------------------------------------------------ */
	
	Meteor.methods({
		'file-upload': function (fileInfo, fileData, _id) {
			//console.log("received file " + fileInfo.name);
			fs.writeFile('../../../../../public/'+_id+'.png', fileData, 'binary');
		}
	});


});