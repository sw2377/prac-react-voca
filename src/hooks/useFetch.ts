import { useState, useEffect } from 'react'

function useFetch(url: string) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                setData(data)
            })
    }, [url]) 

    // console.log(data)
    return data;
}

export default useFetch;