// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  var xml= new XMLHttpRequest();
  var url="http://groupcreativesolution.xyz/promocao.php";
  xml.open("GET",url);
  xml.send(null);
  xml.onreadystatechange=function(){
  if(xml.status==200 & xml.readyState===4){

     window.localStorage.setItem("promoca",xml.responseText);

  }
  }
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    params:{nomes:null,img:null,id:null,produto:null},
    controller: 'AppCtrl'
  })
  .state('app.playlist', {
    url: '/playlist',
    cache:true,
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        params: {nome:null},
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.cart', {
      url: '/cart',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/cart.html',
          controller: 'cartCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
        //  controller: 'loginCtrl'
        }
      }
    })

;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
