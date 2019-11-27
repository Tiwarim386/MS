var app = angular.module('ems',['ngRoute']);

// routing happening here to make the app a Single Page Application
app.config(function($routeProvider){
$routeProvider
	.when("/",{
		templateUrl:"./views/option.ejs",
		controller: "emscontrol"
		})
	.when("/checkin",{
		templateUrl: "./views/checkin.ejs",
		controller: "emscontrol"
	})
	.when("/checkout",{
		templateUrl: "./views/checkout.ejs",
		controller: "emscontrol"
	})
	.when("/logbook",{
		templateUrl: "./views/logbook.ejs",
		controller: "emscontrol"
	})
	.otherwise({
		redirectTo: "/"
	})
});

// angular app controller defined
app.controller("emscontrol",function($scope,$http,$window){
$scope.user={};
$scope.guestemail='';

// to get details of all entry logs from logbook database
$http.get('/logentry')
		.success(function(response){
 	 	$scope.logentries = response.data;
 	 	})
 	 	.error(function(error){
 	 	$window.alert(error.message);
 	 	})

// when checkin form is submitted entry should be added in database
$scope.checkin = function() {
	$http.post('/checkIn',$scope.user)
	.success(function(response){
		console.log(response);
		$window.alert(response.message);
		$scope.user={};
	})
	.error(function(error){
		console.log(error);
		$window.alert(error.message);
		$scope.user={};
	});  
};

// when checkout form is submitted checkout time should be updated in the entry
$scope.checkout = function() {
	console.log('in here');
	$http.patch('/checkOut/'+$scope.guestemail)
	.success(function(response){
		console.log(response);

		/* After updating checkout time, the entry should also be delete and added to 
		logbook database to maintain all entry logs */
		$http.delete('/deleteentry/'+$scope.guestemail)
		.success(function(resp){
		console.log(resp);
		})
		.error(function(err){
		console.log(err);
		});
		$window.alert(response.message);
		$scope.guestemail=''; 
	})
	.error(function(error){
		console.log(error);
		$window.alert(error.message);
		$scope.guestemail=''; 
	});  
};
	
});