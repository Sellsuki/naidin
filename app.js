(function(){
        var app = angular.module('store', []);
        app.controller('StoreController', ['$scope',function($scope){
            $scope.products = books;
            $scope.cart = [];
            $scope.total = 0;
            $scope.promoItemQuantity = 0;
            $scope.promoItemTotalPrice = 0;
            $scope.discountPercent = 0;
            $scope.discountReduction = 0;
            $scope.subtotal = 0;
            $scope.groupPromoQuantity = 0;
            $scope.tempTotal = 0;
            $scope.lowest = 0;
            $scope.tmp;
            $scope.cartsize = 0;
            $scope.addItemToCart = function(product){
                if ($scope.cart.length === 0){
                    product.count = 1;
                    $scope.cart.push(product);
                } else {
                    var repeat = false;
                    for(var i = 0; i< $scope.cart.length; i++){
                        if($scope.cart[i].id === product.id){
                            repeat = true;
                            $scope.cart[i].count +=1;
                        }
                    }
                    if (!repeat) {
                        product.count = 1;
                        $scope.cart.push(product);
                    }
                }
                $scope.lowest = $scope.findLowestPromoIndex();
                $scope.discountPercent = $scope.readDiscount();
                $scope.subtotal += parseFloat(product.price);
                /*
                console.log("$scope.discountPercent: "+$scope.discountPercent);
                console.log("$scope.groupPromoQuantityTotalPrice: "+ $scope.groupPromoQuantityTotalPrice);
                console.log("$scope.promoItemTotalPrice: "+$scope.promoItemTotalPrice);
                console.log("$scope.promoItemQuantity: "+$scope.promoItemQuantity);
                */
                $scope.calculateTotal();
            };
            /*this function capture the minimum count of eatch item in the cart. And
            use this value to multiplay with promoItemQuantity*/
            $scope.findLowestPromoIndex = function(){
                this.min = Number.POSITIVE_INFINITY;
                for(var i = 0; i< $scope.cart.length; i++)
                {
                    if($scope.cart[i].id <= 7)
                    {
                        if($scope.cart.length >= 1)
                        {
                            if($scope.cart[i].count <= this.min)
                            {
                                this.min = $scope.cart[i].count;
                            }
                        }
                    }
                }
                if(this.min === Infinity){ //if the first item in the cart isn't a promotion
                    return 0;
                }
                else
                    return this.min;
            };
            /*read the cart and return discount percent, and it also calculate the
            group promotion quantity total price*/
            $scope.readDiscount = function(){
                this.discount = 0;
                this.promoItemQuantity = 0;
                $scope.promoItemTotalPrice = 0;
                for(var i = 0; i < $scope.cart.length; i++){
                    if($scope.cart[i].id === 001 || $scope.cart[i].id === 002 ||
                       $scope.cart[i].id === 003 || $scope.cart[i].id === 004 ||
                       $scope.cart[i].id === 005 || $scope.cart[i].id === 006 ||
                       $scope.cart[i].id === 007){
                        $scope.promoItemQuantity++;
                        $scope.promoItemTotalPrice += $scope.cart[i].price;
                    }
                }
                if(this.promoItemQuantity === 2){
                    this.discount = .10;
                }
                if(this.promoItemQuantity === 3){
                    this.discount = .20;
                }
                if(this.promoItemQuantity === 4){
                    this.discount = .30;
                }
                if(this.promoItemQuantity === 5){
                    this.discount = .40;
                }
                if(this.promoItemQuantity === 6){
                    this.discount = .50;
                }
                if(this.promoItemQuantity === 7){
                    this.discount = .60;
                }
                $scope.groupPromoQuantityTotalPrice = $scope.lowest  * $scope.promoItemTotalPrice;
                return this.discount;
            };
            $scope.calculateTotal = function(){
                //if theres a discount
                $scope.discountReduction = $scope.groupPromoQuantityTotalPrice * $scope.discountPercent
                if($scope.discountPercent != 0){
                    $scope.total = $scope.subtotal - $scope.discountReduction;
                }
                else{
                    $scope.total = $scope.subtotal;
                }
            };
        }]);
    var books = [{
        id: 1,
        name: 'Harry Potter and the Philosopher Stone',
        price: 100.00

    },{
        id: 2,
        name: 'Harry Potter and the Chamber of Secrets',
        price: 100.00
    },
    {
        id: 3,
        name: 'Harry Potter and the Prisoner of Azkaban',
        price: 100.00
    },
    {
        id: 4,
        name: 'Harry Potter and the Goblet of Fire',
        price: 100.00
    },
    {
        id: 5,
        name: 'Harry Potter and the Order of the Phoenix',
        price: 100.00
    },
    {
        id: 6,
        name: 'Harry Potter and the Half-Blood Prince',
        price: 100.00
    },
    {
        id: 7,
        name: 'Harry Potter and the Deathly Hallows',
        price: 100.00
    },
    {
        id: 8,
        name: 'Lord of the Flies',
        price: 100.00
    }];

    })();
