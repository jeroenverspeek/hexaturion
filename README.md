# Hexaturion

Hexaturion offers a graphical user interface for controlling the LED cube (led-hexahedron) and LED screen (led-tetragon).

## Commander of the six faces

The name Hexaturion is chosen in analogy with the Roman centurion (commander of 100 soldiers) and decurion (commander of 10 soldiers).

## Software platform

It is written in VUE-3, in typescript and javascript

## How to use

Scan the QR-code that is shown on startup of the cube, or manually start a client in a webbrowser:

http://hexaturion.com

On the raspberry pi a server is automatically run at startup.
If needed, you can manually start the server from the command line:

    ssh raspberrypi
    cd $lebcube
    sudo node server.js

## For development

With nodemon the server will automatically restart after each code change.
Install nodemon on the raspberry pi.
The nodemon command simplifies the development process by automatically reloading the application (restarting the server) whenever you make changes to the code.

    sudo npm install -g nodemon

Start the server:

    sudo nodemon server.js

this gives the message:

Listening on http://localhost:3000/

To open the Hexaturion GUI start http://localhost:3000 in a webbrowser.

For debugging use the right mouse button -> Inspect -> Console

### Testing Hexaturion on you computer

Clone repository to you computer:

    cd {$GITDIR}/hexaturion
    git clone git@github.com:jeroenverspeek/hexaturion.git

Install all node-modules:

    npm install

Set up a local development server

    npm run dev

this gives the message:

Listening on http://localhost:3000/

To open the Hexaturion GUI start  http://localhost:3000 in a webbrowser.

Note that https://hexaturion.com is not suited for testing purposed, as committed changes will take some time to be reflected therein.

