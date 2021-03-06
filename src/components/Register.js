import React from "react"
import '../index.css';
import axios from "axios"

class Register extends React.Component {

  nameRef = React.createRef()
  emailRef = React.createRef()
  passwordRef = React.createRef()

  state = {
    result: '',
  }

  register = e => {
    e.preventDefault()

    const credentials = {
      name: this.nameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    }

    axios.post('https://get-inked-backend.herokuapp.com/register', credentials)
      .then(({data}) => {
        if (data.status === 404) {
          this.setState({result: data.message})
        } else {
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user', JSON.stringify(data.user))
          window.location.href = '/'

          //this.props.getToken(data.token, data.user.isAdmin)
          this.clearFields()
        }
      }).catch(({data}) =>
      this.setState({result: data})
    )
  }

  clearFields() {
    this.nameRef.current.value = ''
    this.emailRef.current.value = ''
    this.passwordRef.current.value = ''
    setTimeout(() => {
      this.setState({result: ''})
    }, 2000);
  }

  render() {
    return (
      <div className="modal fade" id="registerModal" role="dialog" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title headers mx-auto text-uppercase" id="exampleModalLabel">Register</h5>
              <p className="text-white"><a href="" className="nav-link text-white" data-dismiss="modal" aria-label="Close"><i className="fas fa-times"></i></a></p>
            </div>
            <form className="col-12 mx-auto" onSubmit={this.register}>
              <div className="modal-body">

                <div className="container my-4">
                  <div className="text-center">
                     <span className={!this.state.result ? 'd-none' : 'alert alert-custom'}>
                    <i className="fas fa-exclamation-circle mr-2 text-danger"></i><small>{this.state.result}</small>
                   </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input ref={this.nameRef} type="text" className="form-control" id="name"
                           aria-describedby="emailHelp"
                           placeholder="Name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input ref={this.emailRef} type="email" className="form-control" id="email"
                           aria-describedby="emailHelp"
                           placeholder="Email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                      else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input ref={this.passwordRef} type="password" className="form-control" id="password"
                           placeholder="Password"/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="buttons">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    )
  }
}

export default Register;