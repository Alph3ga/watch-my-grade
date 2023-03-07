const createDetailsButton= document.getElementById("show_creation_panel");
const fileInput= document.getElementById("file_inp");
const submitFile= document.getElementById("submit_details");

const introDiv= document.getElementById("intro_div_remove");
const creationDiv= document.getElementById("creation_div");
const creationDivCont= document.getElementById("creation_div2");
const addCourse= document.getElementById("add_course_button");

const courseNameInput= document.getElementById("cname_inp");
const creditInput= document.getElementById("cred_inp");
const noExamsInput= document.getElementById("no_exams");

const finalizeDetails= document.getElementById("finalize_details");

const TEXT_INPUT= '<input type="text"/>';

var courseNameArr= [];

// click listener for the submit file button
submitFile.addEventListener("click",
    ()=> {
        let fileArr= fileInput.files;
        if(fileArr.length<= 0){
            console.log("no file inputted");
            window.alert("Please select a file")
            return;
        }
        if(fileArr[0].type!= "application/json"){
            window.alert("Kindly select a valid config file");
            return;
        }
        var fr= new FileReader();
        fr.readAsText(fileArr[0]);
        fr.onload= ()=> {
            var res= getFromJson(fr.result);
            if(!res){
                window.alert("Kindly select a valid config file");
                return;
            }
            // do something with the configs
        }
        fr.onerror= ()=> {console.log("error");}
    });

createDetailsButton.addEventListener("click",
    ()=> {
        introDiv.style.display= "none";
        creationDiv.style.display= "block";
    });

addCourse.addEventListener("click",
    ()=> {
        cname= courseNameInput.value;
        credits= creditInput.value;
        noExams= noExamsInput.value;
        // user input validation first
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

        addCourseElement(cname, credits, noExams);

        courseNameInput.value= "";
        creditInput.value= "";
        noExamsInput.value= "";

        if(courseNameArr.length> 0){ finalizeDetails.style.display= "block"; }
    });

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

finalizeDetails.addEventListener("click",
    ()=> {
        validateInput();
    });

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
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }