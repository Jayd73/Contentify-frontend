import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import VideoCard from "../cards/VideoCard";

const useStyles = makeStyles({
  gridContainer: {
    boxSizing: "border-box",
    margin: 0,
    paddingLeft: 2,
  },
});

const VideoContainer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely Raven more meaninglittle december dirges from the my ominous sad from. Now from the with darkness more a, spoken i the of take minute above tell the tapping. Nothing repeating."
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://s3.amazonaws.com/files.dezyre.com/images/Why+you+should+learn+machine+learning%3F/Learn+Machine+Learning.png"
          title="Importance of ML"
          channelName="Machine Learning"
          avatarSrc="https://image.freepik.com/free-vector/ai-artificial-intelligence-logo-hands-artificial-intelligence-machine-learning-concept-sphere-grid-wave-with-binary-code_127544-18.jpg"
          views="7.7M"
          timeAgo="9 months ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://s3.amazonaws.com/files.dezyre.com/images/Why+you+should+learn+machine+learning%3F/Learn+Machine+Learning.png"
          title="Importance of ML"
          channelName="Machine Learning"
          avatarSrc="https://image.freepik.com/free-vector/ai-artificial-intelligence-logo-hands-artificial-intelligence-machine-learning-concept-sphere-grid-wave-with-binary-code_127544-18.jpg"
          views="7.7M"
          timeAgo="9 months ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely "
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgSEhYYGRgZGBgYHBgYGBoYGhgaGRgZGhoYGRkcIS4lHB4rHxgYJjgnKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQsJCQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xAA5EAABAwIEAwcCBAUEAwAAAAABAAIRAyEEEjFBBVFhBhMicYGRoRTwMkKxwQdSYtHhI3KS8RUWov/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAAICAQUBAQADAAAAAAAAAAABAhEDEhMhMUFRYQQy8P/aAAwDAQACEQMRAD8A8wdSvPqmrUoIGx8QPXf4CM8nKMt7Xn90qL2uN4iP+lYgDGS09Nf2KG5h5XV5tOZaPxCPUEcuWqE8Frgd/wB0mUaOA7R1mNFPORAygnxAC0a6aaroqfaYNojMC+oCAZGUEc5HpsFxNaja33vKlh8VYixj09ua2hnlH0wnhjLw9AwXH6NSc0sytDiXXGoBAi5uRstVlJr2hzCHA6EGQvNiyQDzAK0uCcXfhnz+JhsWEwPMciuyH8lv+xzTwVzE7V2FUHYVaGExtKowVA9rQdnOaCLxBvzVruAbiD5LpuL6Oe2uzCOGUDh1uOwqy+MY+nhmh1SZdOVrRJMfpqplSVsuLb4RV7hLuVl0+1tMuh1N7ROsgx1hb+EqMqs7ym4ObzG3QjUFZqcZdM1alHsqdyl3S0TQUDSQxplDu0siumkommkykVciWVWcifIpbLSKwYnyqxkT92pspIr5U+RH7tLu0mykgIYnyIwppxTU2WkByp8qOGJxTSchqJXDE+RWRTT92p1FqJWDE/dqz3afu1LkNRKhYommrvdqJppaitBRNNQcxaBpKDqSWoekz3U0Pu1fdTQ+7S1BpPMnvguA3B11B+4VUnb1VmvTLiQOZn+6qvJ31CzMDR4I0l5zSRlPqpYyjleRsHO9p/tCt9n2gtDrTPx0+9k2MZLy8TEE9SeUeyV8jrgq1y2HUx+Lckfv7e6y2NykkbGI/ZadGhndn5m/IxeB5j9FQe4S+B+JxtyukMt0McS0DLJBgknRsx+qvUgHiW3CzcF+LSczT7zIPz8LpeCUclPe5c2/yJ1FjHqqUmiHFMze7TMrPYczXOBGhBII9QuhxFBuUEsZcvADXGROgO9psekFZdXBGLA5gTPQbW91rHJZMsdF0dscS1ndgsLtM5bL494J6kFc9i8Y+o7PUe57oiXGbchyFyrFXCkAOIsZjTb/ALVd9NXKbkuzOMVF8ICalsp0BkdOYH3srOBxjqZz03ljhyJGYWtERa+v/YHU1AMUddGnfZ6J2Z433/8Ap1HNzx4SfC53SNCYvIjyXROw68gpsXT8E7U1aHgqDvWbBxIc3/a6/sfhbxzeSMpY/Udm7DqDqCza/bzBAsaC8lzg13ggMB1c4kwQOkmxXVtwocA5pBBEggggjmCNVWuL6YlFrswjRS7lbTsCeSg7CgEAkSbASJNpgDyupcjRRMjuUu6Wz9CnGAUOZoomN3KXcraGAS+hUuZooGOKKkKC1xglL6RQ5lqBkCinFFa30iX0qlzLUDK7lP3S0/pUvplDyFrGZvdJ+6Wj9Ol9Ok8hSxmd3aRpLR+nTGgo3C9szDSUHU1qHDqDsOjcDbMl1NCNNar8OhHDpbgbZ5C1gc3OIvJd+3l/hU305J01RsMS2PU/CsYyh4WwLyZFhzvK2POI0GBgBpuNrxrMxr0VplQTmaJuT6nT0mVnlhggG4FusiQp4Bzmy06agedifTX0SoLHqVw0m+5sBYWEfEqm6kR4/wApsrmIo7yQTHyf2hWMPSzkse2wudgLdEwM3ATnEXiB5BdtwSn/AKRLmkS4uN9HGdDtp8LkMA3Jmf8AyyQed9/ddaOIOpsa1uUtcWkgiZsYUSvwuNelypgjkNRrgGi8uIBMbAnX0QKeGeXTTe0kgEua4Oibw7rY+xVatxbMwtexgBLZIkaXk+v6o/BePsoVDUpsERlc2RleDucwP2UVILj5ZJ+FeHF9TKfFJcGZjI10G3sqeJwVNwmmS12pzCGHX8OpGm+60Md2gZUcTkDL/kAIIO2U20I81u4HhDa1MMztAgmTlJBBGuUW1i3JPU4q3wOoydR/zPPH4Y8kJ1Hou9HAGB0d9ThkS7M0WBH4b33Wdxbg7Q8Gg5j2vMANeHFrtxEzB1HnCqOVSun0RLFKKVrs5NrNkHiRLaZIMaD3O3VdjS4IQ15qMLvAQzLI8WZovI5E2XEdonPbU7lzS3JBIO5IkHyg/qjXF8IWhrsxVpcN47icOAKFd7AJOVrjll0ScptNhss8hKFIzTHHsTlc36irDi1zpqOJJbMGSZGu3TkFLhHGqlDEMxQJe9jpOZxJeIyua5xvdtvbkspycBOxn0/g8fh6rWOZVpuzhpaA9snMJAiZm+ivfTdF898EeQxhabt33aQZHlFl632X7aNqBtLFkNfoKlg1/LN/K7rp5JtsuMvw6j6boonClX4UgFnJsvUZv0pS+lWmGp8qxcw3GZRwqgcKtctCi5oWbyopZWZBwqb6VaToXGdru3lHAvFIMNWplzOaHhoZP4Q50G51iNI5pKbk6Rops3zh0xpLyrtR/Ex9ZjaeDa+joXvJaXkwZY2Jhsmc1iY0C4rA8br0356dao1xdmJDneI83CYd6zK0UJNWPfSdH0OaSY0ly3A+3uGqUWuxL206os5sOgkfmbANjy9FtcN7R4bEFzaNVri3UQWnzAcBmHULGTku0bKd9F000NzEZ1UIT6oWbmaxsC5qHlCVWuBc/An4CycT2goU3ZalQNdrBsY8jdJSb6NUkuzyJkyNNdf2KuF5sIlVA+DfQhHto114LoOt7ged16tngAsO9oMxM2O0KTn2n+mAINzJA8lRYXtMEGSb+U3NlD6pwfzEnXytdFhRp4l+XJIBl2hN5yzf1/RW2l3dvnVzDcWiHAbaGCPZYT3ulpqeKea3sM/PQJIDczSL2ubC/mPlICtw2kH02sI1fknqBm9ZAKucbYC4BtspaBGwybfHsp8Cb4G5hGVzgdiCBY+0rneK1nOe8yTBA9I/yivQbL9apIDA4GIsN4F/1+FXInQ/cKrw6kLPm4e0e/8A0Vfx2GLajm3EGI2O4M9QQrX6JvkLRxQYIiZnXbSPPRFwfFH03Zqby0wRLTzELNG4Nx+nJQa02id0SipKmEZOLtGq7FvInNr11UG1HB0gkHnP7qk18jJaZmem4CM4PF4MHpp8JKCXRUpt9mu3ilQiC7l008lhcce59UPeZJYBPkTZFficotyWa95NzfzS0KL4Qam+wTmJmsRs0prSnRNgXNTsCI5qG0JFG52ccM5YY8YtzLhoBtpPwuqOFLfhcFRqFrg5pIIgggwQRuCuso9ta3dClUAeAZBgB3qQL76qW5JqhpnqXZDjziw0akucwS1xNyywg84Pwei3ncUds0fK8e4T2tpseHhjg7TLIDTO2bYLoHdtWzBpu9Hg+ggXUPGmzWLj6d0/i7xs32P91Xfxmrzb7LhsR2y0y0HkyZzGLcxAMlFw/aMvaT3LmkbFwg8r6/BRs34VqxnWO4xW/mH/ABb/AGWRie29Njix+IYCDlIsYMTsPleedpu2dR2ajRDqYBhzpIeTu1v8o66nouIc9Tsx9QSyRXSPcMV22phrnDEUzDS4BpbJtYDmZ2XjOOxrqr31ahlz3FzjzLjJVQPT51UYRj0iJZW1Q5cmlRzJErQzCd4UhVOqFKaUUPUzpMH2vxTAGmoXNbYNfJ/+h4vkro8D22a/wue9h/qdLf8Alt6wvOJSlQ8UX4axzzj6ddx/tdVe51OjUIYNXNJl1rwdh5clydSqXHMSSTck3JPOUMpJqEV0iJ5ZyfLN6q4RLbEvgidAOXS0p6ckknUtF0CrrB2JEe8K3gXF0eony+/laGQwYbQcxbM+yzqw8fIEgjpNv72Wo85KmXYgenRUazJe+IMX8pSADSfnaWQCbx5kqyeJP/KZYGhkRYnLc9JuqWCpkVBtHinyRquHI8I6kxz1QB0nCnWaRo9paRyeAId6gn2WNi8MA5w1DmzO+YW/stfhTy1ku1DhryIAHwgUWCq4OAAGe1riSS6fhNCZicOBLgBqDJ6Rz6XXRcQqA1XFwjwMjrDo94CoYLDjv6paYyvgR0N/3UuNvOdr5gFoA9HEn9UeC9KDKgvHpdSxVVroDeQnrYItLDgyHCNDb1W/wvsg6rlOdjWugySZgif0TbpAuTmQ6bAbe0SrNSo51gPDy+yuzp9i2BzmGsyA0lpJsTsD6KlxDs13GV1So0y6MjZkgamTpsPVTHJqbS8LljcUm32co7Dk9B1VK2i9A/8AH0HsfTa1/wCB5kBuYBjHOJ6my89DSE1K2010S1S7JAJi2T1Sc7aURj7pisFF/RNl5I0G3QKVOjySHZGkyfZWm4XMIbJNrAKLKML1H+FPCHZn4iowFgAY0nZ4INm+R1SZUeWclwnsJjajmA0Hsa6PG+Gho5kHxfC9T4X2Fw9JgY4ve60ucbT/AEtH4R0v5rq0yaj+m2lVRif+q4c8/c/3Q6nZGkQcroMGDBMddVvpwUOL+sWlHytxTCup1alN7g9zHva57Tma8hxBcCNQdVQcvW/4v8ADXsxdKnAfmFVzZjPbI5w0Eib7kc15S9inn0iSpgEkUUTBcAYEAkAwJmJO0wfZQIQIgknhMgBJk6ZACSlJMmAySSSAOgxdIuZ3g5/B0B9CVDBth8SdNf0P6o9TQMBMAN066R7pOwsGQ4e/wUEssYnxAaW1O9th7oVbC5fGJINiDHzGyDUc1tidtBf5Tvxoi0oQ36Vg0B7jymZ5ZRIRHBx8QHt8foq1XE+NxaImN+XL4TvxbiNkxGuyvkYXPBi1usC3qYQeHYoBzGAGXG/UrNfUc4EZiZgoVGn4g7cH1Ssk6SnkpPqS4El4da9iQ8WH+9ZGNa+q7MwWaAALchOuuiG2oc7wd/sfELRwD4B0t4rkQY89fJFgF4TTdmLqmUNgDKZJm3LyK6OjVLKTml7A0naQ8g3IYN9Nv5uqwanEiZsBaBk8IEkEyPzb680B9dzzLjJtr0EJ6W+w1pLg1HYy5AJiTE6x1SxOPc8hzjMANHQDb9VlZ07Hq1FIzcmzUZXdDg1xbma5sjk5pafgrk8TScww8RrHWNx0XR0CsvtE05mEtIaWmCRAde8HeLfCUl6EXzRlNRWhBU2FSUywIR8OQqrSisdCBWd92B7M/VVBWe0d1TeM0/nMA5APaT1XsdOmGgNaA0DQAAAegXD/AMK8A+nhnVXu8NYhzGR+ENzNzE/1cuQC7jOFSRvCUUuySUqBeExeFVF64/SYKdDzpw5FCeSK9JvpB7S1wDmuBBaRIIOoIOoXGY7+GGAe5rmtqU4JLmsecrp2OYOyx/TC7LvUJ9ZQ4NkbqOe4p2XojAVcDhmMYHMOWd3jxMc92pOYC5Xzo9hGojovqGpXXBcf7CUMRWdXzvYXkF7WhpaT+Yifwk+om8KVBobmpI8XIUSF1nansfUwznPph1SjGbOBdgn8LwOVvFEeSy+Edn6+Jc1tNjg06vc0hjRucxsfIXKKEY0JivXm9gsEGgFryQBLs5GY7mBYK/gezuEogZKLCR+Z4D3e7p+EuSkrPEUy7H+IfCyyv37fwVABawa5jQ3L5QAR68lxxTBqmMkkkgRrOxT/AOb2t+iG+sT/AHUGmxlM06IIslcqTjA6lO82QnbIFYzzdRKZ2qZ/+UAHpGfZIktn76qFDf73U62v3yQJkHvl0+i0sMZCzGNXc9jcFTdSc+oxrpdlGYTYAaepPstMUXKVIzyzUY2ZeB4c+qctNhcRryHmTYKGKwb6ZioxzT1B+DoV6JRe1gysAaOQAA+E2JLajHU3iWuEH+46rr2OO+Tk33fXB5sxhdpsCeUAef3oj4WmCb3/AKQTLr6CAfsLoH9mGEnLVcAdi0E+UgiVtcJ4dSw92CX7vdc+nJZLBJvng0edJcclXs32edmbUrshgvlfbNyGUX9/YrZ7c8OZXwb5DGupNL2OIjLl8TmjkHNBHsjtxSVaq17XMcA5rmlrgdCCII9l0bUdNHPuSclI8McE7V1XGOxlVhLsP/qNmzdHtBNgQbO859F0vBex2GpgOrg1HljZa4+FjoOfLlibm0zEBcawybqjteaKjdnm7SiNK7+p2DokvLarwHHwDKDk8UkG/iESBp6qfC+xbKNZlU1c7WODspZlkgGDIJ0dlPonsz+Eb0fp3fZbDHD4WjRcTmayXSZhzyXuaOgLiPRan1CxvqlE4tdCxpI59bZt/UpjilhnFqBxaNCKUmb4xSf6lc+3FogxSNKKUjbOIQ311k/VJHEJaSlIu1KqqPqIT6yA6opcC1MM96C56G56E96lwNFMI+ogPqKD3oLnqXAtTI4tjajSyo0OadWuEgryjtHgG0cQ+nTnIMpbNzBaDrveV6k56x+OYBldjmlozwcjjq07X5KJQLUrPL0yPiKDmOLHiHAwQUFZFF8iyTGpSnDkzII4ShvapgobzZADBicslQDlJjrpDokwQY9fZFqNm6YUHlwhpvvH7lXMLQc17O88IDgSbOFjMWnlHqmlbE+g3C+COqtc5xLAIyktnMd7Wsus4Th+5pinmzQSSYiSTOnsPRVDxFkwHgnkDJ9kx4owa5h5tK7YRhDp8nHPXLzg2e+TissZ3E6YGYvED70QP/OsgljHuAvIgW53K0eSK9M1ik/DoRWU21ly9bjToljW+TiZ9I1WbiOO19CAzoLE+ql5olrBJnfNqqNbGtYMz3ho5uMLz9mMfUt3r276yPcGQFcGA70Zqjy8i4ggx7/sp3/iK2PrOkxHaem0EtlwBiSQ1vub/CC7tkwCQ0ucdGNOZ3wICpYfBgaCBykxH6Kb8K0kGw67qXkl9KWKHwuDtRUgO7iAdQXXHn9lFw/a1pMVGFg2IJN+ocBHpKxcRw4XOYG1iQHR5t3/AMKizBvY6SQTpsGmdLDRLckvStqD8O8w3GaVQgMe0k/lmDbWyt98vL8RUvFxeZaY0N/lXqOIJyvzuDho7NudRG6pZvqIeBeM9BNVRNRYnBOImowh/wCNhyu68neo/QrSzLVNSVoya0umWmvRW1FTD1MPToVlsVFPvVUD04qIoLLJeol6BnTZ1LRaYYuUHFQzpsyWkpSE5BeEQlDclpKUgD1WqK09VqgUuJSkZHE8AysIe2+zh+Jvkf2XJ1ezlUGGuaRzkj4hdvVCqPF1m4Jmim0cOkEwKdkTcwuc0HnZWPpuZ15Qf3TUnsG0mdx/kQkzExOUBom1yfgmE0l6IPQwbdZDul/21RWtayxbBOh06c1QrVnEAZutvCgvqE3P6p2kOmb+cgRAd/tlx9p67KFDGhwyMeWk7uaMmlwWuP31WCHxBCc1nXuff9kWFG/SZkIBIcT+ZjQdNiSf2SxDjNyQCZ/Dc7W+FhB28pB7gZBKLCjTxGHz+K085yTy8ImT5lCoYVzXQGvadJEOB5gxf0Q2Y94iHu90OrjHOdmJE+X7o4Dk1mgx+GI3a2Tfnv76IeIrOAtMdRGvQx8LOZiY0B9/uEWnjXAQbjWCZE+yqyaJ08QWjKGNzTMyGnc2l3TkjU+JVAZyvMflEub7i33oqFTEOMQdBFtNeSG7FPzZg4g9NPUbpah0Xzx2o0zcO5GQI8rfoh1eKVH3z9YaNOd0NmPdH5ep5/sEhjubZG8OcJ9NEr/RpfhZZxF4EVL7g6H3GqJSxoIIzi+k/vyRMNSZUHhaDA/C7MPEfI28xKFUwTmuIjKI/CZP/EjVUk0iG02V6tAHxF8gm17TurWEwIdLczWv5OkT5OEgqocEACQSZ1jbrEKs0bFxtMcttk1x4D59Ot4JRqMq5jBaW5XZXE6SQ68Tt7rpW1mkwCJ5SvPKOMey7bjUjMTfnBurp4w148bXA8wQb8+a1hk0qjKePU7O7Dk4cuDbxusw2fMfldcH9/lbuA7QseAHtLXch4h6RdaxyRZjLFJHQB6fOqlPEBwzNII5hS7xaGRazqOZV+8TZ0FIth6WdVg9P3iVDLBcoOchd4mL0qHZJ5QHqbnITyk0UmV6gVR4urj1XIUtFqR58EzgpJfC4KOpAmyng6KREJy9MqyAaVIBOHp0UKyAYmARU2ZFBZCE7D1SzJ0BYmtJ3TNZCMyExanQWRYb3Ru7AEnRCBAuU7nyNZHmmhEXPG36Ji+dVAHy9VIlIByQRZOyEPN0UwmmJh21Dz9pAV/D8T0bUkjTMDdv9x+l/JZTiYhMGqtTJ0o6QUWmajH52m/XyI38lSbTY8hoAzHaN9YEeeizsLiHMdmExuJ1/wArXaGPBexxteBAcDyKadiaorigBqCOpEfKg+iAZAt+ivVRUa25DhrDpn3mxUDXGgBafL/CppCTZBtEPAjb0t0UO4I6/e0Ju9deCZ15T6gAFKpiHgXHTSCjgOS5wziHdvOZxyn8U+Wsc/vy6elXa8ZmEEHcLgqhlbfZnFHxU4sPFPU2I++SvHOnpM8kOLOkzJByjKS3swCB6fMhhJMQXMlmQiVEuTAKXqLnIZeol6QyTyglOXKMqSkzz6YTMF7pJLzzuQUMDrCyTqHI/wCEklVARazqk2lO/wCySSEgJvpxofdNlO4nyhJJMQxE6A+yGQfTqkkkwJNnaFIyNUkkeAwTjKTWpJKUMTk4gdUkkxjJgkkkIm1TGiSSpCYiFZweIyO6GxTJJrsT6NJmKh2TMIMQeQ5ddrolZgOjwDqN5i0fKSS0RLREm0mx56iR8hUsQ+9/IRt/hJJEgQsLQ7xwZcczyG5++i6fDUWsEMETdJJa4UjHKyyypsiApJLVmLHzJZkkkhDZkxekkmMiXqBckkkMiXJsySSBn//Z"
          title="It this clasp the more by whose nightly, nevermore of then said still. A sad more above thy the shall into than, sat and cannot name then the, grim so lamplight and still that to above, maiden for of my some. Dreams that footfalls he a forgiveness that or. At."
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://miro.medium.com/max/3840/1*yjH3SiDaVWtpBX0g_2q68g.png"
          title="Learn React "
          channelName="React JS"
          avatarSrc="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
          views="3.2M"
          timeAgo="2 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/ShTxGumvbno/maxresdefault.jpg"
          title="The Cosmic Calender"
          channelName="Nat Geo"
          avatarSrc="https://cdn.iconscout.com/icon/free/png-512/national-geographic-461820.png"
          views="10.2M"
          timeAgo="5 years ago"
        />
      </Grid>
      <Grid item>
        <VideoCard
          imgSrc="https://i.ytimg.com/vi/hcbfF8I9zCo/maxresdefault.jpg"
          title="Learn Python completely "
          channelName="Python.Org"
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"
          views="700k"
          timeAgo="1 year ago"
        />
      </Grid>
    </Grid>
  );
};

export default VideoContainer;
