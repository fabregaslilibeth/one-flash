import React from "react"
import axios from "axios"
import PackageOption from "./PackageOption";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Contact extends React.Component {

  nameRef = React.createRef()
  preferred_packageRef = React.createRef()
  dateRef = React.createRef()
  mobileRef = React.createRef()
  messageRef = React.createRef()
  packageRef = React.createRef()

  state = {
    userId: '',
    name: '',
    preferred_package: '',
    date: new Date(),
    mobile: '',
    message: '',
    packages: {},
    result: '',
    excludedDates: [],
    startDate: new Date(),
    status: '',
  }

  componentDidMount() {
    this.getPackages()
    this.getBookedDates()

    let user = JSON.parse(sessionStorage.getItem('user')) || ''
    this.setState({userId: user.id})
  }

  getPackages() {
    axios.get('https://get-inked-backend.herokuapp.com/packages/')
      .then(({data}) => {
        this.setState({packages: data})
      }).catch(err => console.log(err))
  }

  getBookedDates() {
    const excludedDates = []

    axios.get('https://get-inked-backend.herokuapp.com/contact/')
      .then(({data}) => {
        data.forEach(e => {
          excludedDates.push(new Date(e.date))
        })

        this.setState({excludedDates: excludedDates})
      }).catch(err => console.log(err))

    this.getStartDate()
  }

  getStartDate() {
    const today = new Date()
    today.setDate(today.getDate() + 7)
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.setState({
      startDate: new Date(date) //technically start 7 days from now
    })
  }

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const inquiry = {
      userId: this.state.userId,
      name: this.nameRef.current.value,
      mobile: this.mobileRef.current.value,
      message: this.messageRef.current.value,
      date: this.state.date,
      preferred_package: this.packageRef.current.value,
    }

    const excludedDates = this.state.excludedDates

    excludedDates.push(new Date(inquiry.date))

    axios.post('https://get-inked-backend.herokuapp.com/contact/add', inquiry)
      .then(({data}) => {
        if (data.status === 404) {
          this.setState({result: data.message})
          this.setState({status: 'error'})
        } else {
          this.setState({
            status: '',
            result: 'Thank you for booking with us! See you on your schedule.',
            excludedDates: excludedDates,
          })

          this.messageRef.current.value = '';
          this.nameRef.current.value = '';
          this.preferred_packageRef.current.value = '';
          this.mobileRef.current.value = '';
        }

      }).catch(err => console.log(err))

    setTimeout(() => {
      this.setState({result: ''})
    }, 5000);
  }

  clearFields = () => {
    this.nameRef.current.value = ''
    this.preferred_packageRef.current.value = ''
    this.mobileRef.current.value = ''
    this.messageRef.current.value = ''
  }

  render() {
    return (
      <div>
        <div className="row" id="contact">
          <div className="col-lg-12">

            <div className="form-wrapper p-4 col-lg-12">
              <div className="text-center">
                <span className={!this.state.result ? 'd-none' : 'alert alert-custom'}>
                  <i className={this.state.status === "error" ? 'fas fa-exclamation-circle mr-2 text-danger' : 'fas fa-check-circle mr-2 text-success' }></i>
                  <small>{this.state.result}</small>
                </span>
              </div>
              <form id="createContact" onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="form-group col-12 col-md-4">
                    <label htmlFor="name1">Name: </label>
                    <input required ref={this.nameRef} type="text" id="name1" className="form-control" name="name1"
                           placeholder="Client Name"/>
                  </div>

                  <div className="form-group col-12 col-md-5 ml-auto">
                    <label htmlFor="package_id">Preferred Package</label>
                    <select required name="package_id" id="package_id"
                            className="packageOptions form-control" ref={this.packageRef}>
                      <option value="">Please select a package</option>
                      {Object.keys(this.state.packages).map(
                        key => <PackageOption
                          key={key}
                          index={key}
                          details={this.state.packages[key]}
                        />
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="wedding_date">Preferred Date</label>
                    <br/>
                    <DatePicker
                      className={'form-control col-12'}
                      minDate={this.state.startDate}
                      selected={this.state.date}
                      onChange={this.handleChange}
                      excludeDates={this.state.excludedDates}
                    />
                    <small id="emailHelp" className="form-text text-muted">Note: Grayed out dates are
                      unavailable.</small>
                  </div>

                  <div className="form-group  col-12 col-md-5 ml-auto">
                    <label htmlFor="mobile">Mobile: </label>
                    <input required ref={this.mobileRef} type="number" id="mobile" className="form-control"
                           name="mobile"
                           placeholder="Mobile"/>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="content">Message: </label>
                  <textarea ref={this.messageRef} id="message" rows="3" className="form-control" name="message"
                            placeholder="Message" minLength="20" required> </textarea>
                </div>

                <button id="createReviewButton"
                        className="buttons btn-block" data-dismiss="modal"> Submit
                </button>

              </form>
            </div>
          </div>

        </div>


      </div>
    )
  }
}

export default Contact;