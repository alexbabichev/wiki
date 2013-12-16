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
	
/*
		var crafts = Crafts.find().fetch();
	//var temps  = Temp.find().fetch();
	
	_.each(crafts, function(data){
	
		temps  = (Temp.find({_name: data.name}).fetch())[0];
		if (temps)
		{
			var img = temps['img'];
			//console.log(img);
			//save_icon(data._id, img);
		}
	
	});
*/
	

	

	
});



function save_icon(icon_name, icon){
	
	var http 	= Npm.require('http'),
	  	fs 		= Npm.require('fs');
	
	if (icon.indexOf('http') > -1)
	{

		var request = http.get(icon, function(res){
	    var imagedata = ''
	    res.setEncoding('binary')
	    res.on('data', function(chunk){
	        imagedata += chunk
	    })
	    res.on('end', function(){
	       	fs.writeFile('../../../../../../old_images/'+icon_name+'.png', imagedata, 'binary')
	    })
		});
		
	}


}

