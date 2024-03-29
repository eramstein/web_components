'use strict';

app.directive('lstCompoundPharmacology', function(OpenPhacts) {
  return {
    restrict: 'E',
    transclude:true,
    replace:true,
    scope: {'item': '@',
            'filterForType': '@'},
    template: '<div ng-transclude></div>',
    link: function(scope, elm, attrs) {
        //get URI of the compound
        OpenPhacts.getURI(scope.item).then(function (compoundURI) {
            return compoundURI;
        })
        //use it to get info about that compound
        .then(function (compoundURI) {
            return OpenPhacts.getCompoundPharmacology(compoundURI, attrs.filterForType);
        })
        //update directive's transcluded template's scope with the OpenPhacts information (the transcluded template is $$nextSibling)
        .then(function (data) {
            console.log(data);
            scope.$$nextSibling.items = data;
        });
    }
  };
});