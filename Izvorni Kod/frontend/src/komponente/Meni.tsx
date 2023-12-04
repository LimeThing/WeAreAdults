import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FlexBox,
  HiddenOnDesktopDiv,
  HiddenOnMobileDiv,
  IconButton,
  MeniButton,
  TextBox,
} from "./stilovi";

export default function Meni() {
  const [showMobileMeni, setShowMobileMeni] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ background: "#dd4444", padding: "0 1rem 0 1rem" }}>
        <FlexBox $justify="space-between" $height="3rem">
          <HiddenOnDesktopDiv>
            <IconButton
              onClick={() => {
                setShowMobileMeni(!showMobileMeni);
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                size="xl"
                style={{ color: "#ffffff" }}
              />
            </IconButton>
          </HiddenOnDesktopDiv>
          <HiddenOnMobileDiv>
            <FlexBox>
              <IconButton onClick={() => alert("Odjava")}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size="xl"
                  style={{ color: "#ffffff" }}
                />
              </IconButton>
              <TextBox $size="1.2">Ime Prezime</TextBox>
            </FlexBox>
          </HiddenOnMobileDiv>
          <TextBox>DraculaCharity</TextBox>
          <HiddenOnMobileDiv>
            <FlexBox>
              <MeniButton onClick={() => navigate("/info")}>O nama</MeniButton>
              <MeniButton onClick={() => navigate("/lokacije")}>Lokacije</MeniButton>
              <MeniButton onClick={() => navigate("/registracija")}>Registriraj se</MeniButton>
            </FlexBox>
          </HiddenOnMobileDiv>
        </FlexBox>
      </div>
      {showMobileMeni && (
        <HiddenOnDesktopDiv>
          <div
            style={{
              background: "#dd4444",
              height: "100%",
              width: "fit-content",
            }}
          >
            <FlexBox
              $direction="column"
              $height="100%"
              $width="fit-content"
              style={{ padding: "1rem 1rem 1rem 1rem", background: "#cc4444" }}
            >
              <MeniButton onClick={() => navigate("/info")}>O nama</MeniButton>
              <MeniButton onClick={() => navigate("/lokacije")}>Lokacije</MeniButton>
              <MeniButton onClick={() => navigate("/registracija")}>Registriraj se</MeniButton>
            </FlexBox>
          </div>
        </HiddenOnDesktopDiv>
      )}
      <Outlet />
    </>
  );
}
