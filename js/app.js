angular.module("waitstaffCalc", [])
	.controller("updateContent", function($scope){

		$scope.defaultScope = false;
		// start mealcount. Starts at 1 to bring initial displayed value to 1.
		var mealCount = 1;
		// create a new object to store tip values throughout submissions.
		$scope.tips = [];

		// triggered upon ng-click w/ button. Tried with form submission but didn't work properly(reason?)
		$scope.submit = function(){
			// Makes sure numbers are valid numbers
			$scope.defaultScope = $scope.waitstaffInput.$valid;
			
			// Conduct calculations for Customer Charges Field
			$scope.subTotalAmount = $scope.baseMealPrice + ($scope.taxRate/100 * $scope.baseMealPrice);
			$scope.tipPercentAmount = ($scope.tipPercent/100) * $scope.baseMealPrice;
			$scope.totalAmount = $scope.subTotalAmount + $scope.tipPercentAmount;
			
			// Push value from view to array
			$scope.tips.push($scope.tipPercentAmount);
			console.log($scope.tips);
			
			//Calculates # of meals and pushes to view 
			$scope.mealCount = mealCount++;
			$scope.tipSummation();

		};
		// For loop that iterates through the array values, adding them up.
		$scope.tipSummation = function(){
			var total = 0;
			for(var i=0; i<$scope.tips.length; i++){								
				total += $scope.tips[i];
			}

			return total;
		};
		// Keeps an eye on the tips array and makes changes when it notices a change
		$scope.$watchCollection("tips", function() {
    		$scope.totalTips = $scope.tipSummation();
  });

// Clear fields upon cancel button click
	$scope.clearMealDetailFields = function(){
		$scope.baseMealPrice = "";
		$scope.taxRate = "";
		$scope.tipPercent = "";
	};

	$scope.resetForm = function(){
		$scope.clearMealDetailFields();
		$scope.defaultScope = false;
		mealCount=1;
		$scope.tips = [];
	}
});