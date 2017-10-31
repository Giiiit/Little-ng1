var app = angular.module('routerApp',['ui.router','ngGrid', 'ListModule', 'DetailModule','Add']);
/**
 *  $rootScope
 *  $state
 *  $stateParams
 **/
app.run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
/**
* 路由ui-router
* $stateProvider
* $urlRouterProvider
**/
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');//没有任何值得情况下去到index
    $stateProvider.state('index',{//登陆页面
        url:'/index',
        templateUrl:'tpls/loginForm.html'
    }).state('list',{//后台界面
        url: '/{eq:[0-9]{1,4}}',
        views: {
            '': {
                templateUrl: 'tpls/list.html'
            },
            'grid@list': {
                templateUrl: 'tpls/grid.html'
            }
            
        }
    }).state('add', {
            url: '/add',
            views: {
                '': {
                    templateUrl: 'tpls/list.html'
                },
                'add@add':{
                    templateUrl: 'tpls/addForm.html'
                }
            }
        })
    .state('detail', {
            url: '/detail',
            views: {
                '': {
                    templateUrl: 'tpls/list.html'
                },
                'see@detail':{
                    templateUrl: 'tpls/detail.html'
                }
            }
        })
})