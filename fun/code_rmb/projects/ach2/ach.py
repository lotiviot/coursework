import csv
import re
import math

data = list(csv.reader(open('LFAR_2_ACH.csv')))
x_ind = 0
y_ind = 0
FINAL = [0,0,0,0,0]
count = 0

tempArr = [0,0]
tempVal = 0
finalTemp = 0
tempIndex = 0
FINAL = [0,0]

switcher = {
    0:.5,
    1:.707,
    2:1,
    3:1.414,
    4:2,
}

for  index,line in enumerate(data):
    if(index > 2):
        # print(line[3:])
        if(line[3] == 'Very High'):
            tempVal+=2
        elif(line[3] == 'High'):
            tempVal+=1
        elif(line[3] == 'Moderate'):
            tempVal+=0
        if(line[4] == 'Very High'):
            tempVal+=2
        elif(line[4] == 'High'):
            tempVal+=1
        elif(line[4] == 'Moderate'):
            tempVal+=0
        tempVal = switcher.get(tempVal)
        #print(tempVal)
        if(line[5] == "I"):
            tempArr[0] = tempVal*1
            FINAL[0] -= tempArr[0]
        else:
            tempArr[0] = tempVal*0
            FINAL[0] -= tempArr[0]
        if(line[6] == "I"):
            tempArr[1] = tempVal*1
            FINAL[1] -= tempArr[1]
        else:
            tempArr[1] = tempVal*0
            FINAL[1] -= tempArr[1]
        tempVal = 0
        tempArr = [0,0]
print(FINAL)
