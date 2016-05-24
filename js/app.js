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

.controller("updateContent", function($rootScope, $scope) {

    $rootScope.defaultScope = false;
    // start mealcount. Starts at 1 to bring initial displayed value to 1.
    $rootScope.mealCount = 0;
    // create a new object to store tip values throughout submissions.
    $scope.tips = [];

    // triggered upon ng-click w/ button. Tried with form submission but didn't work properly(reason?)
    $scope.submit = function() {
        // Makes sure numbers are valid numbers
        $rootScope.defaultScope = $scope.waitstaffInput.$valid;

        // Conduct calculations for Customer Charges Field
        $rootScope.subTotalAmount = $scope.baseMealPrice + ($scope.taxRate / 100 * $scope.baseMealPrice);
        $rootScope.tipPercentAmount = ($scope.tipPercent / 100) * $scope.baseMealPrice;
        $rootScope.totalAmount = $scope.subTotalAmount + $scope.tipPercentAmount;

        // Push value from view to array
        $scope.tips.push($rootScope.tipPercentAmount);

        //Calculates # of meals and pushes to view 
        $rootScope.mealCount++;
        console.log($rootScope.mealCount);
        $rootScope.tipSummation();

    };
    // For loop that iterates through the array values, adding them up.
    $rootScope.tipSummation = function() {
        var total = 0;
        for (var i = 0; i < $scope.tips.length; i++) {
            total += $scope.tips[i];
        }
        console.log()
        return total;
    };
    // Keeps an eye on the tips array and makes changes when it notices a change
    $rootScope.$watchCollection("tips", function() {
        $rootScope.totalTips = $rootScope.tipSummation();
    });

    // Clear fields upon cancel button click
    $rootScope.clearMealDetailFields = function() {
        $rootScope.baseMealPrice = "";
        $rootScope.taxRate = "";
        $rootScope.tipPercent = "";
    };

    $rootScope.resetForm = function() {
        $rootScope.clearMealDetailFields();
        $rootScope.defaultScope = false;
        $rootScope.mealCount = 0;
        $rootScope.tips = [];
    }
});
