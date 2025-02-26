import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import "../styles/ScrollUp.css";

const ScrollUp = () => {
window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        const myButton = document.getElementById("myBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            myButton.style.display = "block"; 
        } else {
            myButton.style.display = "none"; 
        }
    }
    
    function topFunction() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

      return (
         <button onClick={topFunction} id="myBtn" title="Go to top">
                    <FontAwesomeIcon icon={faArrowUp} />
                        </button>
      );
}; 

export default ScrollUp;