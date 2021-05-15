import Bs from "../../../bs-library/helpers/Bs";

export const transitionScrollToTop = () => {

    const intervalHandler = setInterval(() => {

        const scrollY = window.scrollY;
        const newScrollY = scrollY - 100;

        Bs.log(scrollY);
        window.scrollTo(0, newScrollY);
        Bs.log(scrollY);

        if (scrollY <= 0) {
            clearInterval(intervalHandler);
        }
        
        
    }, 10);

};