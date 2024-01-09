import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FlexBox,
  HiddenOnDesktopDiv,
  HiddenOnMobileDiv,
  IconButton,
  MeniButton,
  TextBox,
} from "./stilovi";
import useCookies from "./stranice/udice/useCookies";
import { useGetKorisnikIme } from "./stranice/udice/useGetKorisnik";

export default function Meni() {
  const [showMobileMeni, setShowMobileMeni] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useCookies();
  const [ime, setIme] = useState("");
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [prijavljen, setPrijavljen] = useState(false);

  const { data } = useGetKorisnikIme(token || "");

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getKorisnikIme"] });
  }, [pathname, queryClient]);

  useEffect(() => {
    setIme(data ? data : "");
    if (data !== undefined) setPrijavljen(true);
  }, [data, token]);

  return (
    <>
      <div
        style={{
          /*background: "#dd4444"*/ background: "#a82f2d",
          padding: "0 1rem 0 1rem",
        }}
      >
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
              <IconButton
                onClick={() => {
                  setToken("");
                  navigate("/");
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size="xl"
                  style={{ color: "#ffffff" }}
                />
              </IconButton>
              <TextBox $size="1.2">{ime}</TextBox>
            </FlexBox>
          </HiddenOnMobileDiv>
          <TextBox>DraculaCharity</TextBox>
          <HiddenOnMobileDiv>
            <FlexBox>
              <MeniButton onClick={() => navigate("/info")}>O nama</MeniButton>
              <MeniButton onClick={() => navigate("/lokacije")}>
                Lokacije
              </MeniButton>
              {!prijavljen && (
                <MeniButton onClick={() => navigate("/registracija")}>
                  Registriraj se
                </MeniButton>
              )}
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
              <MeniButton onClick={() => navigate("/lokacije")}>
                Lokacije
              </MeniButton>
              {!prijavljen && (
                <MeniButton onClick={() => navigate("/registracija")}>
                  Registriraj se
                </MeniButton>
              )}
            </FlexBox>
          </div>
        </HiddenOnDesktopDiv>
      )}
      <Outlet />
    </>
  );
}
