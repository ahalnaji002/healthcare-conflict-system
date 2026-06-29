import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

function PatientTreatment() {
  const [plan, setPlan] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/medical/my-plan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.plans.length > 0) {
          setPlan(data.plans[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlan();
  }, [token]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <section className="stats-grid">
        <div className="stat-box blue">
          <div>
            <p>Plan Progress</p>
            <h2>72%</h2>
          </div>
          <span className="material-symbols-outlined">monitoring</span>
        </div>

        <div className="stat-box green">
          <div>
            <p>Completed Tasks</p>
            <h2>12</h2>
          </div>
          <span className="material-symbols-outlined">task_alt</span>
        </div>

        <div className="stat-box orange">
          <div>
            <p>Pending Tasks</p>
            <h2>5</h2>
          </div>
          <span className="material-symbols-outlined">pending_actions</span>
        </div>

        <div className="stat-box red">
          <div>
            <p>Doctor Updates</p>
            <h2>3</h2>
          </div>
          <span className="material-symbols-outlined">edit_note</span>
        </div>
      </section>

      <section className="treatment-layout">
        <div className="content-left">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Current Treatment Plan</h2>
                <p>Updated by your assigned doctor.</p>
              </div>

              <button>Download Plan</button>
            </div>

            <div className="treatment-timeline">
              {plan ? (
                <div className="timeline-item active-step">
                  <div className="timeline-dot">
                    <span className="material-symbols-outlined">healing</span>
                  </div>

                  <div className="timeline-content">
                    <h3>{plan.title}</h3>

                    <p>{plan.description}</p>

                    <div className="treatment-info">
                      <div className="treatment-info-item">
                        <small>Status</small>

                        <span
                          className={`status ${
                            plan.status === "active"
                              ? "approved"
                              : plan.status === "completed"
                                ? "completed"
                                : "pending"
                          }`}
                        >
                          {plan.status.charAt(0).toUpperCase() +
                            plan.status.slice(1)}
                        </span>
                      </div>

                      <div className="treatment-info-item">
                        <small>Start Date</small>
                        <strong>{formatDate(plan.start_date)}</strong>
                      </div>

                      <div className="treatment-info-item">
                        <small>End Date</small>
                        <strong>{formatDate(plan.end_date)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3>No Treatment Plan</h3>
                    <p>Your doctor has not assigned a treatment plan yet.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Doctor Instructions</h2>
                <p>Important care notes you should follow.</p>
              </div>
            </div>

            <div className="instruction-grid">
              <div className="instruction-card">
                <span className="material-symbols-outlined">water_drop</span>
                <h3>Clean the wound daily</h3>
                <p>Use sterile saline and keep the wound dry after cleaning.</p>
              </div>

              <div className="instruction-card">
                <span className="material-symbols-outlined">medication</span>
                <h3>Follow medication timing</h3>
                <p>Do not skip antibiotics or pain relief medication.</p>
              </div>

              <div className="instruction-card">
                <span className="material-symbols-outlined">warning</span>
                <h3>Watch warning signs</h3>
                <p>
                  Contact your doctor if swelling, fever, or severe pain
                  appears.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="panel progress-panel">
            <h2>Recovery Progress</h2>

            <div className="progress-circle">
              <span>72%</span>
            </div>

            <p>
              Your doctor marked your condition as improving. Continue the
              current treatment plan carefully.
            </p>
          </div>

          <div className="panel">
            <h2>Latest Doctor Update</h2>

            <div className="doctor-update-card">
              <div className="doctor-avatar">
                <span className="material-symbols-outlined">stethoscope</span>
              </div>

              <div>
                <h3>Dr. Samer Khaled</h3>
                <p>
                  Continue wound care for 7 more days. Physical therapy will
                  start after the next review.
                </p>
                <span>Updated today • 11:30 AM</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>Next Step</h2>

            <div className="reminder-time">
              <span className="material-symbols-outlined">event</span>

              <div>
                <h3>{plan?.end_date ? formatDate(plan.end_date) : "-"}</h3>{" "}
                <p>{plan?.title || "Treatment Plan"}</p>{" "}
              </div>
            </div>

            <button className="message-btn">
              <span className="material-symbols-outlined">chat</span>
              Ask Doctor
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientTreatment;
