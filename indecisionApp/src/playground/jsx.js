console.log('App is running')

const todo = {
    title: 'Decision App',
    subtitle: 'Workout Plan',
    options: []
};



const appRoot = document.getElementById('app')

const onFormSubmit = (e) => {
    e.preventDefault();

    const todos = e.target.elements.todos.value;

    if(todos) {
        todo.options.push(todos);
        e.target.elements.todos.value = '';
    }
    renderApp();
}

const removeAll = () => {
    todo.options = [];

    renderApp();
}

const onMakedecison = () => {
    const randomNum = Math.floor(Math.random * todo.options.length);
    const todos = todo.options[randomNum];
    alert(todos);
}

const renderApp = () => {
    
    const template = (
        <div>
            <h1>{todo.title}</h1>
            {todo.subtitle && <p>{todo.subtitle}</p>}
            <p>{todo.options.length > 0 ? 'Here are your options!' : 'No options!'}</p>
            <button onClick={onMakedecison}>Make Decison!</button>
            <button onClick={removeAll}>Remove All</button>
            <ol>
                {
                    todo.options.map((todo) =>{
                        return <li key={todo}>{todo}</li>
                    })
                }
            </ol>
            <form onSubmit ={onFormSubmit}>
                <input type='text' name='todos' />
                <button>Add Todo</button>
            </form>
            
        </div>
    );
    ReactDOM.render(template, appRoot);
}

renderApp();