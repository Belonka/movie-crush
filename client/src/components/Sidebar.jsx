import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemText,
  IconButton,
  Box,
  
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Sidebar({ genres =[], onSelectGenre, selectedGenre }) {
  const theme = useTheme();
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  // const [activeGenre, setActiveGenre] = useState(selectedGenre ||"All");
  

  const toggleDrawer = () => setOpen(!open);

  
  const drawerContent = (
    <Box sx={{ width: 200 }} role="presentation">
      <Button
        variant="text"
        selected={selectedGenre === null}
        onClick={() => {
          onSelectGenre(null)
          if (isMobile) toggleDrawer();
        } }
        sx={{
          fontSize: { xs: "2rem", sm: "3rem" },
          fontWeight: "bold",
          textTransform: "none",
          display: "block",
          mx: "auto",
          color: selectedGenre
          ? theme.palette.text.primary 
          : theme.palette.primary.main,
        }}
      >
          ALL MOVIES
    </Button>
        
      <List>
        {genres.map((genre) => (
            <ListItemButton
            key={genre.id}
            selected={selectedGenre === genre.id}
            onClick={() => {
              // setActiveGenre(genre.id);
              onSelectGenre(genre.id);
              if (isMobile) toggleDrawer(); 
            }}
            sx={{
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              backgroundColor:
              selectedGenre === genre.id ? theme.palette.action.selected : "inherit",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                transform: "scale(1.03)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <ListItemText
              primary={genre.name}
              primaryTypographyProps={{
                fontSize: "2rem",
                fontWeight: 500,
                color:
                selectedGenre === genre.id
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ 
            
            fontSize: '5rem',
            position: "fixed",
            top: "8.3rem",
            left: "2.5rem",
             }}
        >
          <MenuIcon sx={{ fontSize: "3rem", }}/>
        </IconButton>
      )}

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            mt: { xs: "10rem", lg: "11.5rem" },
            ml: {sm: "1.5rem"}
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}