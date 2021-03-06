angular.module('app')

  .config(function($stateProvider){
        
    $stateProvider.state('app.client.auth', {
      url: '/auth',
      views: {
        'main@app': {
          controller: 'AuthCtrl',
          templateUrl: 'auth.tpl.html'
        }
      }
    });
  })

  .controller('AuthCtrl', function($scope, $mdToast){
    $scope.$root.docUrl = 'http://docs.feedhenry.com/v3/api/app_api.html#app_api-_fh_auth';
    $scope.$root.docLabel = '$fh.auth';

    $scope.submit = function(){
      $scope.working = true;

      $fh.auth({
        policyId:       $scope.data.policy,
        clientToken:    $fh.getFHParams().appid,
        endRedirectUrl: $scope.data.redirect || window.location.href,
        params: {
          userId:   $scope.data.username,
          password: $scope.data.password
        }
      }, function(res) {
        $scope.working = false;

        if(res.status === 'ok'){
          $scope.response = res.status === 'ok' ? 'Login Succeeded': 'Login Failed';
        }

        $scope.$apply();
      }, function(msg, err) {
        $scope.working = false;
        $mdToast.show($mdToast.simple().position('top right').content('Cloud call failed with error message: ' + msg));
        $scope.$apply();
      });
    }
  })
;

