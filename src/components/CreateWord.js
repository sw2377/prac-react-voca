import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch";

function CreateWord() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 
    /* 
        생성버튼을 클릭하면 단어가 생성될때까지 다시 클릭이 안되도록 
        (통신중에는 버튼을 여러번 클릭할 수 없도록 isLoading이 false 일때만 버튼을 클릭할 수 있도록 세팅)
    */

    function onSubmit(e) {
        e.preventDefault();
       
        /*
        console.log(engRef);
        console.log(korRef.current.value);
        console.log(dayRef.current.value);
        */
        
        if (!isLoading) {
            setIsLoading(true);
            fetch(`http://localhost:3001/words/`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ 
                    eng: engRef.current.value,
                    kor: korRef.current.value,
                    day: dayRef.current.value,
                    isDone: false
                }),
            })
            .then(res => {
                if(res.ok) { 
                    alert("생성이 완료되었습니다.");
                    navigate(`/day/${dayRef.current.value}`) 
                    /* 
                        react-router-dom v5에서는 useHistory를 사용했는데 (강의에서도 useHistory를 사용함) 
                        useHistory는 이제 사용되지 않고, useNavigate를 사용한다.
                    */
                    setIsLoading(false);
                }
            })

        }

    }

    const engRef = useRef(null)
    const korRef = useRef(null)
    const dayRef = useRef(null)

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef}></input> 
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef}></input> 
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map((day) => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
                style={{
                    opacity: isLoading ? 0.5 : 1,
                }}
            >{isLoading ? "Saving..." : "저장"}</button>
        </form>
    )
}

export default CreateWord;