app.controller('TaskController', ['$scope', 'crudService', '$routeParams', '$http', function($scope, crudService, $routeParams, $http){
 
    var vm = $scope;
	window.vm=vm;
	vm.id= $routeParams && $routeParams.id || false;
    vm.data = [];
//	vm.gridTodoOptions={
//		columnDefs:[
//			{ name: 'ToDo'},
//			{ name: 'Before' }
//		],
//		enableCellEditOnFocus: true,
//		enableRowSelection: true,
//		selectionRowHeaderWidth: 60,
//		enableSelectAll: true,
//		multiSelect:true,
//		onRegisterApi:function(gridApi){
//			vm.gridTodoApi = gridApi;
//		}		
//	};
    var populateData = function(response){
        var data = response.data && response.data.docs ||[];
		vm.data=JSON.parse(JSON.stringify(data));
		if (vm.id){
			vm.d=vm.data[0] || {};
//			if (!vm.d.todo) vm.d.todo=[];
//			vm.gridTodoOptions.data=vm.d.todo;
		}
		
    };
//	vm.createEmail=function(){
//		vm.d.emails.push({});
//	};
//	vm.removeEmail = function(){	
//		vm.gridEmailsApi.grid.rows.map(function(r){
//			if (r.isSelected) vm.d.emails.splice(vm.d.emails.indexOf(r.entity),1);
//		});
//		
//    };	
    vm.read = function(){
		var fnd={"cat":"task"};
		if (vm.id) fnd._id=vm.id;
        crudService.fnd(fnd, populateData);
    };	
    vm.save = function(){
		vm.d.cat='task';
		if (vm.id=='new') delete(vm.id)
        crudService.set(vm.d,function(r){
			if (!vm.id){
				window.location="#/task/"+r.id;
			}
		});
    };
	vm.remove = function(){
        crudService.del(vm.d,function(r){
			window.location="#/task/";
		});
    };
    vm.init = function(){
        vm.read();
		var pr=function(){
			$('[ng-model="todo"]').focus();
		};
		$(pr);
    };
	vm.init();


        
        
}]);
