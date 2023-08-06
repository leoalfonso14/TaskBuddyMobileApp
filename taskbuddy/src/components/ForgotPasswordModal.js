import { React, useState } from "react";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  //const [showModal, setShowModal] = useState(true);
  const resetBtn = () => {
    console.log(email);
  };
  const handleModal = () => {
    console.log("in here");
    //setShowModal(false);
  };

  return (
    <div
      id="forgotPassword"
      position="fixed"
      z-index="1"
      left="0"
      top="0"
      overflow="auto"
      display="block"
    >
      <div className="modal-content">
        <p className="close" onClick={handleModal}>
          &times;
        </p>
        <h2>Reset your TaskBuddy password</h2>
        <h4>
          Enter your email and click Reset to reset it. You will get an email
          with the request.
        </h4>
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button id="resetBtn" onClick={resetBtn(email)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
