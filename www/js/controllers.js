angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http) {

  $scope.mostrar=function(){
                 $scope.mostra=true;
               }
      $scope.showMe=function(){
                   $scope.list=true;
               }

               $http.get("http://groupcreativesolution.xyz/supermercado.php").then(function(arr){


                          $scope.mercados=arr.data;

              });
})

.controller('PlaylistsCtrl', function($scope,$http) {

  $scope.promos = [];
  var i=0;
 $scope.loadMore = function() {
       $http.get("http://groupcreativesolution.xyz/promocao.php").then(function(arr){
//  window.localStorage.setItem("promoc",arr.data);

                        var testes=arr.data;
           var list=testes;
     $scope.promos.push(list[i]);
     $scope.$broadcast('scroll.infiniteScrollComplete');
     i++;

              });


 };

 $scope.$on('$stateChangeSuccess', function() {
   $scope.loadMore();
 });

  if(JSON.parse(window.localStorage.getItem("promos")!=null)){
  var lista=JSON.parse(window.localStorage.getItem("promos"));

$scope.Vtotal=window.localStorage.getItem("full");
$scope.total=lista.length;
soma=parseFloat(window.localStorage.getItem("full"));
  }



})

.controller('PlaylistCtrl', function($scope, $stateParams,$ionicModal,$http) {
  $scope.list=[];

  var soma=0;
 $scope.Vtotal=0;
  if(JSON.parse(window.localStorage.getItem("promos"))!=null){
    $scope.list=JSON.parse(window.localStorage.getItem("promos"));

$scope.Vtotal=window.localStorage.getItem("total");

soma=parseFloat(window.localStorage.getItem("total"));
$scope.total=$scope.list.length;
  }

$scope.share=function(nome, valor,validade,mercado,img){
   window.plugins.socialsharing.share("Promoção de "+nome+"\n R$:"+valor+" \n Validade :"+validade+"\n No "+mercado,'Ofertas do Aplicativo Sacola Cheia','http://groupcreativesolution.xyz/img/app/'+img,'https://play.google.com/store/apps/details?id=com.groupcreativesolution.sacolacheia',function(result){

            }, function(result){
                alert('error: ' + result);
            });
        };


$scope.adicionar=function(no,va,img,val){

$scope.list.push({nome:no,valor:va,image:img,validade:val});

soma=parseFloat(va)+soma;

$scope.salvar();
$scope.compra=$scope.list;
$scope.Vtotal=soma;
$scope.total=$scope.list.length;
window.localStorage.setItem("promo",JSON.stringify($scope.list));
window.localStorage.setItem("total",$scope.Vtotal);

  };
  $scope.remove=function($index){
var valor=0.0;
    $scope.list.splice($index,1);
  for(var i=0;i<$scope.list.length;i++){
    valor=parseFloat(valor)+ parseFloat($scope.list[i].valor);

  }
  $scope.Vtotal=valor;
  $scope.total=$scope.list.length;
  soma=$scope.Vtotal;
};


  $scope.salvar=function(){

    window.localStorage.setItem("promos",JSON.stringify($scope.list));
    window.localStorage.setItem("full",$scope.Vtotal);
  }



                    $scope.mostrar=function(){
                	$scope.mostra=true;
                }
  $scope.id=$stateParams.id;
  $scope.produto=$stateParams.nomes;
  var lista=JSON.parse(window.localStorage.getItem("promocao"));
  $scope.promos=lista;

for(var x=0;x<lista.length;x++){
  if(lista[x].id==$scope.id){
    var letra = lista[x].nome.split(" ");

      $scope.nome1=letra[0];


  //  $scope.nometeste=lista[x].nome;
  }
}
//modal
$ionicModal.fromTemplateUrl('my-modal.html', {
scope: $scope,
animation: 'slide-in-up'
}).then(function(modal) {
$scope.modal = modal;
});
$scope.openModal = function() {

$scope.modal.show();
};
$scope.closeModal = function() {
  $scope.salvar();;
$scope.modal.hide();
};
})
.controller('cartCtrl',
function ($scope, $stateParams) {
  $scope.nome=$stateParams.nomes;
  $scope.fundo=$stateParams.banner;


    var lista=JSON.parse(window.localStorage.getItem("promocao"));


                              $scope.promos=lista;

});
