import "../../styles/dashboard.css";

function PatientChat() {
  return (
    <>
      <section className="chat-layout">
        <div className="panel chat-contacts-panel">
          <div className="panel-header">
            <div>
              <h2>Medical Contacts</h2>
              <p>Select a doctor or care provider.</p>
            </div>
          </div>

          <div className="chat-contact active-contact">
            <div className="doctor-avatar">
              <span className="material-symbols-outlined">stethoscope</span>
            </div>

            <div>
              <h3>Dr. Samer Khaled</h3>
              <p>Orthopedic Specialist</p>
            </div>

            <span className="online-dot"></span>
          </div>

          <div className="chat-contact">
            <div className="doctor-avatar">
              <span className="material-symbols-outlined">healing</span>
            </div>

            <div>
              <h3>Physical Therapy Team</h3>
              <p>Rehabilitation Support</p>
            </div>
          </div>

          <div className="chat-contact">
            <div className="doctor-avatar">
              <span className="material-symbols-outlined">support_agent</span>
            </div>

            <div>
              <h3>Medical Coordinator</h3>
              <p>Follow-up Support</p>
            </div>
          </div>
        </div>

        <div className="panel chat-panel">
          <div className="chat-header">
            <div className="doctor-info">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">stethoscope</span>
              </div>

              <div>
                <h3>Dr. Samer Khaled</h3>
                <p>Online now • Orthopedic Specialist</p>
              </div>
            </div>

            <button className="mini-btn">
              <span className="material-symbols-outlined">video_call</span>
              Video Call
            </button>
          </div>

          <div className="chat-messages">
            <div className="message-row doctor-message">
              <div className="message-bubble">
                <p>
                  Hello Ahmed, I reviewed your wound photo update. The healing
                  looks stable. Continue the same cleaning routine.
                </p>
                <span>10:15 AM</span>
              </div>
            </div>

            <div className="message-row patient-message">
              <div className="message-bubble">
                <p>
                  Thank you doctor. I still feel mild pain when moving my leg.
                  Is that normal?
                </p>
                <span>10:18 AM</span>
              </div>
            </div>

            <div className="message-row doctor-message">
              <div className="message-bubble">
                <p>
                  Mild pain can be normal at this stage. If the pain increases
                  or swelling appears, contact me immediately.
                </p>
                <span>10:20 AM</span>
              </div>
            </div>

            <div className="message-row patient-message">
              <div className="message-bubble attachment-bubble">
                <span className="material-symbols-outlined">image</span>

                <div>
                  <strong>Wound update photo</strong>
                  <small>Uploaded successfully</small>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-input">
            <button className="chat-icon-btn">
              <span className="material-symbols-outlined">attach_file</span>
            </button>

            <input type="text" placeholder="Write your message..." />

            <button className="send-btn">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>

        <div className="panel chat-info-panel">
          <h2>Care Summary</h2>

          <div className="care-summary-card">
            <span className="material-symbols-outlined">assignment</span>

            <div>
              <h3>Current Plan</h3>
              <p>Wound care + medication + therapy preparation.</p>
            </div>
          </div>

          <div className="care-summary-card">
            <span className="material-symbols-outlined">event</span>

            <div>
              <h3>Next Visit</h3>
              <p>29 May • 10:30 AM • Online consultation.</p>
            </div>
          </div>

          <div className="care-summary-card warning-summary">
            <span className="material-symbols-outlined">warning</span>

            <div>
              <h3>Emergency Note</h3>
              <p>
                Use emergency alert if bleeding, fever, or severe pain appears.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientChat;
