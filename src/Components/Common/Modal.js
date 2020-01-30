import React from "react";
import { Modal } from "react-bootstrap";

function MyModal({ ShowOrNot, setShowOrNot, Heading, body }, props) {
  if (Heading === "w")
    return (
      <Modal
        show={ShowOrNot}
        onHide={() => setShowOrNot(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="py-4">
          <div
            className="alert alert-warning col-12 py-5 mt-n3 mb-n3"
            role="alert"
          >
            <strong>
              {" "}
              <i className="fas fa-exclamation text-warning fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
            </strong>{" "}
            {body}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );

  if (Heading === "s")
    return (
      <Modal
        show={ShowOrNot}
        onHide={() => setShowOrNot(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="py-4">
          <div
            className="alert alert-success col-12 py-5 mt-n3 mb-n3"
            role="alert"
          >
            <strong>
              {" "}
              <i className="fas fa-check text-success fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
            </strong>{" "}
            {body}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );

  return (
    <Modal
      show={ShowOrNot}
      onHide={() => setShowOrNot(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="py-4">
        <div
          className="alert alert-danger col-12 py-5 mt-n3 mb-n3"
          role="alert"
        >
          <strong>
            {" "}
            <i className="fas fa-times text-danger fa-4x d-block float-left mr-3 ml-n2 mt-n4"></i>{" "}
          </strong>{" "}
          {body}
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default MyModal;
