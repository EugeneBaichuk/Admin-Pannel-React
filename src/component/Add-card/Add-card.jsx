import { useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import "../Card-item/card-item.css" 

export const AddCard = ({cards, setCards, changeIsDone, setAddCardChangeIsDone, addCard, setAddCard, setImg, setImgFormVal, imgFormVal, img}) => {
    const defaultCardVal = {
      id: 10000,
      name: "",
      img: "",
      active: false,
      animation: "",
      price: "",
      storeQuantity: "",
      descr: "",
    };

    const defaultBlurVal = {
      name: false,
      img: false,
      price: false,
      storeQuantity: false,
      descr: false,
    }


    const [cardVals, setCardVals] = useState({...defaultCardVal});
    const [blurInputs, setBlurInputs] = useState({...defaultBlurVal});
    const [activeBtn, setActiveBtn] = useState(false);

    const [errorInputs, setErrorInputs] = useState({
      name: {error: false, text: ""},
      img: {error: false, text: ""},
      price: {error: false, text: ""},
      storeQuantity: {error: false, text: ""},
      descr: {error: false, text: ""}
    });

    // const onShowCreateCardForm = () => {
    //   setAddCardChangeIsDone(prevState => !prevState);
    //   setAddCard(prevState => !prevState);
    //   setImg('https://i.pinimg.com/736x/99/c7/f8/99c7f8a1584e2d98434eaa9fdc8a7a84.jpg');
    //   setImgFormVal("");
    // }

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
        id: cards.length + 100
      }));
    }

    const onBlur = (key) => (e) => {
      setBlurInputs(inputs => ({...inputs, [key]: true}));
    }

    const onAddCard = () => {
      setAddCardChangeIsDone(false);
      setCards(cards => [...cards, cardVals]);
      setCardVals({...defaultCardVal});
      setBlurInputs({...defaultBlurVal});
      setAddCardChangeIsDone(prevState => !prevState);
      onShowCreateCardForm();
    }

    const onShowCreateCardForm = () => {
      setAddCard(prevState => !prevState);
      setImg('https://i.pinimg.com/736x/99/c7/f8/99c7f8a1584e2d98434eaa9fdc8a7a84.jpg');
      setImgFormVal("");
      setAddCardChangeIsDone(prevState => !prevState);
      setBlurInputs({...defaultBlurVal});
  }

    useEffect(() => {
      const {name, img: imgURL, price, storeQuantity, descr} = cardVals;
      const active = !!name && !!imgURL && !!price && !!descr && !!storeQuantity;
      setActiveBtn(active);
    }, [cardVals]);

    useEffect(() => {
      const keys = Object.keys(errorInputs);
      const onError = (key) => {
        const err = (blurInputs[key] && !cardVals[key]) ? {error: true, text: "Введите значение"}: {error: false, text: ""};
        setErrorInputs(inputs => ({...inputs, [key]: err}));
      }

      keys.forEach(key => {
        onError(key);
      });
    }, [blurInputs, cardVals]);

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
