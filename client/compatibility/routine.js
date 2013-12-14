/* appRoutine - core global functions */

var appRoutine = (function () { 

	var appRoutine = {};
	
	appRoutine.test = function() { 
		console.log('test routine module');
	};  
	
	appRoutine.autocomplete = function(data, el, field) {
		if (field == undefined) field = 'name';
		var $el = $(el), $typeahead = $el.prev();
		console.log($el, field);
		if ($typeahead.hasClass('typeahead'))
		$typeahead.typeahead({
			items: 8,
			source: function(){
				state = data.find().fetch();
				return _.pluck(state, field);
			},
			matcher: function(item){
				$el.val('');
				if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) 
		    return true;
			},
			updater: function(item){
				var obj = {}; obj[field] = item;
				var temp = _.where(state, obj);
				$el.val((temp[0])._id);
				return item;
			}
		});
	}
	
	appRoutine.addValidation = function(el) {
	  $(el).validate({
		  highlight: function(element, errorClass) {
		  	$(element).parent().addClass('has-error');
		  },
		  unhighlight: function(element, errorClass) {
			  $(element).parent().removeClass('has-error');
		  }
		});
	}
	
	appRoutine.getFormData = function($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;		
	}
	
	appRoutine.toLocal = function(date) {
		var local = (new Date(date)).toLocaleString();
    return (local.split(' GMT'))[0];		
	}
	
	appRoutine.autosearch = function() {
		$("input.search").keyup(function() {
        var value = $(this).val().toLowerCase().trim();
        $(".table tbody").find("tr").each(function(index) {
            var id = $(this).find("td").text().toLowerCase().trim();
            $(this).toggle(id.indexOf(value) !== -1);
        });
    });		
	}
	
	appRoutine.data_upsert = function(id, data, Collection, EditLog) {
		var published = new Date(),
				//editedby = (Meteor.user()).username;
				editedby = 'admin';
		if (id) {
			Collection.update({_id: id}, data);
			EditLog.insert({doc_id: id, published: published, editedby: editedby});
			return id;
		}
		else { 
			var id;
			id = Collection.insert(data, function(error, result) {
				EditLog.insert({doc_id: result, published: published, createdby: editedby});
				console.log(result);
			});	
			if (id) return id;
		}
		 		
	}
	
	appRoutine.addToHelpers = function() {
		// TODO - return object
	}
	
	appRoutine.resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
	}
	
	return appRoutine;
	
}($, _));


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


/*
		Carrier.distinct('carrier', function(error, result){
			$('.typeahead').typeahead({
				source: result,
				items: 8
			});
		});
*/
