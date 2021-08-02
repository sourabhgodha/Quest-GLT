import React, { useState} from "react";
import Modal from "react-modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import ConfModal from "./ConfModal";

function SuccessModal(props) {
  const [selectedProductType, setSelectedProductType] = useState("none");
  const [selectedReturnProduct, setSelectedReturnProduct] = useState("none");
  const [type, setType] = useState("");
  const [durability, setDurability] = useState("");
  const [maxDurability, setMaxDurability] = useState("");
  const [selectionDate, setSelectionDate] = useState([
    {
      startDate: "",
      endDate: "",
      key: "selection",
    },
  ]);
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [diffDay, setDiffDays] = useState("");
  const [rentalFees, setRentalFees] = useState("");
  const [price, setPrice] = useState("");
  const [useMilage, setUseMilage] = useState("");
  const [confOpenModal, setConfOpenModal] = useState(false);
  const [confModalMsgFirst, setConfModalMsgFirst] = useState("");
  const [confModalMsgSec, setConfModalMsgSec] = useState("");
  const [confModalType, setConfModalType] = useState("");
  const [confYesTxt, setConfYesTxt] = useState("");
  const [confNoTxt, setConfNoTxt] = useState("");
  const [confModalMsg, setConfModalMsg] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("")
    setSelectedProductType("none");
    setSelectedReturnProduct("none");
    setUseMilage("");
    setSelectionDate([
      {
        startDate: "",
        endDate: "",
        key: "selection",
      },
    ]);
    props.setOpenModal(false);
  };

  const handleSelect = (item) => {
    setError("");
    setSelectionDate([item.selection]);
    var startDate = item.selection.startDate;
    var startdd = String(startDate.getDate()).padStart(2, "0");
    var startmm = String(startDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var startyyyy = startDate.getFullYear();
    startDate = startmm + "/" + startdd + "/" + startyyyy;

    var endDate = item.selection.endDate;
    var enddd = String(endDate.getDate()).padStart(2, "0");
    var endmm = String(endDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var endyyyy = endDate.getFullYear();
    endDate = endmm + "/" + enddd + "/" + endyyyy;

    const diffTime = Math.abs(
      item.selection.endDate - item.selection.startDate
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setStartDate(startDate);
    setLastDate(endDate);
    setDiffDays(diffDays + 1);
  };

  const handleDropdownValue = (e, c, type) => {
    setError("");
    switch (type) {
      case "Product Type":
        setSelectedProductType(e.target.value);
        setType(c.props["data-type"]);
        setDurability(c.props["data-durability"]);
        setMaxDurability(c.props["data-max_durability"]);
        setPrice(c.props["data-price"]);
        break;
      case "Return Product":
        setSelectedReturnProduct(e.target.value);
        setType(c.props["data-type"]);
        setPrice(c.props["data-price"]);
        break;
    }
  };

  const handleYesBtn = () => {
    let newRentalFees;
    let err="";
    if (props.modalType === "Book") {
      if (
        selectedProductType === "none" ||
        selectionDate[0].startDate === "" ||
        selectionDate[0].lastDate === ""
      ) {
        err="Please fill Mandatory Fields."
      } else {
        setError("");
        let newDurability;
        if (type === "plain") {
          newDurability = durability - diffDay;
        } else if (type === "meter") {
          newDurability = durability - diffDay * 2;
        }
        newRentalFees = diffDay * price;
        setRentalFees(newRentalFees);
      }
    } else {
      if (selectedReturnProduct === "none" || useMilage === "") {
        err="Please fill Mandatory Fields."
      } else {
        setError("");
        newRentalFees = useMilage * price;
        setRentalFees(newRentalFees);
      }
    }
    setError(err)

    if (err === "") {
      setUseMilage("");
      setSelectedProductType("none");
      setSelectedReturnProduct("none");
      setSelectionDate([
        {
          startDate: "",
          endDate: "",
          key: "selection",
        },
      ]);
      props.setOpenModal(false);
      handleConfModalValue(props.modalType, newRentalFees);
    }
  };

  const handleConfModalValue = (type, newRentalFees) => {
    setConfOpenModal(true);
    setConfModalMsgSec("Do you want to procedure?");
    setConfModalType(type);
    if (type === "Book") {
      setConfModalMsgFirst(`Your total price is $ ${newRentalFees}`);
      setConfYesTxt("Confirm");
      setConfModalMsg("Book a Product");
    } else {
      setConfModalMsgFirst(`Your estimated price is $ ${newRentalFees}`);
      setConfYesTxt("Yes");
      setConfNoTxt("No");
      setConfModalMsg("Return a Product");
    }
  };
  const handleUseMilage = (e) => {
    setError("");
    if(e.target.value<0){
      setError("Please enter positive value")
    }else{
      setError("")
      setUseMilage(e.target.value); 
    }
  };

  return (
    <>
      <ConfModal
        confOpenModal={confOpenModal}
        setConfOpenModal={setConfOpenModal}
        confModalMsgFirst={confModalMsgFirst}
        confModalMsgSec={confModalMsgSec}
        confModalType={confModalType}
        confYesTxt={confYesTxt}
        confNoTxt={confNoTxt}
        ConfModalMsg={confModalMsg}
        setRentalFees={setRentalFees}
        openLastModal={props.setOpenModal}
      />
      <Modal
        isOpen={props.openModal}
        onRequestClose={handleClose}
        contentLabel="Message Modal"
        ariaHideApp={false}
      >
        <header>
          <div className="modal-para">
            <h3 className="modal-txt">{props.modalMsg}</h3>
          </div>
        </header>
        <section>
          <div className="modal-cont">
            {props.modalType === "Book" ? (
              <>
                <div className="modal-dr-dwn">
                  <div className="input-lbl">
                    <label className="required">Product Type</label>
                    <FormControl variant="outlined">
                      <Select
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                        id="bookproduct"
                        value={selectedProductType}
                        variant="outlined"
                        size="small"
                        onChange={(e, c) =>
                          handleDropdownValue(e, c, "Product Type")
                        }
                      >
                        <MenuItem value="none" disabled>
                          Choose A Product
                        </MenuItem>
                        {props.productData.map((item, key) => {
                          return (
                            <MenuItem
                              key={key}
                              value={item.name}
                              data-type={item.type}
                              data-durability={item.durability}
                              data-max_durability={item.max_durability}
                              data-price={item.price}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div>
                  <DateRangePicker
                    ranges={selectionDate}
                    onChange={(item) => handleSelect(item)}
                  />
                </div>
                <div>{error ? <p className="err">{error}</p> : ""}</div>
              </>
            ) : (
              <>
                <div className="modal-dr-dwn">
                  <div className="input-lbl">
                    <label className="required">Return Product</label>
                    <FormControl variant="outlined">
                      <Select
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                        id="returnproduct"
                        value={selectedReturnProduct}
                        variant="outlined"
                        size="small"
                        onChange={(e, c) =>
                          handleDropdownValue(e, c, "Return Product")
                        }
                      >
                        <MenuItem value="none" disabled>
                          Choose A Return Product
                        </MenuItem>

                        {props.productData.map((item, key) => {
                          return (
                            <MenuItem
                              key={key}
                              value={item}
                              data-type={item.type}
                              data-price={item.price}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="modal-dr-dwn">
                  <div className="input-lbl int">
                    <label className="required">Used Mileage</label>
                    <input
                      type="number"
                      name="useMilage"
                      value={useMilage}
                      placeholder="Enter Mileage"
                      min="0"
                      onChange={(e) => handleUseMilage(e)}
                    />
                  </div>
                </div>
                <div>{error ? <p className="err">{error}</p> : ""}</div>
              </>
            )}
          </div>
        </section>
        <footer>
          <div className="modal-foot-btn">
            <button className="btn btn-bk" onClick={handleYesBtn}>
              {props.yesTxt}
            </button>
            <button className="btn btn-re" onClick={handleClose}>
              {props.noTxt}
            </button>
          </div>
        </footer>
      </Modal>
    </>
  );
}

export default SuccessModal;
