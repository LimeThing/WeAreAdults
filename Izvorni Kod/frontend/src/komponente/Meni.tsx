import { faArrowRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  FlexBox,
  HiddenOnDesktopDiv,
  HiddenOnMobileDiv,
  IconButton,
  MeniButton,
  TextBox,
} from "./stilovi";

export default function Meni() {
  return (
    <>
      <div style={{ background: "#dd4444" }}>
        <FlexBox $justify="space-between" $height="3rem">
          <HiddenOnDesktopDiv>
            <IconButton>
              <FontAwesomeIcon
                icon={faBars}
                size="xl"
                style={{ color: "#ffffff" }}
              />
            </IconButton>
          </HiddenOnDesktopDiv>
          <HiddenOnMobileDiv>
            <FlexBox>
              <IconButton>
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
              <MeniButton>O nama</MeniButton>
              <MeniButton>Lokacije</MeniButton>
              <MeniButton>Registriraj se</MeniButton>
            </FlexBox>
          </HiddenOnMobileDiv>
        </FlexBox>
      </div>
      <Outlet />
    </>
  );
}
