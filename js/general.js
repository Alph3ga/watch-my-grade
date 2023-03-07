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
        
        if(!validateCourseInput(cname, credits, noExams)){ return; };

        addCourseElement(cname, credits, noExams);

        courseNameInput.value= "";
        creditInput.value= "";
        noExamsInput.value= "";

        if(courseNameArr.length> 0){ finalizeDetails.style.display= "block"; }
    });

finalizeDetails.addEventListener("click",
    ()=> {
        validateInput();
    });


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }