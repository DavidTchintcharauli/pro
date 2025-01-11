"use client";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header.js";
import "./index.css";

function Contact() {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <div className="border border-white border-solid h-80vh flex flex-col text-start">
        <h2 className="flex flef-row p-5">Contact phone: +0100 3049 2933 </h2>
        <h2 className="flex flef-row p-5">
          Social Networks:
          <i
            className="fa fa-google network-element"
            aria-hidden="true"
            style={{ fontSize: "32px" }}
          ></i>
          <i
            className="fa fa-facebook network-element"
            aria-hidden="true"
            style={{ fontSize: "32px" }}
          ></i>
          <i
            className="fa fa-instagram network-element"
            aria-hidden="true"
            style={{ fontSize: "32px" }}
          ></i>
        </h2>
        <h2 className="flex flex-col p-5">
          Contact us @
          <form>
            <div className="text-sm flex gap-2 p-2">
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" name="name" />
            </div>
          </form>
          <form>
            <div className="text-sm flex gap-2 p-2">
              <label htmlFor="e-mail">E-mail: </label>
              <input type="text" id="e-mail" name="e-mail" />
            </div>
          </form>
          <form>
            <div className="text-sm flex gap-2 p-2">
              <label htmlFor="message">Message: </label>
              <textarea
                type="text"
                id="message"
                name="message"
                style={{
                  width: "500px",
                  height: "120px",
                  borderRadius: "5px",
                }}
              />
              <button type="submit" style={{ borderRadius: "5px" }}>
                Submit
              </button>
            </div>
          </form>
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
