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

## The apps

The home page shows a tile for every app, and each app has a page of its own
with its options. Hexaturion has no code of its own for any of them: both
follow from the app catalog, which the cube keeps (a `manifest.ts` next to
each app in led-hexahedron, see `apps/src/catalog/README.md` there) and its
server hands out. A new app on the cube shows up here without a change to
Hexaturion. The catalog of the last time is kept in the browser, so the
tiles are there at once.

[PLAN.md](PLAN.md) tells where this is heading.

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

### Without the cube

The server and the apps also run on a PC, drawing to a browser instead of
the LED panels. In led-hexahedron:

    npm run simulator
    PORT=3478 LEDCUBE_SIMULATE=1 node server.js

and here, pointing the GUI at that server:

    NUXT_PUBLIC_API_BASE_URL=http://localhost:3478 npm run dev

Note that [https://hexaturion.com](https://hexaturion.com) is not suited for
testing purposes, as committed changes will take some time to be reflected
therein.
