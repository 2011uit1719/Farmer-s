//Define an angular module for our app
//var farmer = angular.module('farmer', ['ionic']);

var farmer = angular.module('farmer', ['ionic']);


farmer.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    $rootScope.selectedProducts ={};
    $rootScope.noOfSelectedProducts = 0;
})
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController

farmer.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/home.html',
        controller: 'homeController'
      }
    }
  })
  
  .state('app.plp', {
    parent: 'app',
    url: '/plp/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/plp.html',
        controller: 'plpController'
      }
    }
  })
  
  .state('app.pdp', {
    parent: 'app',
    url: '/pdp/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/app/pdp.html',
        controller: 'pdpController'
      }
    }
  })
  
  $urlRouterProvider.otherwise('/app/home');
    });

farmer.factory('Data', function () {
    return { 'selectedProducts': {} };
});


farmer.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/app/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
 
farmer.controller('homeController', function($scope,$http) {
     
    $http.get('json/categoriesDetails.json',{}).success(function(data){
			$scope.categories = data;
        
    
		});
     
});

farmer.controller('plpController',function($scope,Data,$http,$stateParams,$location,$rootScope) {
    
  //  $scope.quantity = {"qty1":0};
  
 //   Data.plpID = $stateParams.id;
    
   console.log($rootScope.selectedProducts);
    
  $http.get('json/category'+$stateParams.id+'Details.json',{}).success(function(data){
			$scope.productByCate = data;
		});
   
    
    $scope.pdpLocation = function(pdpURL) {
        console.log("Hello");
        window.location.href='#/app/pdp/'+pdpURL;
    }
    /*$scope.addOne = function(qtyId,ID) {
        $scope.product.qty = qtyId+1;
      //  qtyId.qty = qtyId.qty+1;
    //    $scope.quantity.ID = qtyId.ID;
    //    $scope.quantity.qty = qtyId.qty;
        
      //  $scope.quantity.qty = $scope.quantity.qty+1;
        /*$scope.quantity.qty = $scope.quantity.qty+1;
        console.log($scope.quantity);
    }*/
    
    $scope.deleteOne = function() {
        console.log("Deleted Successfully");
    }
    
    $scope.changeQuantity = function(id,change){
        if(!$rootScope.selectedProducts[id]){
            $rootScope.selectedProducts[id] = 0;
        }
        if(change == 'inc'){
            $rootScope.selectedProducts[id] = $rootScope.selectedProducts[id] +1;
        }
        if(change == 'dec' && $rootScope.selectedProducts[id]!=0){
            $rootScope.selectedProducts[id] = $rootScope.selectedProducts[id] -1;
            if($rootScope.selectedProducts[id] == 0)
                delete $rootScope.selectedProducts[id];
        }
        $rootScope.noOfSelectedProducts = Object.keys($rootScope.selectedProducts).length;
    };
    
    $scope.goBack = function() {
        window.history.back();
    }
    
});

farmer.controller('pdpController',function($scope,Data,$http,$stateParams,$location){
    
    $http.get('json/category'+Data.plpID+'Details.json',{}).success(function(data){
            $scope.productByCate = data;
        
            for(i=0;i<data.length;i++){
                if(data[i].id == $stateParams.id){
                    $scope.pdpProduct = data[i];
                    break;
                }
            }
        });
    
    $scope.goBack = function() {
        window.history.back();
    }
    
    });
 