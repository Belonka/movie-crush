import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton } from "@mui/material";
import { alpha, styled, useTheme  } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion, AnimatePresence  } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClapperLogo from "./ClapperLogo";
import SearchBar from "./SearchBar";


export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleSearch = () => setOpen(!open);

  return (
    <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h3"
            noWrap={false}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              pl: {               
                xs: "0.4rem",
                md: "1rem"
              },
              fontSize: {
                md: "4rem",
                xs: "2.5rem",
              },
            }}
            onClick={() => navigate("/")}
          >
        
            <ClapperLogo size={26} />
            MovieCrush
          </Typography>

          
          
          {/* {isMobile ? (
        <div style={{ position: "relative" }}>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <SearchIcon  
                sx={{fontSize: "2.2rem"
                    }}/>
          </IconButton> */}

{!isMobile && (
  <SearchBar variant="desktop" />
)}

{isMobile && (
  <IconButton color="inherit" onClick={() => setOpen(true)}>
    <SearchIcon sx={{ fontSize: "2.2rem" }} />
  </IconButton>
)}

<AnimatePresence>
  {isMobile && open && (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",        // 🔥 ВАЖНО
        // top: "44px",              // высота AppBar
        left: 130,
        width: "70%",            // 🔥 ВАЖНО
        padding: "0 16px",
        zIndex: 2000,
        // backgroundColor: alpha(theme.palette.primary.main, 0.65),
      }}
    >
      <SearchBar
        variant="mobile"
        onClose={() => setOpen(false)}
      />
    </motion.div>
  ) }
</AnimatePresence>

{/* <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "5rem",
                      width: "100%",
                      left: 0,
                      backgroundColor: alpha(theme.palette.primary.main, 0.65),
                      marginTop: theme.spacing(1),
                      overflow: "hidden",
                      zIndex: 1000,
                    }}
                  >
                    <SearchBar variant="mobile" onClose={() => setOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence> */}
            {/* </div> */}
          {/* ) : (
            <SearchBar variant="desktop" />
          )} */}

          <IconButton color="inherit" 
          sx={{ ml: 2,
            '& .MuiSvgIcon-root': { 
              fontSize: '2.2rem', 
              '@media (min-width:600px)': { 
                fontSize: '2rem',
              },
              '@media (min-width:900px)': { 
                fontSize: '3rem',
              },
            },
            }} 
          onClick={() => navigate("/favorites")}>
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}