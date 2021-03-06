import React from "react"
import Packages from "./Packages";
import Contact from "./Contact";
import DisplayedReviews from "./DisplayedReviews";
import GallerySlider from "./GallerySlider";
import Footer from "./Footer";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center flex-column flex-nowrap banner-content">
          <div className="col-md-8 mx-auto text-center spacer">
            <h1 className="display-3 d-none d-lg-block text-uppercase font-weight-bolder app-color">Exceeding
              expectations</h1>
            <h1 className="h3 d-block d-lg-none text-uppercase font-weight-bolder app-color">Exceeding expectations</h1>
            <p>— since 1987 —</p>

           <p className="spacer">
             <a className="custom-button"  href="#contact">
               <span className="nav-link text-white p-4">make an appointment</span>
             </a>
           </p>
          </div>

        </div>

        <div className="container-fluid project-container">

          <div className="services-container container-fluid p-0" id="packages">

            <Packages/>

          </div>

          <div className="gallery-container container-fluid m-0 p-0" id="gallery">
            <div className="row m-4">

              <GallerySlider/>

            </div>
          </div>

          {/*<div className="about-us-container">*/}
          {/*  <div className="row bg-app">*/}

          {/*    <div className="col-12 col-md-6 my-4 p-4">*/}
          {/*      <div className="col-10 col-md-6 mx-auto">*/}
          {/*        <h2 className="headers font-weight-bolder text-uppercase">Service <span*/}
          {/*          className="text-span-color">beyond </span>expectation</h2>*/}

          {/*        <hr className="bg-white my-4 ml-0 w-25"/>*/}

          {/*        <p className="my-4 pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi atque commodi*/}
          {/*          delectus dolore dolorem doloremque iure reiciendis.</p>*/}

          {/*        <button className="buttons my-4">read more</button>*/}

          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div className="col-12 col-md-6 about-container">*/}
          {/*      <div className="col-12 col-md-8 mx-auto">*/}

          {/*      </div>*/}
          {/*    </div>*/}

          {/*  </div>*/}
          {/*</div>*/}

          <div className="testimonials-container container-fluid p-0" id="reviews">

            <DisplayedReviews/>

          </div>

          <div className="contact-us-container" id="contact">
            <div className="row bg-app">
              <div className="col-12 col-lg-6 my-4 p-4">
                <div className="col-12 col-md-10 mx-auto">
                  <h2 className="headers font-weight-bolder text-uppercase text-center d-block d-lg-none"><span
                    className="text-span-color">book </span>now</h2>
                  <h2 className="headers font-weight-bolder text-uppercase text-center d-none d-lg-block">Make an<span
                    className="text-span-color"> appointment</span></h2>

                  <Contact/>

                </div>
              </div>

              <div className="col-12 col-lg-6 map-container">
                <div className="col-12 col-md-8 mx-auto">
                  <div className="d-flex align-items-center flex-wrap p-4 m-4 ">
                    <div className="h6 text-uppercase col-12 font-weight-bolder spacer">
                      <i className="icons-color fa fa-map-pin mr-2" aria-hidden="true"></i>Location
                      <p className="my-4 ml-4">128 Winston st, Upper West Side, </p>
                      <p className="my-4 ml-4">Manhattan,New York, NY 05120</p>
                    </div>
                    <div className="h6 text-uppercase col-12 font-weight-bolder my-4">
                      <i className="icons-color fa fa-phone mr-2" aria-hidden="true"></i>+639 412 1234
                    </div>
                    <div className="h6 text-uppercase col-12 font-weight-bolder my-4">
                      <i className="icons-color fa fa-hourglass mr-2" aria-hidden="true"></i>Monday -- Sunday 9am - 5pm
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="footer container-fluid p-0">
            <Footer/>
          </div>

        </div>

      </div>
    )
  }
}

export default Home;