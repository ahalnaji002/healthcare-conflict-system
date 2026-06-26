import "../../styles/dashboard.css";

function AdminSettings() {
  return (
    <>
      <section className="settings-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>System Preferences</h2>
                <p>General platform configuration and display settings.</p>
              </div>
            </div>

            <div className="settings-form">
              <div className="treatment-form-grid">
                <div className="treatment-field">
                  <label>System Name</label>
                  <input type="text" defaultValue="War Injuries Care" />
                </div>

                <div className="treatment-field">
                  <label>Default Language</label>
                  <select defaultValue="en-ar">
                    <option value="en-ar">English / Arabic</option>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                <div className="treatment-field">
                  <label>Default Time Zone</label>
                  <select defaultValue="palestine">
                    <option value="palestine">Palestine Time</option>
                    <option value="utc">UTC</option>
                  </select>
                </div>

                <div className="treatment-field">
                  <label>Emergency Response Mode</label>
                  <select defaultValue="enabled">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="treatment-field">
                <label>System Description</label>
                <textarea
                  rows="4"
                  defaultValue="A smart medical follow-up system for war injuries, chronic patients, doctors, NGOs, and administrators."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Role Permissions</h2>
                <p>Control access permissions for each user role.</p>
              </div>
            </div>

            <div className="permissions-grid">
              <div className="permission-card">
                <div>
                  <h3>Patients</h3>
                  <p>
                    Can view treatment plans, send requests, and chat with
                    doctors.
                  </p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="permission-card">
                <div>
                  <h3>Doctors</h3>
                  <p>
                    Can access assigned patient records and update treatment
                    plans.
                  </p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="permission-card">
                <div>
                  <h3>NGOs</h3>
                  <p>
                    Can view assistance requests and manage resource allocation.
                  </p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="permission-card">
                <div>
                  <h3>Admins</h3>
                  <p>Can manage users, records, logs, reports, and settings.</p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Notification Settings</h2>
                <p>
                  Configure alerts for emergencies, appointments, and approvals.
                </p>
              </div>
            </div>

            <div className="settings-list">
              <div className="settings-item">
                <span className="material-symbols-outlined">emergency</span>
                <div>
                  <h3>Emergency Alerts</h3>
                  <p>Send urgent alerts to doctors, NGOs, and admins.</p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="settings-item">
                <span className="material-symbols-outlined">medication</span>
                <div>
                  <h3>Medication Reminders</h3>
                  <p>Enable patient medication reminders and notifications.</p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="settings-item">
                <span className="material-symbols-outlined">how_to_reg</span>
                <div>
                  <h3>Join Request Alerts</h3>
                  <p>Notify admins when a doctor or NGO submits a request.</p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>System Configuration</h2>

            <div className="progress-circle">
              <span>96%</span>
            </div>

            <p>
              Core system settings are configured. Review security and backup
              options regularly.
            </p>
          </div>

          <div className="panel">
            <h2>Security Settings</h2>

            <div className="security-list">
              <div className="security-item">
                <span className="material-symbols-outlined">lock</span>
                <div>
                  <h3>Password Policy</h3>
                  <p>Minimum 8 characters with secure requirements.</p>
                </div>
              </div>

              <div className="security-item">
                <span className="material-symbols-outlined">shield_lock</span>
                <div>
                  <h3>Encrypted Access</h3>
                  <p>Medical data access is restricted by user role.</p>
                </div>
              </div>

              <div className="security-item">
                <span className="material-symbols-outlined">history</span>
                <div>
                  <h3>Activity Tracking</h3>
                  <p>Sensitive actions are logged for review.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Backup Settings</h2>

            <div className="reminder-note">
              <h3>Last Backup</h3>
              <p>
                System backup completed successfully 6 hours ago. Next backup is
                scheduled automatically.
              </p>
            </div>

            <button className="message-btn">
              <span className="material-symbols-outlined">backup</span>
              Run Manual Backup
            </button>
          </div>

          <div className="panel">
            <h2>Danger Zone</h2>

            <div className="alert-card critical-alert">
              <span className="material-symbols-outlined">warning</span>
              <div>
                <h3>High-risk actions</h3>
                <p>
                  Deleting records or disabling security may affect system
                  safety.
                </p>
              </div>
            </div>

            <button className="message-btn danger-action-btn">
              <span className="material-symbols-outlined">delete</span>
              Clear Old Logs
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminSettings;