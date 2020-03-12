#!/bin/sh

cd /home/pi

printf "Subject: temperature monitoring link\n\n" > ngrok-output.txt 

./ngrok http 3000 -log=stdout >> ngrok-output.txt &

sleep 10

cat ngrok-output.txt | msmtp giuseppedes90@gmail.com

