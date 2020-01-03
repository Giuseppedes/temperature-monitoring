import serial
import time
import mysql.connector
from decimal import *

# ls /dev to check if "ttyACM0" is correct!
ser = serial.Serial('/dev/ttyACM0', 9600)

mydb = mysql.connector.connect(
    host="localhost",
    user="temperature",
    passwd="temperature",
    database="TEMPERATURE"
)
mycursor = mydb.cursor()
sql = "INSERT INTO HISTORY (temperature, session_id) VALUES (%s, (select max(ID) from SESSIONS))"


def tempUpdate() :  
    temperature = ser.readline()   
    temperatureString = repr(temperature).replace("b","").replace(r"\r\n","").replace("'","")
    
    # Database Insert
    val = (Decimal(temperatureString),)
    mycursor.execute(sql, val)
    mydb.commit()
    
    ##  write index.html
    # fob = open('/var/www/html/index.html', 'w')
    # fob.write('<html><body><h1>Temperature:' + temperatureString + 'at'+ time   .strftime('%l:%M%p on %b %d, %Y') + '</h1></body></html>')
    # fob.close()
    
def loopTempUpdate() :
    while 1 :
        tempUpdate()
        time.sleep(60)
            
loopTempUpdate()
