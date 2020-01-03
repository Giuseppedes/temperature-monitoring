# start python script
cd python 
nohup python3 tempupdate.py & 

#start node.js server
cd ../rest-server 
nohup node app.js & 
