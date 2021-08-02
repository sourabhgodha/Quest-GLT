import React from "react";
import Modal from "react-modal";

function ConfModal(props) {
  const handleConfClose = () => {
    props.setConfOpenModal(false);
    props.setRentalFees("")
  };

  const handleNo=()=>{
    props.setConfOpenModal(false);
    props.openLastModal(true);
  }
  return (
    <Modal
      isOpen={props.confOpenModal}
      onRequestClose={handleConfClose}
      contentLabel="Message Modal"
      ariaHideApp={false}
    >
      <header>
        <div className="modal-para">
          <h3 className="modal-txt">{props.ConfModalMsg}</h3>
        </div>
      </header>
      <section>
        <div className="modal-cont modal-conf-txt">
          <p>{props.confModalMsgFirst}</p>
          <p>{props.confModalMsgSec}</p>
        </div>
      </section>
      <footer>
        <div className="modal-foot-btn">
          {props.confModalType === "Book" ? (
            <button className="btn btn-bk" onClick={handleConfClose}>
              {props.confYesTxt}
            </button>
          ) : (
            <>
              <button className="btn btn-bk" onClick={handleConfClose}>
                {props.confYesTxt}
              </button>
              <button className="btn btn-re" onClick={handleNo}>
                {props.confNoTxt}
              </button>
            </>
          )}
        </div>
      </footer>
    </Modal>
  );
}

export default ConfModal;
