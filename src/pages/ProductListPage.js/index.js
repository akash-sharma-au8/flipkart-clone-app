import React from "react";
import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClothingAndAccessories";
import getParams  from "../../utils/getParams";
import "./style.css";

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let view = null;
    switch (params.type) {
      case "store":
        view = <ProductStore {...props} />;
        break;
      case "page":
        view = <ProductPage {...props} />;
        break;
      default:
        view = <ClothingAndAccessories {...props}/>
    }

    return view;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
