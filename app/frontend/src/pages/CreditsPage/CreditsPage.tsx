// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
  logoHfLA,
} from "assets/images/images";
import { HeaderNav, FooterNav, Button } from "components/components";
import { Card } from "components/Cards/StandardCard";
import { iconData } from "pages/api_data/creditsIconData";
import { illustrationData } from "pages/api_data/creditsIllustrationData";

const CreditsPage = () => {
  const [activeData, setActiveData] = useState(illustrationData);
  const [activeButton, setActiveButton] = useState("btnIllustration");

  const handleClickBtnIllustration = () => {
    setActiveButton("btnIllustration");
    setActiveData(illustrationData);
  };

  const handleClickBtnIcon = () => {
    setActiveData(iconData);
    setActiveButton("btnIcon");
  };

  return (
    <>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier/1" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main>
        <section className="body-container">
          <div className="main-container">
            <div className="text-container">
              <h1 className="credits-intro-title mt-0 mb-3">Credits</h1>
              <p className="paragraph-1 credits-intro-paragraph">
                Thank you to all of the artists and sponsors who help make our
                projects successful. Check out all of the illustrations and
                iconography we have used on our site.
              </p>
            </div>

            <h2 className="credits-test">Illustrations & Iconography</h2>

            <div>
              <Button
                color="primary"
                size="md"
                length="long"
                onClick={handleClickBtnIllustration}
                addClass={`mr-3 btn-border ${
                  activeButton === "btnIllustration" ? "" : "btn-outline"
                }`}
              >
                Illustrations
              </Button>
              <Button
                size="md"
                length="long"
                onClick={handleClickBtnIcon}
                addClass={`mr-3 btn-border ${
                  activeButton === "btnIcon" ? "" : "btn-outline"
                }`}
              >
                Iconography
              </Button>
            </div>
          </div>

          <div className="grid">
            {activeData.map((cardData) => (
              <Card key={cardData.id} addClass="credit-card">
                <div>
                  <cardData.imgSrc className="credit-card-img" />
                  <div className="flex-container mt-3 mb-5">
                    <div className="flex-column mr-2">
                      <div className="label">Name:</div>
                      <div className="label">Used In:</div>
                      <div className="label">Provider:</div>
                    </div>
                    <div className="flex-column">
                      <div className="value">{cardData.name}</div>
                      <div className="value">{cardData.usedIn}</div>
                      <div className="value">{cardData.provider}</div>
                    </div>
                  </div>
                  <a className="links" href={cardData.link}>
                    Learn more
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="join-us-section">
          <div className="flex-container join-us-content-container">
            <img
              className="flex-col mr-3"
              src={logoHfLA}
              alt="Hack for LA logo"
            />
            <div className="flex-col join-us-text">
              <h3>Join us!</h3>
              <p>
                Civic Tech Jobs is one of the many projects at{" "}
                <a className="links" href="https://www.hackforla.org/">
                  Hack for LA
                </a>
                , <br></br>Code for America's Los Angeles chapter.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/credits" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </>
  );
};
export { CreditsPage };