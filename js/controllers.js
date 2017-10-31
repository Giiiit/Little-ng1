/***
 * 登录
 * ***/
app.controller('validateCtrl',function($scope){
    $scope.user={
        name:'',
        password:''
    };
    $scope.arrs={
        name:'admin',
        password:'111111'
    };
    $scope.compare = function(user){
        $scope.user= user;
        $scope.same = angular.equals($scope.user.name,$scope.arrs.name)//对比
        $scope.same1 = angular.equals($scope.user.password,$scope.arrs.password)//对比
        console.log($scope.same);
        console.log($scope.same1);
        console.log($scope.user.name);
        if($scope.same == false){
            $scope.user.name='用户名错误';
            console.log(user.name);
        };
        if($scope.same1 == false){
            $scope.user.password='';
            console.log(user.password);
        }
    }
});
/**
*后台界面
**/
app.controller('list',function($scope,$http){
    $scope.list ={};
    $http.get('data/list.json')
        .success(function (item){
            $scope.list = item;
            console.log($scope.list)
        });
});
/**
 * 列表模块
 **/
var ListModule = angular.module("ListModule", []);
ListModule.controller('listCtrl', function($scope, $http, $state, $stateParams) {
    //分页
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.items = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //取路由传的eq值 加载json
    console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('./data/item' + $stateParams.eq + '.json')//通过传值调用不同json
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('./data/item' + $stateParams.eq + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'items',//表格中显示的数据来源
        multiSelect: false,//是否能多选
        enableCellSelection: true, //是否能选择单元格
        i18n: 'zh-cn',
        columnDefs: [{
            field: 'index',//这里是数据中的属性名
            displayName: '序号', //这里是表格的每一列的名称
            width: 60,//表格的宽度
            pinnable: false,
            sortable: false//是否能排序
        }, {
            field: 'name',
            displayName: '标题',
            enableCellEdit: true
        }, {
            field: 'extension',
            displayName: '原生接口实现',
            enableCellEdit: true,
            width: 220,
            pinnable: false,
            sortable: true
        }, {
            field: 'performance',
            displayName: '性能',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'speed',
            displayName: '开发速度',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'require',
            displayName: '技术要求',
            enableCellEdit: false
        }],
        enablePaging: true,//是否能翻页
        showFooter: true,//是否显示表尾
        totalServerItems: 'totalServerItems',//数据的总条数 
        pagingOptions: $scope.pagingOptions,//分页部分
        // 搜索条
        filterOptions: $scope.filterOptions,//数据过滤部分
    };
});


/**
 * 详情模块
 * @type {[type]}
 */
var detailModule = angular.module("DetailModule", []);
detailModule.controller('DetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
});
// 新增
var add = angular.module('Add',['ngAnimate', 'ngSanitize','ui.bootstrap']);
add.controller('addctrl',function($scope,$http,$state, $stateParams){
    function abf(){
        $scope.userInfo={};//空
        $scope.userInfo.dt = new Date();//日历
        $scope.popup2 = {
            opened: false
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };    
        $scope.types=[ //下拉列表
            {id:0,name:'Angular+ionic'},
            {id:1,name:'React Native'},
            {id:2,name:'native'}
        ];
         $scope.userInfo.zw = '1';//默认选中一个 
    };
    abf();//执行
    $scope.geto =function(user){        
        $scope.userInfo = user
        console.log($scope.userInfo.dt.toISOString().slice(0,10))//日期格式化
        $http({
            url:'data/item4.json',
            method:'POST',
            data:$scope.userInfo,
            data:JSON.stringify($scope.userInfo)
        }).success(function(da){
            console.log(da);
            // console.log($stateParams);
             window.history.back();
        });
    };
    $scope.clearForm = function(){//清空
        abf();
    }
   
})

