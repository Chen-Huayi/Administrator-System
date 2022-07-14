import Bar from "src/components/Bar";
import {useEffect, useState} from "react";


function Home (){
    const [backendData, setBackendData]=useState([{}])
    useEffect(()=>{
        fetch('/api')
            .then(res=>res.json())
            .then(data=>{
                    setBackendData(data)
                }
            )
    }, [])

    return (
        <div>
            {/*{(typeof backendData.framework==='undefined')?(<p>Loading...</p>):(*/}
            {/*    backendData.framework.map((framework, i)=>(*/}
            {/*        <p key={i}>{framework}</p>*/}
            {/*    ))*/}
            {/*)}*/}

            <Bar
                title='title'
                xData={['React', 'vue', 'angular']}
                yData={[30, 40, 50]}
                style={{width: '500px', height: '400px'}}
            />
        </div>
    )
}

export default Home



