var app = angular.module('invoiceApp', []);

app.controller('myCtrl', function($scope, $http) {
    $http.get("mockup/senderName.json").then(function (response) {
        $scope.myData = response.data.records;
    });

    $scope.showSenderList = false;
    $scope.toggleSenderList = function() {
        $scope.showSenderList = !$scope.showSenderList;
    };
    
    $scope.senderName = "";
    $scope.chooseSender = function (sender) {
        $scope.senderName = sender.FirstName + " " + sender.LastName;
        //Close List
        $scope.showSenderList = false;
    }


//});

//app.controller('customerCtrl', function($scope, $http) {
    $http.get("mockup/customers.json").then(function (response) {
        $scope.myCustomers= response.data.records;
    });

    $scope.showCustomerList = false;
    $scope.toggleCustomerList  = function() {
        $scope.showCustomerList = !$scope.showCustomerList;
    };

    $scope.customerCompany = "";
    $scope.customerName = "";
    $scope.customerStreet = "";
    $scope.customerZIP = "";
    $scope.customerCity = "";
    $scope.chooseCustomer = function (sender) {
        $scope.customerCompany = sender.customerCompany;
        $scope.customerName = sender.customerName;
        $scope.customerStreet = sender.customerStreet;
        $scope.customerZIP = sender.customerZIP;
        $scope.customerCity = sender.customerCity;
        //Close List
        $scope.showCustomerList = false;
    }
//});

//app.controller('invoiceCtrl', function($scope) {
    //Array of all Invoice Positions
    $scope.invoicePositions = [];
    //Init Var for Data Binding
    $scope.positionDescription = "";
    $scope.amount = "";
    $scope.unitCostEUR = "";
    $scope.unitCostCENT = "";
    $scope.discount = "";
    $scope.valueAddedTax = "19";

    $scope.addPosition = function(){
        var invoicePosition = new Object();
        invoicePosition.positionDescription =  $scope.positionDescription;
        invoicePosition.amount = $scope.amount;
        invoicePosition.unitCost = $scope.unitCostEUR + ($scope.unitCostCENT % 100) / 100;
        invoicePosition.discount = ($scope.discount === "")? 0:$scope.discount
        invoicePosition.valueAddedTax = $scope.valueAddedTax;
        invoicePosition.totalPrice = invoicePosition.amount * invoicePosition.unitCost;


       // alert(JSON.stringify(invoicePosition));
        $scope.invoicePositions.push(invoicePosition);

    }

    $scope.deletePosition = function(index) {
        $scope.invoicePositions.splice(index, 1);
    }

    $scope.downloadPDF = function() {

        var data = new Object();
        data.senderName = $scope.senderName;
        data.customerCompany = $scope.customerCompany;
        data.customerName = $scope.customerName;
        data.customerStreet = $scope.customerStreet;
        data.customerZIP = $scope.customerZIP;
        data.customerCity = $scope.customerCity;
        data.invoicePositions = $scope.invoicePositions;


        $http.post("localhost", data).then(
            function(response){
                alert(response);
            },
            function(response){
                alert("Fehler");
            }
        );
    }

});
