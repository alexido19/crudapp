class CounterApp extends React.Component {

    constructor(props) {
        super(props);
        this.plusOne = this.plusOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count: 0
        };

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }
    
    plusOne(){
        this.setState((prevState) =>{
            return {
                count: prevState.count + 1
            }
        })
     }

     
    minusOne(){
        this.setState((prevState) =>{
           return{
            count: prevState.count -1
           } 
        })
     }

     
    reset(){
        this.setState(()=>{
            return {
                count: 0
            }
        })
     }
    render () {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.plusOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}


    ReactDOM.render(<CounterApp/>, document.getElementById('app'))
// let getFirstName = (fullName) =>{
//     return fullName.split(' ')[0];
// }

// const getFirstName = () => fullName.split(' ')[0];

// const multiplier = {
//     numbers: [22, 6],
//     multiplyBy: 2,

//     multiply() {
//         return this.numbers.map((number) => this.multiplyBy * number);
//     }
// }

// console.log(multiplier.multiply());




// let count = 0;

// const addOne = () => {
//     count++;
//     renderCounterApp();
// };

// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };

// const resetButton = () => {
//     count = 0;
//     renderCounterApp();
// };



// const appRoot = document.getElementById('app');



// const renderCounterApp = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={resetButton}>Reset</button>
//         </div>
//     )

    
// };

// renderCounterApp();