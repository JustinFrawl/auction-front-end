import React from 'react'
import './App.css'
import { Icon, Header, Segment } from 'semantic-ui-react'

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      deadline: "",
      newDeadline: ''
    }
  }

  componentWillMount() {
    this.setState({ deadline: this.props.auctionEnd})
    console.log(this.props.auctionEnd)
    this.getTimeUntil(this.state.deadline)
  }
  componentWillReceiveProps(){
    this.setState({ deadline: this.props.auctionEnd})
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.state.deadline), 100)
  }

  leading0(num) {
    return num < 10 ? "0" + num : num
  }

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    // console.log("time", time)
    const seconds = Math.floor((time/1000)%60);
    const minutes = Math.floor ((time/1000/60)%60);
    const hours = Math.floor (time/(1000*60)%24);
    const days = Math.floor (time/(1000*60*60*24))

    this.setState({
      days,
      hours,
      minutes,
      seconds
    })
  }

  changeDeadline() {
    this.setState({deadline: this.state.newDeadline})
  }


  render() {
    return (
    <div>
      <div>
              <Header as='h2' block textAlign='center'>
        Auction End Date: {this.state.deadline}
      </Header>
      </div>
    <div>
      <div>
        <Header as="h3" block textAlign='center'>
          <div>
                  <Icon name='clock' size='large'/>
                  Auction Time Remaining:
                </div>
        {this.leading0(this.state.days)} Days: {this.leading0(this.state.hours)} Hours {this.leading0(this.state.minutes)} Minutes {this.leading0(this.state.seconds)} Seconds
      </Header>
      </div>
    </div>
  </div>
  )
  }
}

export default Clock
