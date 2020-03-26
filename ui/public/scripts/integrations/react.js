class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {c: 0};
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({c: this.state.c + 1});
        }, 1000)

    }

    render() {
        return <React.Fragment>
            <h1>Hello from React! {this.state.c}</h1>
            <button onClick={() => {
                launcher.desktops['default'].createWindow().render();
            }}>Start New Application</button>
        </React.Fragment>
    }
}

document.onload = (() => {

    setTimeout(() => {
        const domContainer = document.querySelector('#test');
        // ReactDOM.render(<Hello/>, domContainer);

    }, 1100)

})();

