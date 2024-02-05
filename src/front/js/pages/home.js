import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import Image5 from "../../img/image5.jpg";

export const Home = () => {
	return (
		<div className="home">
			<Navbar />
			<div className="hero">
				<img className="hero__image" src={Image5} />
			</div>
			<div className="container box">
				<div className="text-center mt-5">
					<Link to="/signup">
						<button><strong>SIGN UP</strong></button>
					</Link>
					<Link to="/login">
						<button><strong>LOGIN</strong></button>
					</Link>
				</div>
			</div>
		</div>

	);
};