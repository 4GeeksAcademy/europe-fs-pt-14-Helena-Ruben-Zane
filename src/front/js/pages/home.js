import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

import { HomeNavbar } from "../component/homeNavbar";
import video from "../../assets/video.mp4";
import image1 from "../../img/image1.jpg";
import image2 from "../../img/image2.jpg";
import image3 from "../../img/image3.jpg";


export const Home = () => {
	return (
		<div className="home">
			<HomeNavbar />
			<div className="hero">
				<video className="hero__video" autoPlay muted loop src={video} />
			</div>
			<div className="about container mt-5 mb-5 overflow-hidden">
				<h2><strong>OUR PURPOSE</strong></h2>
				<p>
				Pollution is one of the main threats facing the oceans. More than 80% of the pollution that reaches the oceans originates on land and is transported to the marine environment by rivers and streams. Coastal zones are therefore the dumping grounds for what we throw away. In recent decades, the composition of most solid waste produced has been made up of durable synthetic materials that can remain in the environment for many years, causing continued danger to ecosystems. With the worldwide increase in the coastal population, the amount of waste entering the oceans can also be expected to rise. <strong>It is therefore urgent to take action!</strong>
				</p>
				<p><strong>SANDSMILE</strong> is a web app designed to inspire and encourage users to become dedicated collectors of debris that invades ocean beaches. The site allows users to track their individual and collective impact on collected trash across various coastal geographies. By transforming the beach into places where sand smiles, users not only contribute to a cleaner environment but also gain financial benefits. Sandsmile acts to foster a community of socially responsible citizens and companies, turning beach cleanup into a rewarding and impactful endeavor.
				</p>
			</div>	
			<div className="donations container mt-5 mb-5 overflow-hidden">
				<h2><strong>DONATIONS</strong></h2>
				<p><strong>Make a difference today, for a clean ocean and a healthy planet.</strong> Your donation will be used to organize new clean-up events on Portugal's beaches, hold awareness-raising sessions and reward our smiling cleaners who show the greatest passion for the activity.</p>
				<p>With our activity, we will contribute to <strong>an active role in cleaning up our oceans, protecting marine life and combating the climate crisis.</strong></p>
				<div>
					<Link to="/donation" className="donations__button btn round">
						<span><strong>GET INVOLVED AND DONATE</strong></span>
					</Link>
				</div>
			</div>
			<div className="info container mt-5 mb-5 overflow-hidden">
				<h2><strong>OUR IMPACT IN PORTUGAL</strong></h2>
				<div className="info__bubbles">
					<div className="info__bubble">
						<div className="info__blob">
							<strong>200</strong> cleaners
						</div>
						<img className="info__img" src={image1} />
					</div>
					<div className="info__bubble">
						<div className="info__blob">
							<strong>200</strong> liters of trash
						</div>
						<img className="info__img" src={image2} />
					</div>
					<div className="info__bubble">
						<div className="info__blob">
							<strong>200</strong> time
						</div>
						<img className="info__img" src={image3} />
					</div>
				</div>
			</div>
		</div>
	);
};