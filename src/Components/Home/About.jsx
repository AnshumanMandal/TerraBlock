import React from "react";
import Three from './Three'

const About = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-between">
        <div className="h-full w-1/2">
          <h1 className="text-8xl font-black pt-32 px-10">ABOUT US</h1>
          <p className="w-[55vw] pl-10 pr-32 text-xl font-bold pt-20">
            At terra block, we are transforming real estate investment by harnessing
            the power of <span className="imp">blockchain technology</span>. Our goal is to make property
            ownership accessible to everyone by creating a <span className="imp">secure, decentralized</span>
            platform where you can buy, sell, and trade <span className="imp">tokenized real estate</span>
            using the Ethereum blockchain. <br />
            <br />
            With terra block, traditional barriers to property investment—like large
            capital requirements and geographic limitations—become a thing of
            the past. We break properties into digital tokens, allowing
            investors to purchase <span className="imp">fractional shares</span>. Each token represents a
            legal stake in a property, offering both <span className="imp">security and transparency</span>.{" "}
            <br />
            <br />
            Through Ethereum's blockchain, all transactions are <span className="imp">transparent, immutable, and efficient</span>, giving buyers and sellers the confidence
            to engage in a <span className="imp">secure and trustless ecosystem</span>. Whether you're
            looking to <span className="imp">diversify your portfolio</span>, invest in real estate without
            the hassle, or earn from property appreciation and rental income,
            terra block offers a <span className="imp">seamless, modern solution</span>. <br />
            <br />
            Join terra block and be part of the future of property investment—where
            owning real estate is as easy as owning digital assets.
          </p>
        </div>
        <div className="h-[70%] rounded-2xl w-1/2">
          <Three/>
        </div>
      </div>
    </>
  );
};

export default About;
