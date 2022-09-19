import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardDescr = ({descr, img, name, price, storeQuantity, editForm}) => {
  const drawerShown = descr ? "drawer active": "drawer";
  return (
    !editForm && (<div className={drawerShown}>
      {img && (
        <>
          <CardMedia
            component="img"
            alt="img"
            height="180"
            image={img}
          />
          <CardContent>
            <Typography style={{minHeight: 60}} gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography style={{minHeight: 80, textAlign: "left"}} variant="body2" color="text.secondary">
              {descr}
            </Typography>
            <p style={{textAlign: "left"}}>Цена: {price} руб.</p>
            <p style={{textAlign: "left"}}>На складе: {storeQuantity} шт.</p>
          </CardContent>
          <CardActions className='cards__group'>
            <Button size="small">Share</Button>
          </CardActions>
        </>
      )}
    </div>)
  )
}  