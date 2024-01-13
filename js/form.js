

/**
 * Navigation through steps
 */

    export const navigateToFormStep = (stepNumber) => {
    
        document.querySelectorAll(".form-step").forEach((formStepElement) => {
            formStepElement.classList.add("d-none");
        });

        document.querySelector("#step-" + stepNumber).classList.remove("d-none");
};


/**
 * Input gift file
 */

    export const fileInput = document.querySelector('#file');
    const fileList = document.querySelector('#file-list');

    export function updateFileList() {
    while(fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }

    let curFiles = fileInput.files;

    if(!(curFiles.length === 0))  {

        for(let i = 0; i < curFiles.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = 'File name: ' + curFiles[i].name + '; file size ' + returnFileSize(curFiles[i].size) + '.';
        fileList.appendChild(listItem);
        }
    }
    };

    function returnFileSize(number) {
    if(number < 1024) {
        return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
    }
}; 

let val = document.getElementsByClassName("n-submit"); 
for (let i of val){
    i.onkeydown = function (key) { 
            var btn = 0 || key.keyCode || key.charCode; 
            if (btn == 13) { 
                key.preventDefault(); 
                i.blur();
            } 
        }  
}

