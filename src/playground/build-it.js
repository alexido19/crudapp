console.log('App is running')

const visible = {
    title: 'Visibility Toggle',
    buttonS:'Show Details',
    button: 'Hide Details',
    details: []
}

const appRoot = document.getElementById('app')

const showDetails = () => {
   if (visible.buttonS) {
       visible.details.push('This should show up');
   } else {

   }
}


const renderApp = () => {
    const template = (
        <div>
            <h1>{visible.title}</h1>
            <button onClick={showDetails}>{visible.buttonS}</button>
            <p>{visible.details.length > 0 ? visible.details : ''}</p>
        </div>
    )

    ReactDOM.render(template, appRoot);
};

renderApp();

