'use strict';
app.config(function ($stateProvider) {
	$stateProvider.state('tea', {
		url:'/tea',
		templateUrl: 'js/tea/tea.html',
		controller: 'TeaCtrl',
		resolve: {
			teaProductsInfo: function (DrinkFactory) {
				return DrinkFactory.getTeaProducts('tea');
			}
		}
	});
});

app.factory('DrinkFactory', function ($http) {
	return {
		getTeaProducts: function(category) {

			var queryParams = {};

			if (category) {
				queryParams.category = category;
			}

			return $http.get('/api/products', {
				params: queryParams
			}).then(function(response) {
				return response.data;
			});
		}
	};
});

app.controller('TeaCtrl', function ($scope, teaProductsInfo) {
	$scope.teas = teaProductsInfo;
	// var i, j, myList;
	// myList = [];
	// for (i = j = 0; j <= 20; i = ++j) {
	//   myList.push({
	//     name: "elem " + i,
	//     height: Math.random() * 100 + 50
	//   });
	// }
	// return $scope.myList = myList;
});


app.directive('resize', function($window) {
return function($scope) {
  $scope.initializeWindowSize = function() {
    $scope.windowHeight = $window.innerHeight;
    return $scope.windowWidth = $window.innerWidth;
  };
  $scope.initializeWindowSize();
  return angular.element($window).bind('resize', function() {
    $scope.initializeWindowSize();
    return $scope.$apply();
  });
};
});

app.directive('grid', function() {
return {
  restrict: 'E',
  replace: true,
  transclude: true,
  templateUrl: 'js/tea/tea.html',
  scope: {
    list: "="
  },
  controller: function($scope, $element, $attrs) {
    var _margin, _width, elemHeight, elemPerLine, elemWidth, gridWidth, margin, parent, width;
    parent = $element.parent()[0];
    _margin = null;
    _width = null;
    margin = function() {
      return _margin || (_margin = parseInt($attrs.margin, 10) || 15);
    };
    width = function() {
      return _width || (_width = parseInt($attrs.width, 10) || 225);
    };
    elemWidth = function() {
      return width() + 2 * margin();
    };
    elemHeight = function(height) {
      return height + 2 * margin();
    };
    elemPerLine = function() {
      return parseInt(parent.offsetWidth / elemWidth(), 10);
    };
    gridWidth = function() {
      return elemPerLine() * elemWidth();
    };
    return $scope.computePositions = function() {
      var bottom, bottoms, elem, height, i, index, j, k, left, len, len1, maxHeight, ref, top;
      bottoms = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = elemPerLine(); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          results.push(0);
        }
        return results;
      })();
      maxHeight = 0;
      ref = $element.children();
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        elem = ref[i];
        elem.style.height = $scope.list[i].height + 'px';
        top = null;
        index = 0;
        for (i = k = 0, len1 = bottoms.length; k < len1; i = ++k) {
          bottom = bottoms[i];
          if (!((top == null) || top > bottom)) {
            continue;
          }
          top = bottom;
          index = i;
        }
        left = (index * elemWidth()) % gridWidth() + margin();
        height = top + elemHeight(elem.offsetHeight);
        if (maxHeight < height) {
          maxHeight = height;
        }
        bottoms[index] = height;
        elem.style.left = left + 'px';
        elem.style.top = top + margin() + 'px';
        elem.style.width = width() + 'px';
      }
      return {
        width: (gridWidth()) + "px",
        height: maxHeight + "px"
      };
    };
  }
};
});
