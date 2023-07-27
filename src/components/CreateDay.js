import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

function CreateDay() {
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3001/days/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({ 
                day: days.length + 1
            }),
        })
        .then(res => {
            if(res.ok) { 
                alert("생성이 완료되었습니다.");
                navigate("/");
            }
        })
    }

    return (
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            <button onClick={onSubmit}>Day 추가</button>
        </div>
    )
}

export default CreateDay;