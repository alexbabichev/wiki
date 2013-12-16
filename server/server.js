Meteor.startup(function () {

	var fs = Npm.require('fs')

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
	
		var crafts = Crafts.find().fetch();
	//var temps  = Temp.find().fetch();
	
/*
	_.each(crafts, function(data){
		temps  = (Temp.find({_name: data.name}).fetch())[0];
		if (temps)
		{
			var params = {};
			var set = {};
					set.fullname = temps.name;
					if (temps['Rank'])
						set.rang = temps['Rank'];

			params.speed = temps['Maximum Speed'];
			params.burst = temps['Burst Mass'];
			params.altitude = temps['Maximum Altitude'];
			params.turntime = temps['7224 m'];
			params.climb = temps['Rate of Climb'];
			params.takeoff = temps['Takeoff Run'];
			params.ammo = temps['Armament'];
			
			set.params = params;

			
			Crafts.update({_id: data._id}, {$set: set}, function(error, result){
				console.log(data._id, temps['Rank']);
			});

		}

	});
*/

/* Crafts.update({_id:'GoW2TahQSdySM3ZuP'}, {$set:{rang:2}}); */

	
});