var app = angular.module("ispotifai", []);

app.controller("ispotifaiCtrl", function($scope){

    $scope.artistas = [];
    $scope.albuns = [];
    $scope.favoritos = [];
    $scope.listaArtistaProcurado = [];
    $scope.artistaProcurado = "";
    $scope.artistaSolicitado = "";
    $scope.menuArtista = false;
    $scope.menuMusica = false;
    $scope.menuListaDeArtistas = false;

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

    $scope.adicionarMusica = function(musica){

      var naoAdicionado = true;

      if($scope.albuns.length === 0){

        $scope.albuns.push($scope.criaAlbum(musica));
        alert("Música adicionada com sucesso");

      }else{
        for (var i = 0; i < $scope.albuns.length; i++) {
          if($scope.verificaAlbumIgual($scope.albuns[i], musica)){
            if($scope.verificaMusicaIgual($scope.albuns[i], musica)){
              alert("Não pode existir duas músicas com o mesmo nome no mesmo álbum");
            }else{
              if(naoAdicionado){
                $scope.albuns[i].musicas.push(musica);
                alert("Música adicionada com sucesso");
                key = false;
              }
            }

          }else{
            if(naoAdicionado){
              $scope.albuns.push($scope.criaAlbum(musica));
              alert("Música adicionada com sucesso");
              key = false;
            }
          }
        }
      }

      delete $scope.musica;
    };

    $scope.procuraArtista = function(procurado){

      $scope.alteraMenu(3);

      $scope.listaArtistaProcurado = [];

      for (var i = 0; i < $scope.artistas.length; i++) {
        if($scope.artistas[i].nome.indexOf(procurado.nome) !== -1){
          $scope.listaArtistaProcurado.push($scope.artistas[i]);
        }
      }

      delete $scope.procurado;

    };

    $scope.informacoesArtista = function(){

    }

    $scope.adicionaListaDeFavoritos = function (artista){

      $scope.favoritos.push(artista);
    }

    $scope.criaAlbum = function(musica){

      var album = new Object();
      album.nome = musica.album;
      album.artista = musica.artista;
      album.musicas = [];
      album.musicas.push(musica);

      return album;

    };

    $scope.verificaAlbumIgual = function(album, musica){

      if(album.nome === musica.album){
        return true;
      }

      return false;

    };

    $scope.verificaMusicaIgual = function(album, musica){

      for (var i = 0; i < album.musicas.length; i++) {
        if(album.musicas[i].nome === musica.nome){
          return true;
        }
      }

      return false;
    };

    $scope.alteraMenu = function(number){

      if(number === 1){
        $scope.menuArtista = true;
        $scope.menuMusica = false;
        $scope.menuListaDeArtistas = false;
      }else if (number === 2) {
        $scope.menuMusica = true;
        $scope.menuArtista = false;
        $scope.menuListaDeArtistas = false;

      }else if (number === 3) {
        $scope.menuListaDeArtistas = true;
        $scope.menuMusica = false;
        $scope.menuArtista = false;

      }

    };

});
