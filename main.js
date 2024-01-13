
import { checkGuess, guessSubmit } from './js/game.js'
import { fileInput, navigateToFormStep, updateFileList } from './js/form.js'
import { init, animate,setcolor } from './js/three.js';


init();
animate();


/**
 * 
 * Listeners
 * 
 */

  //Input gift file
    fileInput.addEventListener('change', updateFileList);

  //Navigation Multi step form
    document.querySelectorAll(".navigate").forEach((formNavigationBtn) => {
      formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        navigateToFormStep(stepNumber);
      });
    });

  //Jeu de la devinette 
    guessSubmit.addEventListener('click', checkGuess);

  //Color choice button 
    const btn_color = document.querySelectorAll('.btn.color');
    for (const i of btn_color) {
      i.addEventListener('click', () => { setcolor(i.getAttribute("color")) });
    }
  
  //Retrieve form data  
    let form = document.getElementById("Gift Form")
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      for (const [name,value] of data) {
        console.log(name, ":", value)
      }
      form.reset();
      //form.submit();
    })
