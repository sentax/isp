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
        return <h1>Hello from React! {this.state.c}</h1>
    }
}

document.onload = (() => {

    setTimeout(() => {
        const domContainer = document.querySelector('#test');
        // ReactDOM.render(<Hello/>, domContainer);

    }, 1100)

})();

