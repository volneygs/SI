var app = angular.module("ispotifai", []);

app.controller("ispotifaiCtrl", function($scope){

    $scope.artistas = [];
    $scope.albuns = [];
    $scope.favoritos = [];
    $scope.listaArtistaProcurado = [];
    $scope.playlists = [];
    $scope.artistaProcurado = "";
    $scope.artistaModal = "";
    $scope.playlistModal = "";
    $scope.artistaExcluir = "";
    $scope.playlistExcluir ="";
    $scope.musicaExcluir = "";
    $scope.menuArtista = false;
    $scope.menuMusica = false;
    $scope.menuListaDeArtistas = false;
    $scope.menuHome = false;
    $scope.menuFavoritos = false;
    $scope.menuNovaPlaylist = false;
    $scope.menuPlaylists = false;

    $scope.adicionaMusicaPlaylist = function(musicaAdd){

      for (var i = 0; i < $scope.albuns.length; i++) {
        for (var j = 0; j < $scope.albuns[i].musicas.length; j++) {
          if($scope.albuns[i].musicas[j].nome === musicaAdd){
            $scope.playlistModal.musicas.push($scope.albuns[i].musicas[j]);
            delete $scope.musicaAdd;
            return true;
          }
        }
      }

      alert("Música não cadastrada no sistema!");

      delete $scope.musicaAdd;

      return false;

    }


    $scope.removeMusicaPlaylist = function(){

      var naoExcluido = true;

      for (var i = $scope.playlistModal.musicas.length -1; i >= 0; i--) {
        if($scope.playlistModal.musicas[i].nome === $scope.musicaExcluir.nome && naoExcluido){
          $scope.playlistModal.musicas.splice(i,1);
          naoExcluido = false;
        }
      }
    }

    $scope.criaPlaylist = function(playlist){

      var naoIguais = true;

      for (var i = 0; i < $scope.playlists.length; i++) {
        if($scope.playlists[i].nome === playlist.nome && naoIguais){
          naoIguais = false;
          alert("Você não pode criar duas playlists com o mesmo nome!")
        }
      }

      if(naoIguais){
        playlist.musicas = [];
        $scope.playlists.push(playlist);
      }

      delete $scope.playlist;
    };

    $scope.removePlaylist = function(){

      var naoRemovido = true;

      for(var i = $scope.playlists.length-1; i >= 0; i--){
        if ($scope.playlists[i].nome === $scope.playlistExcluir.nome && naoRemovido){
          $scope.playlists.splice(i,1);
          naoRemovido = false;
        }
      }
    };

    $scope.adicionarNota = function(artista, nota){
      if(nota > 10 || nota < 0){
        alert("A nota deve estar entre 0 e 10!")
      }else{
        artista.nota = nota;
      }

      delete $scope.nota;
    }

    $scope.adicionarArtista = function(artista){

      var key = false;

      for (var i = 0; i < $scope.artistas.length; i++) {
        if($scope.artistas[i].nome === artista.nome && key === false){
          alert("Artista já existente no sistema!");
          key = true;
        }
      }

      if(key === false){

        artista.albuns = [];
        artista.nota = "-";
        artista.ultimaMusica = "Nenhuma música ouvida!"

        for (var i = 0; i < $scope.albuns.length; i++) {
          if ($scope.albuns[i].artista === artista.nome){
            artista.albuns.push($scope.albuns[i]);
          }
        }
        $scope.artistas.push(artista);
      }

      delete $scope.artista;

    };

    $scope.menuArtistaModal = function(artistaProcurado){
      $scope.artistaModal = artistaProcurado;
    }

    $scope.menuPlaylistModal = function(playlistSelecionada){
      $scope.playlistModal = playlistSelecionada;
    }


    $scope.adicionarMusica = function(musica){

      var naoAdicionado = true;

      if($scope.albuns.length < 1){

        $scope.albuns.push($scope.criaAlbum(musica));
        alert("Música adicionada com sucesso");

      }else{
        for (var i = 0; i < $scope.albuns.length; i++) {
          if($scope.verificaAlbumIgual($scope.albuns[i], musica)){
            if($scope.verificaMusicaIgual($scope.albuns[i], musica) && naoAdicionado){
              alert("Não pode existir duas músicas com o mesmo nome no mesmo álbum");
              naoAdicionado = false;
            }else{
              if(naoAdicionado){
                $scope.albuns[i].musicas.push(musica);
                alert("Música adicionada com sucesso");
                naoAdicionado = false;
              }
            }

          }else{
            if(naoAdicionado){
              $scope.albuns.push($scope.criaAlbum(musica));
              alert("Música adicionada com sucesso");
              naoAdicionado = false;
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

    $scope.adicionaListaDeFavoritos = function (artista){

      var jaAdicionado = true;

      for (var i = 0; i < $scope.favoritos.length; i++) {
        if ($scope.favoritos[i].nome === artista.nome && jaAdicionado) {
          alert("Artista já foi adicionado a lista de favoritos!");
          jaAdicionado = false;

        }
      }

      if(jaAdicionado){
        $scope.favoritos.push(angular.copy(artista));
        alert("Artista adicionado com sucesso!");
      }
    }

    $scope.excluirDaListaDeFavoritos = function(){

      var naoExcluido = true;

      for (var i = $scope.favoritos.length -1; i >= 0; i--) {
        if($scope.favoritos[i].nome === $scope.artistaExcluir.nome && naoExcluido){
          $scope.favoritos.splice(i,1);
          naoExcluido = false;
        }
      }
    }

    $scope.confirmaExcluirArtistaFavoritos = function(artista){
      $scope.artistaExcluir = artista;
    }

    $scope.confirmaExcluirPlaylist = function(playlist){
      $scope.playlistExcluir = playlist;
    }

    $scope.confirmaExcluirMusica = function(musica){
      $scope.musicaExcluir = musica;
    }

    $scope.criaAlbum = function(musica){

      var album = new Object();
      album.nome = musica.album;
      album.artista = musica.artista;
      album.musicas = [];
      $scope.adicionaAlbumAoArtista(album);
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

      if(number === 0) {
        $scope.menuHome = true;
        $scope.menuArtista = false;
        $scope.menuMusica = false;
        $scope.menuListaDeArtistas = false;
        $scope.menuFavoritos = false;
        $scope.menuNovaPlaylist = false;
        $scope.menuPlaylists = false;

      }else if(number === 1){
        $scope.menuArtista = true;
        $scope.menuMusica = false;
        $scope.menuListaDeArtistas = false;
        $scope.menuHome = false;
        $scope.menuFavoritos = false;
        $scope.menuNovaPlaylist = false;
        $scope.menuPlaylists = false;

      }else if (number === 2) {
        $scope.menuMusica = true;
        $scope.menuArtista = false;
        $scope.menuListaDeArtistas = false;
        $scope.menuHome = false;
        $scope.menuFavoritos = false;
        $scope.menuNovaPlaylist = false;
        $scope.menuPlaylists = false;

      }else if (number === 3) {
        $scope.menuListaDeArtistas = true;
        $scope.menuMusica = false;
        $scope.menuArtista = false;
        $scope.menuHome = false;
        $scope.menuFavoritos = false;
        $scope.menuNovaPlaylist = false;
        $scope.menuPlaylists = false;

      }else if (number === 4){
        $scope.menuFavoritos = true;
        $scope.menuListaDeArtistas = false;
        $scope.menuMusica = false;
        $scope.menuArtista = false;
        $scope.menuHome = false;
        $scope.menuNovaPlaylist = false;
        $scope.menuPlaylists = false;

      }else if(number ===5){
        $scope.menuNovaPlaylist = true;
        $scope.menuFavoritos = false;
        $scope.menuListaDeArtistas = false;
        $scope.menuMusica = false;
        $scope.menuArtista = false;
        $scope.menuHome = false;
        $scope.menuPlaylists = false;

      }else if(number === 6){
        $scope.menuPlaylists = true;
        $scope.menuHome = false;
        $scope.menuArtista = false;
        $scope.menuMusica = false;
        $scope.menuListaDeArtistas = false;
        $scope.menuFavoritos = false;
        $scope.menuNovaPlaylist = false;
      }


    };

    $scope.adicionaAlbumAoArtista = function(album){
      var naoAdicionado = true;
      for (var i = 0; i < $scope.artistas.length; i++) {
        if($scope.artistas[i].nome === album.artista && naoAdicionado){
          $scope.artistas[i].albuns.push(album);
          naoAdicionado = false;
        }
      }
    };

    $scope.mudaUltimaMusica = function(artistaModal, ultimaMusica){

      var naoTrocado = true;

      for (var i = 0; i < artistaModal.albuns.length; i++) {
        if(artistaModal.albuns[i].nome === ultimaMusica && naoTrocado){
          artistaModal.ultimaMusica = ultimaMusica;
          naoTrocado = false;
        }
      }

      if(naoTrocado){
        alert("Música não pertence ao artista selecionado!");
      }

      delete $scope.ultimaMusica;
    }

});
