import React from "react";

const About = () => {
  return (
    <>
      <div className="container emp-profile">
        <form method="">
          <div className="row">
            <div className="col-md-4">
              <img src="https://img.icons8.com/ios-filled/50/000000/guest-male--v1.png" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>dokakuri</h5>
                <h6>web debolper</h6>
                <p className="profile-rating mt-3 mb-5">
                  Rankings <span> 1/0 </span>
                  <ul className="nav nav-tabs " role="tablist">
                    <li className="nav-item">
                      <a
                        href="#home"
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        role="tab"
                      >
                        about
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#profile"
                        className="nav-link active"
                        id="profile-tab"
                        data-toggle="tab"
                        role="tab"
                      >
                        timeline
                      </a>
                    </li>
                  </ul>
                </p>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="btnAddMore"
                  className="profile-edit-btn"
                  value="edit profile"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
