'use strict';

angular.module('hackLogicaApp')
  .controller('WorkCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.myInterval = 5000;
    $scope.serviceNSWSlides = [
    	{
    		image: 'assets/images/thumbs/thumb10.jpg'
    	}
    ];
    $scope.smhSlides = [
		{
			image: 'assets/images/thumbs/thumb11.jpg'
		}
    ];
    $scope.creSlides = [
		{
			image: 'assets/images/thumbs/thumb1.jpg'
		}
    ];
    $scope.lawpathSlides = [
		{
			image: 'assets/images/thumbs/thumb2.jpg'
		}
    ];
    $scope.addRollerSlides = [
		{
			image: 'assets/images/thumbs/thumb3.jpg'
		}
    ];
    $scope.aliftSlides = [
		{
			image: 'assets/images/thumbs/thumb4.jpg'
		}
    ];
    $scope.ingSlides = [
        {
            image: 'assets/images/thumbs/thumb12.jpg'
        }
    ];
  });
