import csv
import re
import math

data = list(csv.reader(open('Brazil_ACH_Matrix.csv')))
x_ind = 0
y_ind = 0
FINAL = [0,0,0,0,0]
count = 0

tempArr = [0,0]
finalTemp = 0
tempIndex = 0

while data:
    if(re.match("^E\d$|^E\d\d$",data[x_ind][0])):
        if(x_ind > 4 and not data[x_ind][1]):
            break
        count += 1
        for y in range(4,11):
            if(re.match("^I$|^II$",data[x_ind][y])):
                print(data[x_ind][y])
                if(data[x_ind][4] == "High"):
                    tempArr[0] += 2
                elif(data[x_ind][4] == "Medium"):
                    tempArr[0] += 1
                else:
                    tempArr[0] += 0
                if(data[x_ind][5] == "High"):
                    tempArr[1] += 2
                elif(data[x_ind][5] == "Medium"):
                    tempArr[1] += 1
                else:
                    tempArr[1] += 0
                tempIndex = y - 6
                print(tempIndex)
                if(data[x_ind][y] == "I"):
                    FINAL[tempIndex] -= 2
                else:
                    FINAL[tempIndex] -= 4
                tempArr = [0,0]
    x_ind+=1
    
print(FINAL)