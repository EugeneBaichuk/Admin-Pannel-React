import { useState, useEffect } from "react";

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const EditForm = ({onBlur, errorInputs, editForm, onCloseEditForm, descr, img, name, price, storeQuantity, cardVals, setCardVals, onEditActveItem, setChangeIsDone, id}) => {

  const drawerShown = descr ? "drawer active": "drawer";

  const [formImg, setFormImg] = useState("");
  const [imgFormVal, setImgFormVal] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [idCounter, setIdCounter] = useState(1000);
  //
  useEffect(() => {
    setFormImg(img);
    setCardVals({
      id,
      name,
      img,
      active: true,
      price,
      storeQuantity,
      descr,
    })
  }, [id, name, img, price, storeQuantity, descr, setCardVals]);

  const onImgAdd = () => {
    setFormImg(imgFormVal);
  }

  const onImgFormChange = (e) => {
    setCardVals(cardVals => ({...cardVals, img: e.target.value}));
    setImgFormVal(e.target.value);
    setChangeIsDone(true);
  }

  const onSetNewCardVal = (key) => (e) => {
    setCardVals(cardVals => ({...cardVals,
      [key]: e.target.value,
      id: idCounter
    }));
    setChangeIsDone(true);
    setIdCounter(counter => counter + 1);
  }

  useEffect(() => {
    const {name, img: imgURL, price, storeQuantity, descr} = cardVals;
    const active = !!name && !!imgURL && !!price && !!descr && !!storeQuantity;
    setActiveBtn(active);
  }, [cardVals]);

  return <div className={drawerShown}>
      {img && !editForm && (
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
    {!!editForm && (<div className="cards__item">
        <CardMedia 
          component="img"
          alt="img"
          height="180"
          image={formImg}
        />
        <TextField error={errorInputs.img.error} helperText={errorInputs.img.text} onBlur={onBlur('img')} value={cardVals.img} id="standard-basic" onChange={onImgFormChange} label="Cсылка на изображение" variant="standard"/>
        <div>
          <Button onClick={onImgAdd} size="small">показать</Button>
        </div>
        <TextField onBlur={onBlur('name')} onChange={onSetNewCardVal('name')} value={cardVals.name} error={errorInputs.name.error} helperText={errorInputs.name.text} id="standard-basic" label="Название" variant="standard" />
        <TextField onBlur={onBlur('descr')} onChange={onSetNewCardVal('descr')} value={cardVals.descr} error={errorInputs.descr.error} helperText={errorInputs.descr.text} id="standard-basic" label="Текст" variant="standard" />          
        <TextField onBlur={onBlur('price')} onChange={onSetNewCardVal('price')} value={cardVals.price} error={errorInputs.price.error} helperText={errorInputs.price.text} id="standard-basic" label="Цена" variant="standard" type={"number"}/>
        <TextField onBlur={onBlur('storeQuantity')} onChange={onSetNewCardVal('storeQuantity')} error={errorInputs.storeQuantity.error} helperText={errorInputs.storeQuantity.text} value={cardVals.storeQuantity} id="standard-basic" label="На складе" variant="standard" type={"number"}/>
        <div>
          {!!activeBtn ? <Button onClick={onEditActveItem} size="small">Сохранить</Button> : <Button disabled>Сохранить</Button>}
          <Button onClick={onCloseEditForm} size="small">Отмена</Button>
        </div>
    </div>)}
  </div>;
}