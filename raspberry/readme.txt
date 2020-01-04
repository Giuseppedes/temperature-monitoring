

RASPBERRY SET UP

- Install Raspbian from https://www.raspberrypi.org/downloads/

- Default password is 'raspbian', change it with the command: 

	sudo passwd pi

- Set password for root:
	
	sudo passwd root

- Enable ssh (https://www.raspberrypi.org/documentation/remote-access/ssh/):

	Launch Raspberry Pi Configuration from the Preferences menu
	Navigate to the Interfaces tab
	Select Enabled next to SSH
	Click OK

INSTALL APACHE

- sudo apt-get update

- sudo apt-get upgrade

- sudo apt-get install apache2 libapache2-mod-wsgi python-setuptools python-flask python-serial

- sudo nano /etc/apache2/sites-enabled/000-default -> change All to AllowOverride:

	<Directory /var/www/>
		...
		AllowOverride All
		...
	</Directory>

- sudo chown -R pi /var/www

- sudo apt-get install vsftpd

- sudo nano /etc/vsftpd.conf -> set:
	
	anonymoys_enable=No
	local_enable=Yes
	write_enable=Yes
	force_dot_files=Yes

- sudo service vsftpd restart


ROUTER SETTINGS - PORT FORWARDING

- remember to open port 80 in order to enable access to the Apache server through the internet

- open port 3000 in order to enable access to the node.js server through the internet


INSTALL DATABASE

- sudo apt install mariadb-server

- sudo mysql_secure_installation (Answer Yes to all the prompts)

- sudo mysql -u root -p

- CREATE DATABASE exampledb;

- CREATE USER 'exampleuser'@'localhost' IDENTIFIED BY 'password';

- FLUSH PRIVILEGES;

- quit

- (optional - MySQL connector for PHP) sudo apt install php-mysql

- Install mysql connector for python 3 with the command:
	
	pip3 install mysql-connector-python-rf 

	(this seems to install the connector only for pi user -> "su root" and run again)


INSTALL PHPMYADMIN

- sudo apt install phpmyadmin (Yes to prompt and set phpmyadmin user and password)

- sudo mysql -u root -p

- GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';

- quit

- sudo nano /etc/apache2/apache2.conf -> add to the bottom of the file:

	Include /etc/phpmyadmin/apache.conf

- sudo service apache2 restart

- (optional - configure NGINX) sudo ln -s /usr/share/phpmyadmin /var/www/html


INSTALL NODE.JS

- wget https://nodejs.org/dist/v12.14.0/node-v12.14.0-linux-armv7l.tar.xz

- tar -xf node-v12.14.0-linux-armv7l.tar.xz

- cd node-v12.14.0-linux-armv7l/

- sudo cp -R * /usr/local/

- Check:
	
	node -v
	npm -v


(optional) SOLVE PHPMYADMIN WARNING 613
Do this step only if you see this error in phpmyadmin: 
“Warning in ./libraries/sql.lib.php#613 count(): Parameter must be an array or an object that implements Countable”

- sudo cp /usr/share/phpmyadmin/libraries/sql.lib.php /usr/share/phpmyadmin/libraries/sql.lib.php.bak

- sudo nano /usr/share/phpmyadmin/libraries/sql.lib.php

- find this strting with ctrl+w

	(count($analyzed_sql_results[‘select_expr’] == 1)

- replace with (there are 2 more round brackets):

	((count($analyzed_sql_results[‘select_expr’]) == 1)

- save and exit with ctrl-x and restart the web server:

	sudo systemctl restart apache2 


START SERVICES ON BOOT

- create a crontab with the command 'crontab -e' and append: 

	@reboot sleep 60 && sh /home/pi/temperature-monitoring/schedule/launcher-py.sh >/home/pi/temperature-monitoring/schedule/logs/py.log 2>&1
	@reboot sh /home/pi/temperature-monitoring/schedule/launcher-node.sh >/home/pi/temperature-monitoring/schedule/logs/node.log 2>&1

(need to sleep 60 seconds in order to allow the startup of the database):
