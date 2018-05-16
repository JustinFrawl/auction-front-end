import React from 'react';

class NewUserForm extends React.Component {
  constructor(props){
    super(props);
    // console.log(this.props)

  this.state = {
    user: {
    username: '',
    amount: '',
    password: ''
  }
  };
}
  handleChange = e => {
    this.setState({user:{ ...this.state.user,[e.target.name]: e.target.value }});
  };
  // componentDidMount = () => {
  //   console.log('new user', this.state)
  // }

  // returnValue = (e) => {
  //   e.preventDefault()
  //   console.log(this.value)
  // }
render() {
  return (
    <form
      onSubmit={e => {e.preventDefault();
      console.log('submitted');
      this.props.handleCreateUser(this.state);
    }}>
    <h3>Create New User!</h3>
      <label>Title</label>
      <input
        type='text'
        placeholder='User Name'
        value={this.state.user.username}
        name="username"
        onChange={this.handleChange}
        />
      <input
        type='text'
        type='password'
        placeholder='Your Password'
        value={this.state.user.password}
        name="password"
        onChange={this.handleChange}
        />
      <input
        type='text'
        placeholder='Enter Your Current Amount of Money'
        value={this.state.user.amount}
        name="amount"
        onChange={this.handleChange}
        />
      <button
        type='submit'>
        Create Your User, then Sign In!
        </button>
    </form>

  )
}
}

export default NewUserForm
