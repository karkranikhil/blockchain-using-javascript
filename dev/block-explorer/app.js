var app = angular.module('myApp', []);
app.controller('myCtrl',['$scope', '$http', function($scope, $http) {
    console.log('in')
    $scope.block = null;
    $scope.transaction = null;
    $scope.addressData = null;
    $scope.initialSearchMade = false;
    $scope.searchTypeName=''
    $scope.searchTypeChange = function (s) {
        switch(true){
            case s === 'block':
            $scope.searchTypeName= 'Enter Block Hash'
            break;
            case s === 'transaction':
            $scope.searchTypeName= 'Enter transaction id'
            break;
            case s === 'address':
            $scope.searchTypeName= 'Enter address'
            break;
            default:
            $scope.searchTypeName= 'Enter address'
        }
        $scope.GenderSelected = s;
    };
    $scope.fetchBlock = function(blockHash) {
        $http.get(`/block/${blockHash}`)
        .then(response => {
            $scope.block = response.data.block;
            $scope.transaction = null;
            $scope.addressData = null;
        });
    };
    $scope.fetchTransaction = function(transactionId) {
        $http.get(`/transaction/${transactionId}`)
        .then(response => {
            $scope.transaction = response.data.transaction;
            $scope.block = null;
            $scope.addressData = null;
        });				
    };
    $scope.fetchAddressData = function(address) {
        $http.get(`/address/${address}`)
        .then(response => {
            $scope.addressData = response.data.addressData;
            if (!$scope.addressData.addressTransactions.length) $scope
                .addressData = null;
            $scope.block = null;
            $scope.transaction = null;
        });				
    };
    $scope.search = function(searchValue) {
        $scope.initialSearchMade = true;
        if ($scope.searchType === 'block') {
            $scope.fetchBlock(searchValue);
        }
        else if ($scope.searchType === 'transaction') {
            $scope.fetchTransaction(searchValue);
        }
        else if ($scope.searchType === 'address') {
            $scope.fetchAddressData(searchValue);
        }
    };
}]);