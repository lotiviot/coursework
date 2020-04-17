//Tristan Lotivio
//Project 2
//Due April 20th, 2020
//write a program that processes scores.txt and does the following
//prompts for user input -done
//student class that does the following 
        //cla -done
        //ola -done
        //quiz -done
        //exam -done
        //final exam -done
        //total score -done
        //letter grade -done
    //all of these thigns will be private  -done
    //therefore getters and setters -done
    //method for finding the final grade and update letter grade of a student -done
//roster class that does the following 
    //structure to handle a list of up to 30 students -done
    //following methods
        //calculate individual student information
        //update individual student information -done
        //query student information
        //all information math as well
//main() will do the following
    //ask for text file with information -done
    //load the roster class with text file info -done
    //ask for user query of a c#,
        //if found, print the c#'s info with letter grade calculated
    //ask again for c#
        //if found, print the c#'s info with letter grade calculated
    //final print info for all students
        //same information
        //with total average scores and highest scores with C# for all exercises

//imports from java libraries

import java.io.File
import java.util.ArrayList

//parent class creation
class Roster {

    //data members for roster
    def studentArr
    def x 
    
    //constructor
    Roster()
    {
        studentArr = []
        x=1
    }

    //updateRoster method
    void updateRoster(String id, int cla, int ola, int quiz, int exam, int final_exam) {
        studentArr << new Student(id, cla, ola, quiz, exam, final_exam)
    }

    //calculateRoster method which runs gradeCalucation on the student array, then prints the information of student at x
    void calculateRoster(int x){
        this.studentArr[x].gradeCalculation()
        println "ID: " + this.studentArr[x].getID()
        println "CLA: " + this.studentArr[x].getCLA()
        println "OLA: " + this.studentArr[x].getOLA()
        println "QUIZ: " + this.studentArr[x].getQuiz()
        println "EXAM: " + this.studentArr[x].getExam()
        println "FINAL EXAM: " + this.studentArr[x].getFinalExam()
        println "FINAL GRADE: " + this.studentArr[x].getFinalGrade()
        println "LETTER GRADE: " + this.studentArr[x].getLetterGrade()
        println ""
    }
    
    //printRoster method which prints stats on the whole Roster object
    void printRoster(){

        //variables for the method and preliminary print statements
        def maxList = [['',0],['',0],['',0],['',0],['',0],['',0]], sum = 0, avg = 0.0, counter = 0
        println "stats on the whole student body"
        println ""

        //for loop which runs iterates through the size of the array to print student information, load the maxList, and load sum to find the avg
        for(int x in 0..this.studentArr.size()-1){
            this.studentArr[x].gradeCalculation()
            println "ID: " + this.studentArr[x].getID()
            println "CLA: " + this.studentArr[x].getCLA()
            println "OLA: " + this.studentArr[x].getOLA()
            println "QUIZ: " + this.studentArr[x].getQuiz()
            println "EXAM: " + this.studentArr[x].getExam()
            println "FINAL EXAM: " + this.studentArr[x].getFinalExam()
            println "FINAL GRADE: " + this.studentArr[x].getFinalGrade()
            println "LETTER GRADE: " + this.studentArr[x].getLetterGrade()
            println ""

            //if else statement block which compares studentArr[x] against the current max in maxList and loads maxList with new information if maxList is less
            if(this.studentArr[x].getCLA() > maxList[0][1]){
                maxList[0][1] = this.studentArr[x].getCLA()
                maxList[0][0] = this.studentArr[x].getID()            
            }
            else if(this.studentArr[x].getOLA() > maxList[1][1]){
                maxList[1][1] = this.studentArr[x].getOLA()
                maxList[1][0] = this.studentArr[x].getID()            
            }
            else if(this.studentArr[x].getQuiz() > maxList[2][1]){
                maxList[2][1] = this.studentArr[x].getQuiz()
                maxList[2][0] = this.studentArr[x].getID()            
            }
            else if(this.studentArr[x].getExam() > maxList[3][1]){
                maxList[3][1] = this.studentArr[x].getExam()
                maxList[3][0] = this.studentArr[x].getID()            
            }
            else if(this.studentArr[x].getFinalExam() > maxList[4][1]){
                maxList[4][1] = this.studentArr[x].getFinalExam()
                maxList[4][0] = this.studentArr[x].getID()            
            }
            else if(this.studentArr[x].getFinalGrade() > maxList[5][1]){
                maxList[5][1] = this.studentArr[x].getFinalGrade()
                maxList[5][0] = this.studentArr[x].getID()
            }
            sum += this.studentArr[x].getFinalGrade()
            counter++
        }

        //arithmetic for average and print statement block for the end of assignment
        avg = sum / counter
        println "maximums and averages of the class"
        println ""
        println "Highest CLA"
        println maxList[0][0] + ": " + maxList[0][1]
        println ""
        println "Highest OLA"
        println maxList[1][0] + ": " + maxList[1][1]
        println ""
        println "Highest QUIZ"
        println maxList[2][0] + ": " + maxList[2][1]
        println ""
        println "Highest EXAM"
        println maxList[3][0] + ": " + maxList[3][1]
        println ""
        println "Highest FINAL EXAM"
        println maxList[4][0] + ": " + maxList[4][1]
        println ""
        println "Grade averages:"+avg

    }

    //queryRoster method which checks if id is in studentArr, 
    void queryRoster(String id){

        //input for for c#
        print "Please Enter a C# to query: "
        def name = System.in.newReader().readLine()

        //variable declaration for while loop
        def flag = "", x = 0

        //loop which verifies that the name inputted was corrected
        while(name != flag){

            //x counter reset and while loop that goes through the whole studentArr in roster
            //loads string flag from studentArr[x].getID() to see if the ID's are equal
            x = 0
            while((name != flag) && (x < this.studentArr.size()-1)){
                flag = this.studentArr[x].getID()
                x++
            }

            //if name is not found in DB or if incorrect name is inputted, requery
            if(name != flag){
                print "C# not found. Please Enter a C# to query: "
                name = System.in.newReader().readLine()
            }
        }

        //x is saved 1 over the actual position, so calculateRoster is called at x-1
        this.calculateRoster(x-1)

    }
    //child class for student witin parent
    class Student {

        //data member declaration
        private String id
        private int cla
        private int ola
        private int quiz
        private int exam
        private int final_exam
        private int final_grade
        private String letter_grade

        //setters
        void setId(String id){
            this.id = id
        }
         void setCLA(int cla){
            this.cla = cla
        }
         void setOLA(int ola){
            this.ola = ola
        }
         void setQuiz(int quiz){
            this.quiz = quiz
        }
         void setExam(int exam){
            this.exam = exam
        }
         void setFinalExam(int final_exam){
            this.final_exam = final_exam
        }
        void setFinalGrade(int final_grade){
            this.final_grade = final_grade
        }    
         void setLetterGrade(String letter_grade){
            this.letter_grade = letter_grade
        }

        //getters
         String getID() {
            return this.id
        }
         int getCLA() {
            return this.cla
        }
         int getOLA() {
            return this.ola
        }
         int getQuiz() {
            return this.quiz
        }
         int getExam() {
            return this.exam
        }
         int getFinalExam() {
            return this.final_exam
        }
         int getFinalGrade() {
            return this.final_grade
        }
         String getLetterGrade() {
            return this.letter_grade
        }

        //null constructor
        Student(){
            this.id = ""
            this.cla = 0
            this.ola = 0
            this.quiz = 0
            this.exam = 0
            this.final_exam = 0
            this.final_grade = 0
            this.letter_grade = ""
        }

        //constructor with variables
        Student(id, cla, ola, quiz, exam, final_exam) {
            this.id = id
            this.cla = cla
            this.ola = ola
            this.quiz = quiz
            this.exam = exam
            this.final_exam = final_exam

        }

        //grade calculation method for the final grade and letter grade data members
        void gradeCalculation(){
            int temp = this.getCLA() + this.getOLA() + this.getQuiz() + this.getExam() + this.getFinalExam()
            this.setFinalGrade(temp)
            if(temp >= 90){this.setLetterGrade("A")}
            else if((temp>=87)&&(temp<90)){this.setLetterGrade("B+")}
            else if((temp>=83)&&(temp<87)){this.setLetterGrade("B")}
            else if((temp>=80)&&(temp<83)){this.setLetterGrade("B-")}
            else if((temp>=77)&&(temp<80)){this.setLetterGrade("C+")}
            else if((temp>=73)&&(temp<77)){this.setLetterGrade("C")}
            else if((temp>=70)&&(temp<73)){this.setLetterGrade("C-")}
            else if((temp>=67)&&(temp<70)){this.setLetterGrade("D+")}
            else if((temp>=63)&&(temp<67)){this.setLetterGrade("D")}
            else if((temp>=60)&&(temp<63)){this.setLetterGrade("D-")}
            else{this.setLetterGrade("F")} 
        }
    }

    //main function which runs the program
    static void main(String[] args) {

        //ask for input and open file(maybe error check)
        print "What is the name of the document? "
        def name = System.in.newReader().readLine()
        File file = new File(name)

        //instantiate roster object
        Roster roster = new Roster()

        //variables for reading the file into roster object
        def counter = 0, temp, line = [], y = 0

        //reading the file
        file.withReader { reader ->
            while ((temp = reader.readLine()) != null) {
                //split all empty entries
                temp = temp.split(' ')
                y = 0

                //process temp for empty entries
                for(int x in 0..temp.length-1){
                    
                    //if empty do nothing
                    if(temp[x] == ''){
                        y = y
                    }

                    //add to line if not empty
                    else if((temp[x] != ' ') && (counter > 0)){
                        line[y] = temp[x]
                        y++
                    }
                }

                //if counter is over 0 or not the base case write to roster
                if(counter > 0){
                    roster.updateRoster(line[0],line[1].toInteger(),line[2].toInteger(),line[3].toInteger(),line[4].toInteger(),line[5].toInteger())
                }
                counter++
            }
        }

        //double query roster and full roster print are called 
        roster.queryRoster()
        roster.queryRoster()
        roster.printRoster()
    }
}