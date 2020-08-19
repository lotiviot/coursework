#test array for formatting
nameList = ['john s smith' , 'tom a brown']

#main for loop that processes the list
for i in range(0,2):

    #split the list element at that exact list element
    nameList[i] = nameList[i].split()

    #debug --DELETE THIS--
    print(nameList[i])

    #for loop that capitalizes each name
    for j in range(0,3):
        nameList[i][j] = nameList[i][j].capitalize()
    
    #debug --DELETE THIS--
    print(nameList[i])

    #for loop that parses for where each name goes in the print
    for k in range(0,3):
        
        #if the first statement save the value as a temp value to be placed at the end
        if k == 0:
            temp = nameList[i][k]

        #elif the last value then just set the last value to temp then break
        elif k == 2:
            nameList[i][k] = temp
            break

        #set the value ahead of the current value equal to the first value
        nameList[i][k] = nameList[i][k+1]

#sort the damn thing
nameList.sort()

#formatted print
for L in range(0,2):
    print(nameList[L][0]+" "+nameList[L][1]+" "+nameList[L][2])
        
