// import dummy from '../db/data.json';
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Word, { WordData } from "./Word";
import useFetch from "../hooks/useFetch";

function Day() {
  // 해당하는 날짜에 맞는 단어만 보이게
  const { day } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(Number(day));
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const days = useFetch("http://localhost:3001/days"); // custom hook 사용
  const words: WordData[] = useFetch(`http://localhost:3001/words?day=${day}`); // custom hook 사용

  /* dummy data를 사용할 경우 
    const wordList = dummy.words.filter(word => (
        word.day === Number(day)
    ))
    */

  /* custom hook 사용 이전
    const [words, setWords] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/words?day=${day}`)
            .then(res => res.json())
            .then((data) => {
                setWords(data)
            })
    }, [day]) 
    */

  // 이전, 다음날 이동
  function lastPage() {
    navigate(`/day/${currentPage - 1}`);
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    navigate(`/day/${currentPage + 1}`);
    setCurrentPage(currentPage + 1);
  }

  // Day 삭제
  function del() {
    if (
      window.confirm(
        `Day ${day}를 삭제하시면 Day ${day}에 저장된 모든 단어도 삭제됩니다.`
      )
    ) {
      fetch(`http://localhost:3001/days/${day}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          alert("삭제 되었습니다.");
          navigate("/");
        }
      });
    }
  }

  words.forEach((word) => {
    if (word.id === 0) {
      return null;
    }
  });

  return (
    <div>
      <h2>Day {day}</h2>
      <div className="btn_flex">
        <button
          onClick={lastPage}
          ref={prevRef}
          disabled={currentPage === 1 ? true : false}
        >
          &lt; prev
        </button>
        <button
          onClick={nextPage}
          ref={nextRef}
          disabled={currentPage >= days.length ? true : false}
        >
          next &gt;
        </button>
        <button onClick={del} className="btn_del">
          Day 삭제
        </button>
      </div>
      {words.length === 0 && <p>Loading...</p>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Day;
