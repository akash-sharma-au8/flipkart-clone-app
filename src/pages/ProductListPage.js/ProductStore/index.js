import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsBySlug } from "../../../redux/actions";
import "./style.css";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

const ProductStore = (props) => {
  const { slug } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);
  const product = useSelector((state) => state.productState);
  console.log(product)
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerLeft={`${slug} mobile ${key}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "150px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {product.productsByPrice[key].map((product, index) => (
                <Link
                  key={index}
                  to={`/${product.slug}/${product._id}/a`}
                  style={{
                    display: "block",
                    color: "#2f3640",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={product.productPictures[0].img}
                      alt="productImage"
                    />
                  </div>
                  <div className="productInfo">
                    <div className="productTitle">{product.name}</div>
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
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductStore;
