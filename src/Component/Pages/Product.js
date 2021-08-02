import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import SuccessModal from "../Shared/SuccessModal";

function Product() {
  const columns=[
    { title: "Code", field: "code", editable: "never" },
    { title: "Name", field: "name", editable: "never" },
    { title: "Type", field: "type", editable: "never" },
    {
      title: "Availability",
      field: "availability",
      editable: "never",
    },
    { title: "Needing Repair", field: "needing_repair", editable: "never" },
    { title: "Durability", field: "durability", editable: "never" },
    { title: "Max Durability", field: "max_durability", editable: "never" },
    { title: "Mileage", field: "mileage", editable: "never" },
    { title: "Price", field: "price", editable: "never" },
    {
      title: "Minimum Rent Period",
      field: "minimum_rent_period",
      editable: "never",
    },
  ];
  const [productData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("");
  const [yesTxt, setYesTxt] = useState("");
  const [noTxt, setNoTxt] = useState("");

  useEffect(() => {
    handleProductData();
  }, []);

  const handleProductData = () => {
    axios
      .get(" http://localhost:3003/Records")
      .then((data) => {
        setProductData(data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleBook = () => {
    setModalMsg("Book A Product");
    setModalType("Book");
    setYesTxt("Yes");
    setNoTxt("No");
    setOpenModal(true);
  };
  const handleReturn = () => {
    setModalMsg("Return A Product");
    setModalType("Return");
    setYesTxt("Yes");
    setNoTxt("No");
    setOpenModal(true);
  };

  return (
    <div>
      <div className="tb">
        <MaterialTable
          columns={columns}
          data={productData}
          options={{
            search: true,
            paging: true,
            filtering: false,
            showTitle: false,
            draggable: false,
            actionsColumnIndex: -1,
            //   maxBodyHeight: "calc(100vh - 300px)",
            minBodyHeight: "255px",
            pageSizeOptions: [
              0,
              5,
              10,
              {
                value: productData.length === 0 ? 5 : productData.length,
                label: "All",
              },
            ],
          }}
        />
      </div>
      <SuccessModal
        openModal={openModal}
        modalMsg={modalMsg}
        modalType={modalType}
        yesTxt={yesTxt}
        noTxt={noTxt}
        setOpenModal={setOpenModal}
        productData={productData}
      />
      <div className="btn-div">
        <button className="btn btn-bk" onClick={handleBook}>
          Book
        </button>
        <button className="btn btn-re" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
}

export default Product;
