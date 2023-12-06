import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='127.0.0.1',
                                         database='darivanjekrvi',
                                         user='root',
                                         password='root')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        
        query_select = "Select * from Termini where imeLokacije = 'KBC Zagreb'"
        result = cursor.execute(query_select)
        records = cursor.fetchall()
        print(records)
        print("Total number of rows: ", cursor.rowcount)
        
        #insert i delete ispisuju samo kad se nešto pravilo izvede, inače ne; jedini načinm da se provjeri je da se ubaci selcet između
        
        query_insert = """INSERT INTO Korisnik (ime, prezime, oib, krgrupa, mbo, spol, dob, mjstan, favkbc, verificiran) 
                            VALUES
                        ('Lana', 'Novak', '66666666666', 'A+', '666666666', 'Z', 15, 'Osijek', 'KBC Osijek', 0) """
        result = cursor.execute(query_insert)
        connection.commit()  #treba baciti grešku jer ima premalo godina
        #nakon što baci grešku sve se prekida -> dakle, neće se ni onaj delete izvesti nakon (čak i ako stavim neki row koji postoji)
        print("Dodano", cursor.rowcount, "redova")


        query_delete = """Delete from Korisnik where ime = 'Marko'"""
        cursor.execute(query_delete)
        connection.commit()
        print("Obrisano", cursor.rowcount, "redova")
        

     
except Error as e:
    print("Error while connecting to MySQL", e)
finally:

    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")