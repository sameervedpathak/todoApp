angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats ,$http,$state, $stateParams) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.getstudentlist = function(){
    $http.get(baseURL + 'getallstudentlist').success(function(res){
      console.log(res);
      $scope.studentlist = res;
    }).error(function(error){
      console.log("Please check the internet connection");
    });
  };

  console.log($stateParams.studentdata);

  if($stateParams.studentdata){
    $scope.studentdata = $stateParams.studentdata;
    console.log($scope.studentdata);
  }

  $scope.updatestudent = function(){
    console.log($scope.studentdata);
    $http.post(baseURL + 'Updatestudent' , $scope.studentdata).success(function(res){
      console.log(res);
      if(res.status == true){
        $state.go('tab.student');
      }else{
        console.log("Error",res);
      }
    }).error(function(error){
      console.log("Please check the internet connection");
    });
  }

  $scope.deletestud = function(stud){
    console.log(stud);
    $http.get(baseURL + 'deletestudent/' + stud.id).success(function(res){
      console.log(res);
      if(res.status == true){
        $scope.getstudentlist();
      }
    }).error(function(error){
      console.log("Please check the internet connection");
    });
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
