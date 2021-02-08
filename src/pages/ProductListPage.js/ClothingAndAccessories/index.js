import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../redux/actions";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

import "./style.css";

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);
  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product, index) => (
          <div key={index} className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/a`}
            >
              <img src={product.productPictures[0].img} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div>
                <Rating value="4.3" />
                &nbsp;
                <span
                  style={{
                    color: "#777",
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  (5665)
                </span>
              </div>
              <Price value={product.price} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
