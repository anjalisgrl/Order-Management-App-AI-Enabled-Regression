import { createMuiTheme } from '@material-ui/core/styles';
import { ArrowLeft } from '@material-ui/icons';


export const pxToRem = px => `${px / 22.5}rem`;
export const pxToVw = px =>
  `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = px =>
  `${px / (document.documentElement.clientHeight * 0.01)}vh`;

export default createMuiTheme({
  palette: {
    primary: {
      main: '#58687e',
      light: 'rgb(93,175,240,0.5)',
      dark: 'rgb(93,175,240,0.2)'
    }
  },
  overrides:{

    MuiButton:{
      outlined:{
        padding:`${pxToRem(5)} ${ pxToRem(15)}`
      },
      root:{
        padding:`${pxToRem(6)} ${ pxToRem(16)}`,
        minWidth:pxToRem(64),
        borderRadius:pxToRem(4)

      },
      text:{
        padding:`${pxToRem(6)} ${ pxToRem(8)}`,
      },
      'iconSizeMedium:first-child':{
        fontSize:pxToRem(20),
      }

    },

    MuiOutlinedInput:{
      inputMarginDense:{
        paddingTop:pxToRem(10.5),
        paddingBottom:pxToRem(10.5),
      },
      input:{
        padding:`${pxToRem(18.5)} ${ pxToRem(14)}`
      }
    },

    MuiToolbar:{
      root:{
        padding:0,
      },
      gutters:{
        padding:0,
        paddingLeft:0,
        paddingRight:0,
        '@media (min-width: 600px)': {
          padding:0,
        paddingLeft:0,
        paddingRight:0,

        }
      },
      regular:{
        '@media (min-width: 600px)': {
          minHeight:pxToRem(64),

        }

      },

      },


      /* button.MuiButtonBase-root.MuiButton-root.MuiButton-text */
      MuiButtonBase:{
        root:{
          padding:`${pxToRem(0)} ${ pxToRem(0)}`
        }

      },

      MuiIconButton:{
        edgeStart:{
          marginLeft:0
        },
        root:{
          padding:0
        },

      },


      MuiTableCell:{
        padding:0,
        paddingCheckbox:{
          width:pxToRem(48),
          padding:`${pxToRem(0)} ${ pxToRem(0)} ${pxToRem(0)} ${ pxToRem(4)}`
        },
        root:{
          padding:pxToRem(15),

          caption:{
            padding:pxToRem(15),
            


          },
         
        },
        sizeSmall:{
          padding:`${pxToRem(6)} ${ pxToRem(24)} ${pxToRem(6)} ${ pxToRem(15)}`
        },
        head:{
          
        }
      }
      

    


  }
});
