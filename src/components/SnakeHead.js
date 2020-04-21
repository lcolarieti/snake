import React from 'react';

class SnakeHead extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      snakeHeadClasses: ['snake-head', this.props.direction]
    }
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    setTimeout(() => this.mounted && this.setState({snakeHeadClasses:  [...this.state.snakeHeadClasses, 'animation']}), 10);
  }

  componentDidUpdate(prevProps) {
    (this.mounted && prevProps.direction !== this.props.direction) && this.setState({snakeHeadClasses:  ['snake-head', this.props.direction, 'animation']});
  }

  render() {
    return <img className={this.state.snakeHeadClasses.join(' ')} src={`${process.env.PUBLIC_URL}/images/snake-head.png`} alt="Snake" />;;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

}

export default SnakeHead;
