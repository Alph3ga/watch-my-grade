function validateInput(){
    var containerDiv;
    var courseList= [];

    for(cName of courseNameArr){
        containerDiv= document.getElementById(cName.replace(/\s+/g, '$'));
        inputs= containerDiv.getElementsByTagName("input");

        course= new Course(cName, containerDiv.getElementsByTagName('p')[0].innerHTML);

        var tests= [];
        var totalMarks= 0;
        for(var i= 0; i< inputs.length; i++){
            tests.push(new Test(inputs[i].value, inputs[i+1].value))
            totalMarks+= Number(inputs[++i].value);
        }
        
        course.examStructure= new ExamStructure(inputs.length/2, totalMarks);
        course.examStructure.tests= tests;
        
        courseList.push(course);
    }

    download('courseSettings.json', JSON.stringify(courseList));

    //createGradeDiv(courseList);
}

function addCourseElement(courseName, credits, numberOfExams){
    // check if the course already exists
    if(courseNameArr.includes(courseName)){
        window.alert("Course already exists");
        return;
    }

    courseNameArr.push(courseName);

    createCourse(courseName, credits, numberOfExams);

    indexID= courseNameArr.length;

    creationDivCont.appendChild(getCourseDiv(courseName, credits, numberOfExams));

    // the delete button functionality
    document.getElementById(courseName.replace(/\s+/g, '$')+'but').addEventListener('click',
    ()=> {
        // some kinda data management function
        document.getElementById(courseName.replace(/\s+/g, '$')).remove();
        courseNameArr.splice(courseNameArr.indexOf(courseName),1);
        if(courseNameArr.length== 0){ finalizeDetails.style.display= "none"; }
    })
}


function getCourseDiv(courseName, credits, numberOfExams) {
    var newDiv= document.createElement("div");
    newDiv.innerHTML= courseName + ' : '+ credits;
    
    // replace the whitespaces in courseName
    courseName= courseName.replace(/\s+/g, '$');

    newDiv.innerHTML+= '<p>'+ credits+ '</p>';

    newDiv.innerHTML+= '<button id="'+ courseName+ 'but"><img src="res/icons8-trash-24.png"/></button>'

    var marksDivText= '<div>';
    for(var i=0; i<numberOfExams; i++){ marksDivText+=TEXT_INPUT+TEXT_INPUT+'<p></p>'; }
    marksDivText+= '</div>';

    newDiv.innerHTML+= marksDivText;

    newDiv.id= courseName;
    newDiv.classList.add("course_details");

    return newDiv;
}

function validateCourseInput(cname, credits, noExams){
    if(cname== null || cname== "" || cname== " "){
        window.alert("Enter Course Name");
        return;
    }
    if(credits== null || credits== "" || credits<= 0 || credits>= 10){
        window.alert("Enter Course Credits");
        return;
    }
    if(noExams== null || noExams== "" || noExams<= 0 || noExams>= 10){
        window.alert("Enter number of exams in the Course");
        return;
    }
}