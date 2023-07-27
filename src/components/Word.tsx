import { useState } from "react";

interface Props {
  word: WordData;
}

export interface WordData {
  id: number;
  day: number;
  eng: string;
  kor: string;
  isDone: boolean;
}

function Word({ word: w }: Props) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false); // 단어 뜻 숨기기, 보기
  const [isDone, setIsDone] = useState(word.isDone); // 체크하기와 해제하기

  function toggleShow() {
    setIsShow(!isShow);
  }

  // 수정하기
  function toggleDone() {
    // setIsDone(!isDone);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT", // 수정
      headers: {
        "Content-Type": "application/json", // Content-Type : 보내는 리소스의 타입
      },
      body: JSON.stringify({
        // json문자열로 변경
        ...word, // 기존데이터
        isDone: !isDone, // isDone을 변경
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  // 삭제하기
  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE", // 삭제
      }).then((res) => {
        if (res.ok) {
          setWord({ ...word, id: 0 });
        } // ??
      });
    }
  }
  if (word.id === 0) {
    return null;
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
        <button onClick={del} className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}

export default Word;
