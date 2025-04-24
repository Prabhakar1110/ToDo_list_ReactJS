import { useState, useEffect } from "react";

function DisplayTime() {
    const [timer, setTimer] = useState("");
    useEffect(()=>{
        function display() {
            const d = new Date();
            let t = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
            setTimer(t);
        }
        display();
        let interval = setInterval(display, 1000);
        return () => clearInterval(interval);
    }, []);

    return(<>{timer}</>);
}
export default DisplayTime;