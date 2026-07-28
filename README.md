# Hexaturion

Hexaturion offers a graphical user interface for controlling the LED cube
(led-hexahedron).

## Commander of the six faces

The name Hexaturion is chosen in analogy with the Roman centurion
(commander of 100 soldiers) and decurion (commander of 10 soldiers).

![Hexaturion cube](public/gallery/cube_rubikscube_pattern.jpg)

## Software platform

It is developed on the VUE-3 platform, in typescript.

## How to use

Scan the QR-code that is shown on startup of the cube, or manually start a
client in a webbrowser:

[https://hexaturion.com](https://hexaturion.com)

On the raspberry pi a server is automatically run at startup.

The IP address of the raspberry pi is fixed in the Hexaturion software to be
192.168.1.136.

## For development

For testing and development of the GUI you can use the following setup:

### On the server side (the cube)

On the raspberry pi a server is automatically run at startup.
If needed, you can manually start the server from the command line:

    ssh <username>@192.168.1.136
    cd $lebcube
    sudo node server.js

Raspberrypi listening to Hexaturion on
[port 3000](http://localhost:3000)

### On the client side (your PC/laptop/mobile phone)

Clone the repository to your computer:

    cd {$GITDIR}/hexaturion/
    git clone git@github.com:jeroenverspeek/hexaturion.git

Install all node-modules:

    npm install

Set up a local development server

    npm run dev

this gives the message:

    Listening on http://localhost:3000/

To open the Hexaturion GUI start
[http://localhost:3000](http://localhost:3000) in a webbrowser.

Note that [https://hexaturion.com](https://hexaturion.com) is not suited for
testing purposes, as committed changes will take some time to be reflected
therein.
