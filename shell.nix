let
  pkgs = import (fetchTarball { name = "nixpkgs-unstable";
      url = "https://github.com/NixOS/nixpkgs/archive/3954218cf613eba8e0dcefa9abe337d26bc48fd0.tar.gz";
      sha256 = "0bagqy53mknghz112swzb7zyjc07kfvam2wmc919bq0jxv8vj2i6";}) { };
in pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-14_x
    pkgs.yarn
    pkgs.nodePackages.gatsby-cli
    pkgs.nodePackages.prettier
    pkgs.nixfmt
  ];

  shellHook = ''
    set -a
    source .env
    set +a
  '';
}
