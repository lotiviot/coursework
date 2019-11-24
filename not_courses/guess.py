#this is a program that will do the following
#randomly generate a number 1 to 100
#accept the input from user of an int
#will loop and print the following conditions
#if less than say less than
#if greater than say greater then
#if guessed correctly, kill the while loop
#and print the amount of times looped
import random as r
def main():
    num = r.randint(1,100)
    count = 0
    g = input("Guess a number 1:100 ")
    count+=1
    while g != num:
        if g > num:
            g = input("Too high : Guess again: ")
            count+=1
        elif g < num:
            g = input("Too low :  Guess again: ")
            count+=1
    print("Guessed correct! \nThe number was %d \nThe client guessed: %d" % (num,count ))

main()
