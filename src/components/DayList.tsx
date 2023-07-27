// import dummy from '../db/data.json'; // dummy data 가져오기 -> json-server fetch로 처리
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export interface DayData {
  id: number;
  day: number;
}

function DayList() {
  const days: DayData[] = useFetch("http://localhost:3001/days"); // custom hook 사용

  // 로딩
  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  /* custom hook 사용 이전
    const [days, setDays] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/days")
            .then(res => res.json())
            .then((data) => {
                setDays(data)
            })
    }, [])
    */

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}

export default DayList;
