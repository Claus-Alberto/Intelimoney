import os
import threading

def backendThread():
    os.system('python backend/backend.py')
    
back = threading.Thread(target=backendThread)

back.start()

os.system('npm start')
