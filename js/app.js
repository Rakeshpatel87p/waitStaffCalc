console.log("working")

// 1. Upon click, need to validate that user has entered number
// 		1A. If valid, customerCharges & Earnings info updates
// 				1.1. Need to do calculations
// 				1.2. Need to keep cumulative Tip total, meal count, and updated average in Earnings section
// 		1B. If invalid, need to tell user what went wrong and allow for resubmission


// Hit submit ---> values go to controller to make sure they are correct ---> No, then send error message
// Hit submit (ng-submit=function()) --> Values go to controller for evaluation ---> calculations are made ---> return values to View
// Tip amount gets passed to EarnInfo, meal count++, and two values are divided ---> value gets returned to view

angular.module("waitstaffCalc", [])
	.controller("updateContent", function($scope){

		$scope.defaultScope = false;
		var mealCount = 1;
		$scope.tips = {};

		$scope.submit = function(){
			$scope.defaultScope = $scope.waitstaffInput.$valid;
			$scope.mealCount = mealCount++;
			$scope.tips.push({{tipPercent}});
			console.log($scope.tips)
			
		}; 

	});