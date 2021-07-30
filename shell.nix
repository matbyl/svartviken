let
  nixpkgs_21_05 = import (fetchTarball
    "https://github.com/NixOS/nixpkgs/archive/refs/tags/21.05.tar.gz") { };
in nixpkgs_21_05.mkShell {
  buildInputs = [
    nixpkgs_21_05.nodejs-12_x
    nixpkgs_21_05.yarn
    nixpkgs_21_05.nodePackages.gatsby-cli
    nixpkgs_21_05.nodePackages.prettier
    nixpkgs_21_05.nixfmt
  ];

  shellHook = ''
    set -a
    source .env
    set +a
  '';
}
