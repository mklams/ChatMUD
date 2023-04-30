# ChatMUD
You will need to run three different servers for this application. 

First is the node server which hosts the game: 
Open terminal and go to the server directory. Run these commands:
npm install
npm run server

Next is the React server for the front-end:
In a Second terminal go to the client/chat directory. Run these commands:
npm install
npm start

'npm install' only needs to be ran the first time you check out the repo. 

Last you'll need to setup a Redis database. You can follow the instructions here:
https://redis.io/docs/clients/nodejs/
For windows you will need to download WSL and run the database from the emulated linux terminal. 
sudo apt-get install redis
sudo service redis-server start