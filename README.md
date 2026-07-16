start de server op de raspberrypi met:

>ssh -X raspberrypi
>cd $lebcube
>sudo node server.js

of tijdens development:
(installeer eerst nodemon: >sudo npm install -g nodemon)
>sudo nodemon server.js
server wordt dan automatisch opnieuw gestart bij 
iedere wijziging in de code

Hexaturion Cube Commander listening on port 3000

-------------------------

start client in webbrowser:

http://hexaturion.com

------------------------------------
debugging:
start client in webbrowser:

http://hexaturion.com

rechtermuisknop -> Inspect -> Console

------------------------------------

For testing hexaturion on you computer:

clone repository to you computer:
>cd /media/ik/internal_disk_1TB/hexaturion
>git clone git@github.com:jeroenverspeek/hexaturion.git
Install all node-modules:
>npm install

then:
>npm run dev

this gives the message:
Listening on http://localhost:3000/

start localhost in webbrowser:
localhost:3000

dit geeft de Hexaturion GUI

------------------------------------
Load dependencies again:
remove or rename:
 package-lock.json
and
 node_modules

then:
>npm install
------------------------------------
install and update to the versions in package-lock.json:
>npm ci
------------------------------------

