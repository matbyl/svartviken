# Svartviken website
[![Netlify Status](https://api.netlify.com/api/v1/badges/63ec1053-931f-4174-95ca-606de991d8e2/deploy-status)](https://app.netlify.com/sites/svartviken/deploys)

[nix on ubuntu or debian]: https://ariya.io/2020/05/nix-package-manager-on-ubuntu-or-debian


## Getting Started
1. Follow the [instructions to install nix](#install-nix) 
2. Run `yarn` withing the nix-shell
3. Create a .env file in the root directory
    * Add a `GATSBY_CONTENTFUL_ACCESS_TOKEN=[your-token-here]` to the .env file
4. Run `yarn dev` to start the development server

## Building
* A production build is reated by running `yarn build`
* A new version of the website will be published on push to master

## <a name="install-nix">[Nix on Ubuntu or Debian]</a>
1. Install Nix

    ```sh
    sudo mkdir /nix
    sudo chown $USER /nix
    sh <(curl -L https://nixos.org/nix/install) --no-daemon
    ```

    > 💡 You may have to restart your terminal or perhaps even reboot for this installation to take effect!

2. Check if installation was successful by installing `hello`

    ```sh
    nix-env -i hello
    ```

    ... then run it

    ```sh
    hello
    ```

    which should print

    ```sh
    Hello, world!
    ```

3. Add `nixos-21.05` channel

    ```sh
    nix-channel --add https://nixos.org/channels/nixos-20.09 nixos_20_09
    ```

4. Update nix channels

    ```sh
    nix-channel --update
    ```

5. Run `nix-shell` in this repo and it will read `default.nix` and set up a local dev environment for you

    ```sh
    nix-shell
    ```

    > 💡 You can examine `shell.nix` to get a sense of what it sets up and what it doesn't set up for you. It doesn't set up any editors for example.

6. Start your editor from the shell to let your editor access the environment.
    > 💡 Visual Studio Code has a nix environment selector extension.
