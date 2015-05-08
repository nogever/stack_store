'use strict'
app.filter('type', function() {
    return function(items, typeName) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type.name === typeName) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

app.filter('category', function() {
    return function(items, cat) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            for (var j = 0; j < item.categories.length; j++){
                if (item.categories[j].name === cat) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});

app.filter('capitalize', function() {

  return function(input, char) {
    if (isNaN(input)) {

      // If the input data is not a number, perform the operations to capitalize the correct letter.
      var char = char - 1 || 0;
      var letter = input.charAt(char).toUpperCase();
      var out = [];

      for (var i = 0; i < input.length; i++) {
        if (i == char) {
          out.push(letter);
        } else {
          out.push(input[i]);
        }
      }
      return out.join('');
    } else {
      return input;
    }
  }

});

// // angular.module("customFilter", [])
// // .filter("unique", function() {
// // 	return function (data, propertyName) { 
// // 		if (angular.isArray( data) && angular.isString( propertyName)) { 
// // 			var results = []; 
// // 			var keys = {}; 
// // 			for (var i = 0; i < data.length; i++ ) { 
// // 				var val = data[i][propertyName]; 
// // 				if (angular.isUndefined( keys[ val])) { 
// // 					keys[ val] = true; 
// // 					results.push( val); 
// // 				} 
// // 			} 
// // 			return results; 
// // 		} else { 
// // 			return data; 
// // 		} 
// // 	}
// // });

// angular.module("customFilter", [])
// .filter("unique", function() {
// 	return function (data, propertyName) { 
// 		if (angular.isArray( data) && angular.isString( propertyName)) { 
// 			var results = []; 
// 			var keys = {}; 
// 			for (var i = 0; i < data.length; i++ ) { 
// 				var valArr = data[i][propertyName]; 

// 				valArr.forEach(function(val){
// 					if (angular.isUndefined( keys[val] )) { 
// 						keys[val] = true; 
// 						results.push(val); 
// 					} 
// 				});
// 			} 
// 			return results; 
// 		} else { 
// 			return data; 
// 		} 
// 	}
// });







