angular.module("waitstaffCalc", ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider

            .when('/home', {
                templateUrl: 'home.html',
                controller: 'updateContent',
            })
            .when('/new-meal', {
                templateUrl: 'new-meal.html',
                controller: 'updateContent',
            })

        .when('/my-earnings', {
            templateUrl: 'my-earnings.html',
            controller: 'updateContent'
        })

        .otherwise({ redirectTo: '/home' })
    }])

.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });

    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $timeout(function() {
            $rootScope.isLoading = false;
        }, 500);
    });
})

.factory('inputData', function() {
    var data = {
        tipSummation: 0, 
        mealCount: 0,
        defaultScope: false,
        tips:[]
    }

    return data;

})

.controller("updateContent", function($rootScope, $scope, inputData) {

    $scope.defaultScope = inputData.defaultScope;
    // start mealcount. Starts at 1 to bring initial displayed value to 1.
    $scope.mealCount = inputData.mealCount;
    // create a new object to store tip values throughout submissions.
    $scope.tips = inputData.tips;

    // triggered upon ng-click w/ button. Tried with form submission but didn't work properly(reason?)
    $scope.submit = function() {
        // Makes sure numbers are valid numbers
        inputData.defaultScope = $scope.waitstaffInput.$valid;
        $scope.defaultScope = inputData.defaultScope;
        // Conduct calculations for Customer Charges Field
        $scope.subTotalAmount = $scope.baseMealPrice + ($scope.taxRate / 100 * $scope.baseMealPrice);
        $scope.tipPercentAmount = ($scope.tipPercent / 100) * $scope.baseMealPrice;
        // $scope.tipPercentAmount = inputData.tipAmount
        $scope.totalAmount = $scope.subTotalAmount + $scope.tipPercentAmount;

        // Push value from view to array
        inputData.tips.push($scope.tipPercentAmount);

        //Calculates # of meals and pushes to view 
        $scope.mealCount++;
        inputData.mealCount++;
        $scope.tipSummation();

    };
    // For loop that iterates through the array values, adding them up.
    $scope.tipSummation = function() {
        var total = 0;
        for (var i = 0; i < $scope.tips.length; i++) {
            total += $scope.tips[i];
        }
        inputData.tipSummation = total;
        return total;
    };
    // Keeps an eye on the tips array and makes changes when it notices a change
    $scope.$watchCollection("tips", function() {
        $scope.totalTips = $scope.tipSummation();
    });

    // Clear fields upon cancel button click
    $scope.clearMealDetailFields = function() {
        $scope.baseMealPrice = "";
        $scope.taxRate = "";
        $scope.tipPercent = "";
    };

    $scope.resetForm = function() {
        $scope.clearMealDetailFields();
        inputData.defaultScope = false;
        $scope.mealCount = 0;
        $scope.tips = [];
    }

})
