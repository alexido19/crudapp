class DecisionApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.makeDecision = this.makeDecision.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
     
            if (options) {
                this.setState(() =>({options}));
            }
        }
        catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('Saving Data!')
        }
       
    }

    handleDeleteOption () {
        
        this.setState(()=>({options: []}))
    }

    makeDecision () {
            const randomNum = Math.floor(Math.random() * this.state.options.length);
            const todos = this.state.options[randomNum];
            alert(todos);
    }

    handleAddOption (option) {
        if (!option) {
            return 'Enter valid tasks to do!'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option Already Exists!'
        }

        this.setState((prevState) =>({options: prevState.options.concat(option)}))
    }

    handleRemoveOption (optionToRemove) {
        this.setState((prevState) =>({
            options: prevState.options.filter((option) =>{
                return optionToRemove !== option
            })
        }));
    }

    render () {
        const title = 'Decsion App';
        const subtitle = 'Let this App control your life!';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action 
                    makeDecision = {this.makeDecision}
                    hasOption = {this.state.options.length > 0} 
                />
                <Options 
                    handleRemoveOption = {this.handleRemoveOption}
                    options={this.state.options}
                    handleDeleteOption = {this.handleDeleteOption} 
                />
                <AddOptions handleAddOption = {this.handleAddOption} />
            </div>
        )
    }
}

const Header = (props) => {
        return (
            <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
            </div>
        ); 
}


const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.makeDecision}
                disabled = {!props.hasOption}
            >
                Make Decision
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOption}>Remove All</button>
            {
                props.options.map((option)=> 
                <Option  
                handleRemoveOption = {props.handleRemoveOption}
                key={option} 
                optionText={option} 
                />
                )}
        </div>
    );
} 
 

const Option = (props) =>{
    return(
        <div>
            {props.optionText}
            <button onClick={(e) =>{
                props.handleRemoveOption(props.optionText)
            }}> 
                Remove
            </button>
        </div>
    )
}

class AddOptions extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error : undefined
        }
    }

     handleAddOption (e) {
        e.preventDefault();
       const option = e.target.elements.option.value.trim();
       const error = this.props.handleAddOption(option);


       this.setState(() =>({error}))

    }
   
    render () {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit ={this.handleAddOption} >
                    <input type='text' name='option' />
                    <button >Add Options</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<DecisionApp />, document.getElementById('app'));