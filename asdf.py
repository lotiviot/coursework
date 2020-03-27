#constants
glazed = 5
filled = 4
powdered = 3
donuts = 10

#predetermined lists
donut_options=["glazed", "filled", "powdered", "none"]
donut_orders=["filled" ,"filled" ,"glazed" ,"glazed" ,"powdered"]

###########################function start###########################################
#entry statements
print("welcome to yoy")
print(donut_options)

#primary input for while loop
order = input("please select a type of thing to buy : ")

#exit program if none is inputted
if order == "none":
    print("none")
    exit()


#else enter while loop
else:

    #while loop which appends to the list of donut_orders
    while order != "none" and len(donut_orders) < donuts:

        #if statement that parses the answer for glazed powdered and filled
        if order == "glazed" or order == "powdered" or order == "filled":

            #glazed block
            if order == "glazed":
                
                #if statement block that compares to max
                if donut_orders.count(order) < glazed:
                    donut_orders.append(order)
                    print("order accepted")
                else:
                    print("the store is out of that donut")

            #powdered block
            if order == "powdered":

                #if statement block that compares to max
                if donut_orders.count(order) < powdered:
                    donut_orders.append(order)
                    print("order accepted")
                else:
                    print("the store is out of that donut")

            #filled block
            if order == "filled":

                #if statement block that compares to max
                if donut_orders.count(order) < filled:
                    donut_orders.append(order)
                    print("order accepted")
                else:
                    print("the store is out of that donut")
                
        else:
            print("invalid do it again")
            order = input("please select a type of thing to buy : ")
        
        if len(donut_orders) == donuts:
            print("we out bye")
            exit()
        
        order = input("please select a type of thing to buy : ")
    print("bye")
    exit()