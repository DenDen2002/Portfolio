export function setDocumentMode(setlightMode) {
    const islightMode = localStorage.getItem("lightMode");
    if (islightMode === "true") {
      document.body.style.backgroundColor = `var(--light_base)`;
      document.body.classList.remove("dark_mode");
      localStorage.setItem("lightMode", true);
      setlightMode(true)
    } else if (islightMode === "false") {
      document.body.style.backgroundColor = `var(--dark_base)`;
      document.body.classList.add("dark_mode");
      localStorage.setItem("lightMode", false);
      setlightMode(false)
    } else {
      document.body.style.backgroundColor = `var(--light_base)`;
      document.body.classList.remove("dark_mode");
      localStorage.setItem("lightMode", true);
      setlightMode(true)
    }
} 


export function toggleChange(lightMode, setlightMode) {
  setlightMode(!lightMode)
  localStorage.setItem('lightMode', !lightMode)
}


export function movePupils(event, animationFinished, pupilXoffset, pupilYoffset) {
  if (animationFinished === true) {
    const pupils = document.querySelector('.pupilsHome');
    const centerX = 18
    const centerY = -1

    const mouseX = event.clientX
    const mouseY = event.clientY

    const documentWidth = document.documentElement.clientWidth;
    const documentHeight = document.documentElement.clientHeight; 
    const boundary_container = [-10, 1, 8, (documentWidth*0.024 -1 )] //top left bottom right

    const centerpointX = pupilXoffset + centerX
    const centerpointY = pupilYoffset + centerY

    let ratioX;
    let ratioY;
    let pupilleft;
    let pupiltop;

    if (mouseX <= centerpointX) {
      ratioX = (mouseX / centerpointX).toFixed(1)
      pupilleft = ((ratioX * (centerX - boundary_container[1])) + boundary_container[1]).toFixed(1)
    } 
    else {
      ratioX = ((mouseX - centerpointX) / (documentWidth - centerpointX)).toFixed(2) * 5
      if (ratioX > 1) {
        ratioX = 1
      }
      pupilleft = ((ratioX * (boundary_container[3] - centerX)) + centerX).toFixed(1)
    }

    if (mouseY <= centerpointY) {
      ratioY = (mouseY / centerpointY).toFixed(1)
      pupiltop = ((ratioY * (centerY - boundary_container[0])) + boundary_container[0]).toFixed(1)
    } 
    else {
      ratioY = ((mouseY - centerpointY) / (documentHeight - centerpointY)).toFixed(1)
      pupiltop = ((ratioY * (boundary_container[2] - centerY)) + centerY).toFixed(1)
    }

    pupils.style.left = `${pupilleft}px`
    pupils.style.top =  `${pupiltop}px`

  }
}