import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import "./footer.css";

const FooterPagePro = () => {
  return (
    <MDBFooter id="footer">
      <div className="footer-copyright text-center py-3">
        <MDBContainer>
          &copy; {new Date().getFullYear()} - <a> Ciclo Sport </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPagePro;
