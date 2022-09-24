import { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import "../Card-item/card-item.css" 

export const AddCard = ({onBlur, defaultBlurVal, errorInputs, setBlurInputs, cards, setCards, changeIsDone, setAddCardChangeIsDone, addCard, setImg, setImgFormVal, imgFormVal, img, onShowCreateCardForm}) => {
    const defaultCardVal = {
      id: 100,
      name: "",
      img: "",
      active: false,
      animation: "",
      price: "",
      storeQuantity: "",
      descr: "",
    };

    const [cardVals, setCardVals] = useState({...defaultCardVal});
    const [activeBtn, setActiveBtn] = useState(false);

    const onImgAdd = () => {
      setImg(imgFormVal);
    }

    const onImgFormChange = (e) => {
      setCardVals(cardVals => ({...cardVals,
        img: e.target.value,
        id: cards.length + 1
      }));
      setImgFormVal(e.target.value);
      
    }

    const onSetNewCardVal = (key) => (e) => {
      setCardVals(cardVals => ({...cardVals,
        [key]: e.target.value,
        id: cards.length + 1
      }));
    }

    const onAddCard = () => {
      setAddCardChangeIsDone(true);
      setCards(cards => [...cards, cardVals]);
      setCardVals({...defaultCardVal});
      setBlurInputs({...defaultBlurVal});
      onShowCreateCardForm();
    }

    useEffect(() => {
      const {name, img: imgURL, price, storeQuantity, descr} = cardVals;
      const active = !!name && !!imgURL && !!price && !!descr && !!storeQuantity;
      setActiveBtn(active);
    }, [cardVals]);

    return (
      <>
        {!addCard && (<div className="cards__item">
          <Card sx={{ maxWidth: 345, minHeight: 498, display: "flex", alignItems: "center", justifyContent: "center"}}>
            {!changeIsDone ? <Button onClick={onShowCreateCardForm} size="small">Добавить карточку</Button> : <Button disabled size="small">Добавить карточку</Button>}
          </Card>
        </div>)}
        {!!addCard && (<div className="cards__item">
          <Card sx={{ maxWidth: 345, minHeight: 490, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding:"0 0 0.5rem", }}>
            <CardMedia 
              component="img"
              alt="img"
              height="180"
              image={img}
            />
            <TextField error={errorInputs.img.error} helperText={errorInputs.img.text} onBlur={onBlur('img')} value={imgFormVal} id="standard-basic" onChange={onImgFormChange} label="Cсылка на изображение" variant="standard"/>
            {!changeIsDone ? <Button onClick={onImgAdd} size="small">показать</Button>: <Button disabled size="small">показать</Button>}
            <TextField onBlur={onBlur('name')} onChange={onSetNewCardVal('name')} value={cardVals.name} error={errorInputs.name.error} helperText={errorInputs.name.text} id="standard-basic" label="Название" variant="standard" />
            <TextField onBlur={onBlur('descr')} onChange={onSetNewCardVal('descr')} value={cardVals.descr} error={errorInputs.descr.error} helperText={errorInputs.descr.text} id="standard-basic" label="Текст" variant="standard" />          
            <TextField onBlur={onBlur('price')} onChange={onSetNewCardVal('price')} value={cardVals.price} error={errorInputs.price.error} helperText={errorInputs.price.text} id="standard-basic" label="Цена" variant="standard" type={"number"}/>
            <TextField onBlur={onBlur('storeQuantity')} onChange={onSetNewCardVal('storeQuantity')} error={errorInputs.storeQuantity.error} helperText={errorInputs.storeQuantity.text} value={cardVals.storeQuantity} id="standard-basic" label="На складе" variant="standard" type={"number"}/>
            <div>
              {(!!activeBtn && !changeIsDone) ? <Button onClick={onAddCard} size="small">Добавить</Button> : <Button disabled>Добавить</Button>}
              {!changeIsDone ? <Button onClick={onShowCreateCardForm} size="small">Отмена</Button> : <Button disabled size="small">Отмена</Button>}
            </div>

          </Card>

        </div>)}
      </>
    );
}
