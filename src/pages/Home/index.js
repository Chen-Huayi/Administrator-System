import Bar from "src/components/Bar";

function Home(){
    return (
        <div>
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
