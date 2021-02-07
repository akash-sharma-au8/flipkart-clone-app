import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, signup as _signup } from "../../redux/actions";
import Cart from "../UI/Cart";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const authState = useSelector((state) => state.authState);
  const cart = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
    setEmail("") 
    setFirstName("")
    setLastName("") 
    setPassword("") 
  };

  const logout = () => {
    dispatch(signout());
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
      setEmail("") 
      setPassword("")
    }
  };

  useEffect(() => {
    if (authState.authenticate) {
      setLoginModal(false);
    }
  }, [authState.authenticate]);

  const renderLoggedInMenu = () => {
    console.log(authState.user.fullname)
    return (
      <DropdownMenu
        menu={<a className="fullName">{authState.user.fullname}</a>}
        menus={[
          { label: "My Profile", to: "", icon: null },
          { label: "SuperCoin Zone", to: "", icon: null },
          { label: "Flipkart Plus Zone", to: "", icon: null },
          {
            label: "Orders",
            to: "/account/orders",
            icon: null,
          },
          { label: "Wishlist", to: "", icon: null },
          { label: "My Chats", to: "", icon: null },
          { label: "Coupons", to: "", icon: null },
          { label: "Rewards", to: "", icon: null },
          { label: "Notifications", to: "", icon: null },
          { label: "Gift Cards", to: "", icon: null },
          { label: "Logout", to: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", to: "", icon: null },
          { label: "Flipkart Plus Zone", to: "", icon: null },
          {
            label: "Orders",
            to: `/account/orders`,
            icon: null,
            onClick: () => {
              !authState.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", to: "", icon: null },
          { label: "Rewards", to: "", icon: null },
          { label: "Gift Cards", to: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{
                color: "#2874f0",
              }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {authState.error && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {authState.error}
                  </div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ margin: "40px 0 20px 0" }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* logo ends */}
        {/* seacrch comp */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        {/* search ends */}
        {/* right menu */}
        <div className="rightMenu">
          {authState.authenticate
            ? renderLoggedInMenu()
            : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <Link to={`/cart`}
            className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px"}}>Cart</span>
            </Link>
          </div>
        </div>
        {/* right menu ends */}
      </div>
    </div>
  );
};

export default Header;
