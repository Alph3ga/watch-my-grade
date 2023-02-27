class Course{

    examStructure= null; // to store the marks distribution and weightage of the subject
    target= null; // to store the target grade point in the subject

    constructor(name, credits){  // construct the object with course name and credits
        this.name= name;
        this.credits= credits;
    }

    get targetSet(){ return this.target!= null; }  // if the target grade point has been set for this course
    get structureSet(){ return this.examStructure!= null; } // if the exam structure has been set for this course

    removeTarget(){ this.target= null; } // remove the target grade point 

    targetPossible(){ // if the set target is possible for this course, given some marks in the examStructure

    }
}

class Test{
    #marks;
    marksSet= false;
    constructor(totalMarks, weightage){
        this.totalMarks= totalMarks;
        this.weightage= weightage;
    }

    get marks(){
        if(this.marksSet){ return this.#marks; }
        return -1;
    }

    set marks(marks){
        this.marksSet= true;
        this.#marks= marks;
    }

    removeMarks(){
        this.marksSet= false;
    }
}

class ExamStructure{
    tests= [];

    constructor(NumberOfExams, totalMarks){
        this.NumberOfExams= NumberOfExams;
        this.totalMarks= totalMarks;
    }

    get isValid(){
        if(this.tests.length!= this.NumberOfExams){ return false; }
        return true;
    }

    add(test){
        this.tests.push(test);
    }
}

