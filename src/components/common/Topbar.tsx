// import { AppBar, Toolbar, Typography } from "@mui/material";
// import colorConfigs from "../../configs/colorConfigs";
// import sizeConfigs from "../../configs/sizeConfigs";

// const Topbar = () => {
//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         width: `calc(100% - ${sizeConfigs.sidebar.width})`,
//         ml: sizeConfigs.sidebar.width,
//         boxShadow: "unset",
//         backgroundColor: colorConfigs.topbar.bg,
//         color: colorConfigs.topbar.color
//       }}
//     >
//       <Toolbar>
//         <Typography variant="h6">
//           React sidebar with dropdown
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Topbar;
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: isSidebarOpen ? `calc(100% - ${sizeConfigs.sidebar.width})` : "100%",
        ml: isSidebarOpen ? sizeConfigs.sidebar.width : 0,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        transition: "width 0.3s, margin-left 0.3s",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          React sidebar with dropdown
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
