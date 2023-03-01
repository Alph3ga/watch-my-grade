const createDetailsButton= document.getElementById("show_creation_panel");
const fileInput= document.getElementById("file_inp");
const submitFile= document.getElementById("submit_details");

const introDiv= document.getElementById("intro_div_remove");
const creationDiv= document.getElementById("creation_div");

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


