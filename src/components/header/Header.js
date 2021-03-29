import React from "react";
import "./Header.css";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <p className="app-name">Contentify</p>
      </div>
      <TextField
        variant="outlined"
        size="small"
        name="searchbox"
        placeholder="Search"
        type="text"
        id="searchbox"
        className="searchbox"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Avatar />
    </div>
  );
};

export default Header;
