import React from "react";

import lazzafooteremblom from "../../../assets/logo/lazzafooteremblom.png";
import lazzapremiumlogo from "../../../assets/logo/lazzapremiumlogo.png";
import { Link, IconButton, Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone'
import { makeStyles } from "@material-ui/core/styles";

import { FooterMenuItems } from "./footerMenu";
import "./footer.css";

const useStyles = makeStyles((theme) => ({
  phoneIcon: {
    backgroundColor: "#be9621",
    margin: theme.spacing(0.5),
    position: "fixed",
    bottom: theme.spacing(14), 
    right: theme.spacing(2), 
    width: theme.spacing(8), 
    height: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    }
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <div className="footerdiv">
      <Grid item container spacing={3}>
        <Grid item xs={12} md={3}>
          <img src={lazzafooteremblom} />
        </Grid>

        <FootMenuList />

        <Grid item xs={12} md={3}>
          <img src={lazzapremiumlogo} />
        </Grid>
        <Avatar className={classes.phoneIcon} >
          <a href="tel: 9946037777" target="_blank" style={{ color: 'white' }}>
            <div className="iconcls">{<PhoneIcon />}</div>
          </a>
        </Avatar>
      </Grid>
    </div>
  );
}
const FootMenuList = () => (
  <>
    {FooterMenuItems.map((menu) => (
      <Grid item xs={12} md={2}>
        <div className="textclass"><b>{menu.title}</b></div>
        {menu.subMenu.map((i) => (
          <>
            <Link
              href={i.url}
              style={{ outline: "none", textDecoration: "none" }}
              underline="none"
            >
              <div className="textclass">{i.title}</div>
            </Link>
            <div className="socialIcons">

              {i.socialMedia?.length > 0
                ? i.socialMedia.map((c) => (

                  <Avatar
                    style={{ backgroundColor: "#be9621", margin: "5px" }}
                  >
                    <a href={`${c.url}`} target="_blank" style={{ color: 'white' }}>
                      <div className="iconcls">{<c.icon />}</div>
                    </a>
                  </Avatar>
                ))
                : null}

            </div>
          </>
        ))}
      </Grid>
    ))}
  </>
);

// import React from "react";
// import "./footer.css";
// import {
//   Grid,
//   Typography,
//   Paper,
//   Divider,
//   IconButton,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// import fbIcon from "@material-ui/icons/Facebook";
// import twitter from "@material-ui/icons/Twitter";
// import instagram from "@material-ui/icons/Instagram";
// import pinterest from "@material-ui/icons/Pinterest";
// import {
//   useTheme,
//   createMuiTheme,
//   responsiveFontSizes,
//   MuiThemeProvider,
// } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import lazzafooteremblom from "../../../assets/logo/lazzafooteremblom.png";
// import lazzapremiumlogo from "../../../assets/logo/lazzapremiumlogo.png";
// let theme = createMuiTheme();

// const restheme = responsiveFontSizes(theme);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "#000000",
//     padding: theme.spacing(2),
//     marginTop: theme.spacing(2),
//     // height: 365,
//     // [theme.breakpoints.down("sm")]: {
//     //   height: 640,
//     //   padding: theme.spacing(3),
//     // },
//   },
//   footerPaper: {
//     paddingTop: theme.spacing(2),
//     backgroundColor: "#000000",
//   },
//   footerTypography: {
//     paddingTop: theme.spacing(2),
//     color: "#be9621",
//     fontSize: "18px",
//   },
// }));

// function Footer() {
//   const classes = useStyles();
//   const theme = useTheme();

//   const IsMD = useMediaQuery(theme.breakpoints.down("xs"));
//   //console.log("mdds==>>", IsMD);

//   return (
//     <>
//       <div className={classes.root}>
//         <MuiThemeProvider theme={restheme}>
//           {/*<Paper className={classes.root}>*/}
//           <Grid container justify="space-evenly" spacing={1}>
//             <Grid item xs={12} sm={6} md={3} justify="center">
//               <Paper className={classes.footerPaper} elevation={0}>
//                 <img src={lazzafooteremblom} style={{ width: "75%" }} />
//               </Paper>
//             </Grid>
//             <Grid container item xs={12} sm={6} md={2} justify="center">
//               <Paper className={classes.footerPaper} elevation={0}>
//                 <Typography variant="h5" className={classes.footerTypography}>
//                   Help
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Track Your Order
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Chat With Us
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Contact Us
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid container item xs={12} sm={6} md={2} justify="center">
//               <Paper className={classes.footerPaper} elevation={0}>
//                 <Typography variant="h5" className={classes.footerTypography}>
//                   ABOUT US
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Our History
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Privacy Policy
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Terms & Conditions
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   Privacy policy
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid container item xs={12} sm={6} md={2} justify="center">
//               <Paper className={classes.footerPaper} elevation={0}>
//                 <Typography
//                   variant="h5"
//                   className={classes.footerTypography}
//                   // style={{ color: "rgba(242,217,150,1)" }}
//                 >
//                   CONTACT US
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   008009000090
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   className={classes.footerTypography}
//                   //style={{ color: "rgba(233,182,53,1)" }}
//                 >
//                   customercare@lazza.co.in
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid container item xs={12} sm={6} md={3} justify="center">
//               <Paper className={classes.footerPaper} elevation={0}>
//                 <img src={lazzapremiumlogo} style={{ width: "75%" }} />
//               </Paper>
//             </Grid>
//           </Grid>
//           {/*</Paper>*/}
//         </MuiThemeProvider>
//       </div>
//     </>
//   );
// }

// export default Footer;
