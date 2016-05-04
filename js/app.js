angular.module("waitstaffCalc", [])
	.controller("updateContent", function($scope){

		$scope.defaultScope = false;
		// start mealcount. Starts at 1 to bring initial displayed value to 1.
		var mealCount = 1;
		// create a new object to store tip values throughout submissions.

		$scope.tips = [];
		
		// For loop that iterates through the array values, adding them up.
		$scope.tipSummation = function(){
			for(var i=0; i<$scope.tips.length; i++){
				// Need to create a new global variable variable.
				return $scope.total = 0;
				console.log($scope.total);
			}
		}


		// triggered upon ng-click w/ button. Tried with form submission but didn't work properly(reason?)
		$scope.submit = function(){
			$scope.defaultScope = $scope.waitstaffInput.$valid;
			//Calculates # of meals and pushes to view 
			$scope.mealCount = mealCount++;
			// Push value from view to new object(or array?) 
			$scope.tips.push($scope.tipPercent);
			console.log($scope.tips);
			
		}; 

	});