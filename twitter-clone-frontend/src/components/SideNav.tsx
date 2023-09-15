import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './SideNav.css';

const SideNav: React.FC = () => {
  return (
    <div className="side-nav">
      <TwitterIcon/>
      <div className="nav-option"><HomeIcon/> Home</div>
      <div className="nav-option"><SearchIcon/> Explore</div>
      <div className="nav-option"><NotificationsNoneIcon/> Notifications</div>
      <div className="nav-option"><NotificationsNoneIcon/> Notifications</div>
      <div className="nav-option"><MailOutlineIcon/> Messages</div>
      <div className="nav-option"><BookmarkBorderIcon/> Bookmarks</div>
      <div className="nav-option"><ListAltIcon/> Lists</div>
      <div className="nav-option"><PermIdentityIcon/> Profile</div>
      <div className="nav-option"><MoreHorizIcon/> More</div>
      {/* Add more navigation options as needed */}
    </div>
  );
};

export default SideNav;