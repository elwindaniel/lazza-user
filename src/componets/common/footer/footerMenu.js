import fbIcon from "@material-ui/icons/Facebook";
import twitter from "@material-ui/icons/Twitter";
import instagram from "@material-ui/icons/Instagram";
import pinterest from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";

export const FooterMenuItems = [
  {
    title: "ABOUT US",
    subMenu: [
      // {
      //   title: "Chat With Us",
      //   url: "/",
      // },
      {
        title: "Our History",
        url: "/aboutUs",
      },
      {
        title: "Contact Us",
        url: "/contactUs",
      },
    ],
  },
  {
    title: "POLICIES",
    subMenu: [
      {
        title: "Cancellation Policy",
        url: "/cancellationpolicy",
      },
      {
        title: "Privacy Policy",
        url: "/privacypolicy",
      },
      {
        title: "Terms & Conditions",
        url: "/termsandconditions",
      },
    ],
  },
  {
    title: "CONTACT US",
    subMenu: [
      {
        title: "9946037777",
        url: "tel: 9946037777",
      },
      {
        title: "support@lazza.co.in",
        url: "/",
      },
      {
        socialMedia: [
          {
            icon: fbIcon,
            url: "https://facebook.com/lazzaicecream.in",
          },
          // {
          //   icon: twitter,
          //   url: "/",
          // },
          {
            icon: instagram,
            url: "https://instagram.com/lazza.icecream_official",
          },
          {
            icon: YouTubeIcon,
            url: "https://www.youtube.com/channel/UCLSZ1W_zTbP1t-KtgJQQi9w",
          },
        ],
      },
    ],
  },
];
