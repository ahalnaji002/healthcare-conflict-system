import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function NgoProfile() {
  return (
    <div className="dashboard-page">
      

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>NGO Profile</h1>
            <p>
              Manage organization information, verification, and support
              capacity.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="emergency-action">
              <span className="material-symbols-outlined">settings</span>
              Manage Account
            </button>

            <div className="user-avatar">
              <span className="material-symbols-outlined">
                volunteer_activism
              </span>
            </div>
          </div>
        </header>

        <section className="profile-layout">
          <div className="content-left">
            <div className="panel profile-main-card">
              <div className="profile-header-card ngo-profile-header">
                <div className="profile-photo">
                  <span className="material-symbols-outlined">business</span>
                </div>

                <div>
                  <h2>Hope Relief NGO</h2>
                  <p>Medical & Humanitarian Support Organization</p>

                  <div className="profile-badges">
                    <span className="tag blue-tag">Verified NGO</span>
                    <span className="tag green-tag">Active Partner</span>
                  </div>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <span className="material-symbols-outlined">badge</span>
                  <div>
                    <p>Registration No.</p>
                    <h3>NGO-2026-448</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <p>Main Location</p>
                    <h3>Gaza, Palestine</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">
                    support_agent
                  </span>
                  <div>
                    <p>Contact Person</p>
                    <h3>Omar Khaled</h3>
                  </div>
                </div>

                <div className="profile-info-item">
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                  <div>
                    <p>Support Type</p>
                    <h3>Medical Aid</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Organization Information</h2>
                  <p>
                    Official NGO details used for coordination and verification.
                  </p>
                </div>

                <button>Edit</button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-field">
                  <label>Organization Name</label>
                  <input value="Hope Relief NGO" readOnly />
                </div>

                <div className="profile-field">
                  <label>Email</label>
                  <input value="contact@hoperelief.org" readOnly />
                </div>

                <div className="profile-field">
                  <label>Phone</label>
                  <input value="+970 599 444 555" readOnly />
                </div>

                <div className="profile-field">
                  <label>Registration Number</label>
                  <input value="NGO-2026-448" readOnly />
                </div>

                <div className="profile-field">
                  <label>Service Areas</label>
                  <input value="Gaza, Rafah, Khan Younis" readOnly />
                </div>

                <div className="profile-field">
                  <label>Organization Type</label>
                  <input value="Medical & Humanitarian Support" readOnly />
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Support Capacity</h2>
                  <p>
                    Current humanitarian support capacity and service scope.
                  </p>
                </div>

                <button>Update Capacity</button>
              </div>

              <div className="ngo-capacity-grid">
                <div className="ngo-capacity-card">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>
                  <h3>Medical Supplies</h3>
                  <p>128 kits currently available for patient support.</p>
                </div>

                <div className="ngo-capacity-card">
                  <span className="material-symbols-outlined">
                    directions_car
                  </span>
                  <h3>Transportation</h3>
                  <p>
                    6 vehicles ready for hospital and rehabilitation transport.
                  </p>
                </div>

                <div className="ngo-capacity-card">
                  <span className="material-symbols-outlined">payments</span>
                  <h3>Financial Aid</h3>
                  <p>Budget available for 34 active medical support cases.</p>
                </div>

                <div className="ngo-capacity-card">
                  <span className="material-symbols-outlined">
                    wheelchair_pickup
                  </span>
                  <h3>Mobility Support</h3>
                  <p>Wheelchairs and mobility devices for urgent cases.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="panel progress-panel">
              <h2>Monthly Impact</h2>

              <div className="progress-circle">
                <span>81%</span>
              </div>

              <p>
                The organization resolved most approved requests this month and
                continues active coordination.
              </p>
            </div>

            <div className="panel">
              <h2>Verification Status</h2>

              <div className="security-list">
                <div className="security-item">
                  <span className="material-symbols-outlined">verified</span>
                  <div>
                    <h3>Admin Approved</h3>
                    <p>NGO account verified by system administrator.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">description</span>
                  <div>
                    <h3>Documents</h3>
                    <p>Registration documents uploaded and approved.</p>
                  </div>
                </div>

                <div className="security-item">
                  <span className="material-symbols-outlined">shield_lock</span>
                  <div>
                    <h3>Data Access</h3>
                    <p>
                      Access limited to assistance requests and coordination
                      records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Quick Actions</h2>

              <div className="doctor-actions-grid">
                <Link to="/ngo-triage">
                  <button className="message-btn">
                    <span className="material-symbols-outlined">rule</span>
                    Review Requests
                  </button>
                </Link>

                <Link to="/ngo-resources">
                  <button className="message-btn secondary-message-btn">
                    <span className="material-symbols-outlined">
                      inventory_2
                    </span>
                    Manage Resources
                  </button>
                </Link>

                <Link to="/ngo-reports">
                  <button className="message-btn secondary-message-btn">
                    <span className="material-symbols-outlined">analytics</span>
                    View Reports
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NgoProfile;
