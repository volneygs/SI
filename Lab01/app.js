var app = angular.module("ispotifai", []);

app.controller("ispotifaiCtrl", function($scope){

    $scope.artistas = [];
    $scope.albuns = [];
    $scope.menuArtista = false;
    $scope.menuMusica= false;

    $scope.adicionarArtista = function(artista){

      var key = false;

      for (var i = 0; i < $scope.artistas.length; i++) {
        if($scope.artistas[i].nome === artista.nome && key === false){
          alert("Artista já existente no sistema!");
          key = true;
        }
      }

      if(key === false){
        $scope.artistas.push(artista);
      }

      delete $scope.artista;

    };

    $scope.adicionaMusica = function(musica){

      var key = false;

      for (var i = 0; i < $scope.musicas.length; i++) {
        if($scope.albuns[i].nome === musica.album){
          key = true;
        }
      }

      if(key === true){

      }else{
        
      }

    }

    $scope.criaAlbum = function(musica){

      var album;
      album.nome = musicas.album;

      return album;

    }

    $scope.alteraMenu = function(number){

      if(number === 1){
        $scope.menuArtista = true;
        $scope.menuMusica = false;
      }else if (number === 2) {
        $scope.menuMusica = true;
        $scope.menuArtista = false;
      }

    };

});
