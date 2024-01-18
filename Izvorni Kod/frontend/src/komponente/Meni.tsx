import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const [mbo, setMbo] = useState(token);
  const [ime, setIme] = useState("");
  const queryClient = useQueryClient();
  const [prijavljen, setPrijavljen] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { data } = useGetKorisnikIme(mbo || "");

  
  useEffect(() => {
    setMbo(sessionStorage.getItem('mbo'));
    setIme(data ? data : "");
    setPrijavljen(false);
    setAdmin(false);

    if (data !== undefined && data !== "") setPrijavljen(true);

    if (mbo === "admin") {
      setAdmin(true);
      setIme("Admin");
      setPrijavljen(true);
    }
  }, [data, mbo, queryClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMbo(sessionStorage.getItem('mbo'));
    }, 500);
    return () => clearInterval(interval);
  });

  const handleHomePage = () => {
    navigate("/stranica-korisnika")
  }

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
            {prijavljen && (
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
                <MeniButton onClick={handleHomePage} style={{cursor: "pointer"}}>{ime}</MeniButton>
              </FlexBox>
            )}
          </HiddenOnMobileDiv>
          <TextBox onClick={() => navigate("/")} style={{cursor: "pointer"}}>DraculaCharity</TextBox>
          <HiddenOnMobileDiv>
            <FlexBox>
              <MeniButton onClick={() => navigate("/info")}>O nama</MeniButton>
              <MeniButton onClick={() => navigate("/lokacije")}>
                Lokacije
              </MeniButton>
              {!prijavljen && (
                <MeniButton onClick={() => navigate("/login")}>
                  Registracija/Prijava
                </MeniButton>
              )}
              {admin && (
                <>
                  <MeniButton onClick={() => navigate("/verifikacija")}>
                    Verificiraj korisnike
                  </MeniButton>
                  <MeniButton onClick={() => navigate("/stvaranje-akcija")}>
                    Stvori novu akciju
                  </MeniButton>
                  <MeniButton onClick={() => navigate("/promijena-akcija")}>
                    Promijeni akciju
                  </MeniButton>
                  </>
                  
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
                <MeniButton onClick={() => navigate("/login")}>
                  Registracija/Prijava
                </MeniButton>
              )}
              {admin && (
                <>
                  <MeniButton onClick={() => navigate("/verifikacija")}>
                    Verificiraj korisnike
                  </MeniButton>
                  <MeniButton onClick={() => navigate("/stvaranje-akcija")}>
                    Stvori novu akciju
                  </MeniButton>
                  <MeniButton onClick={() => navigate("/promijena-akcija")}>
                    Promijeni akciju
                  </MeniButton>
                </>
              )}
            </FlexBox>
          </div>
        </HiddenOnDesktopDiv>
      )}
      <Outlet />
    </>
  );
}
