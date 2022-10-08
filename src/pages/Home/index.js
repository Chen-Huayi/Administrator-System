// import Bar from "src/components/Bar";
import Bar from "components/Bar";

function Home (){
    return (
        <div>
            <Bar
                title='Chart 1'
                xData={['React', 'Vue', 'Angular']}
                yData={[30, 40, 50]}
                style={{width: '500px', height: '400px'}}
            />
            <Bar
                title='Chart 2'
                xData={['Java', 'Python', 'C']}
                yData={[10, 40, 25]}
                style={{width: '300px', height: '200px'}}
            />
        </div>
    )
}

export default Home
