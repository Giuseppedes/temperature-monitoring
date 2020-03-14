#!/bin/sh

cd /home/pi

printf "Subject: temperature monitoring link\n\n" > ngrok-output.txt

printf "IP\n" >> ngrok-output.txt

ip addr show wlan0 >> ngrok-output.txt

printf "\nPublic IP\n" >> ngrok-output.txt

curl ifconfig.me >> ngrok-output.txt

printf "\n\nNGROK OUTPUT\n" >> ngrok-output.txt

./ngrok http 3000 -log=stdout >> ngrok-output.txt &

sleep 30

cat ngrok-output.txt | msmtp giuseppedes90@gmail.com
