import { useState, useEffect } from "react";

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const EditForm = ({cards, editForm, onCloseEditForm, descr, img, name, price, storeQuantity, cardVals, setCardVals, onEditActveItem, setChangeIsDone}) => {

  const drawerShown = editForm ? "drawer active": "drawer";

    const defaultBlurVal = {
      name: false,
      img: false,
      price: false,
      storeQuantity: false,
      descr: false,
    }

    const [formImg, setFormImg] = useState("");
    const [imgFormVal, setImgFormVal] = useState("");
    const [blurInputs, setBlurInputs] = useState({...defaultBlurVal});
    const [activeBtn, setActiveBtn] = useState(false);

    const [errorInputs, setErrorInputs] = useState({
      name: {error: false, text: ""},
      img: {error: false, text: ""},
      price: {error: false, text: ""},
      storeQuantity: {error: false, text: ""},
      descr: {error: false, text: ""}
    });

    useEffect(() => {
      setCardVals({
        id: 100,
        name,
        img,
        active: true,
        animation: "",
        price,
        storeQuantity,
        descr,
      })
    
    }, [name, img, price, storeQuantity, descr]);



    const onImgAdd = () => {
      setFormImg(imgFormVal);
    }

    const onImgFormChange = (e) => {
      setCardVals(cardVals => ({...cardVals,
        img: e.target.value,
        id: cards.length + 1
      }));
      setImgFormVal(e.target.value);
      setChangeIsDone(true);
    }

    const onSetNewCardVal = (key) => (e) => {
      setCardVals(cardVals => ({...cardVals,
        [key]: e.target.value,
        id: cards.length + 1
      }));
      setChangeIsDone(true);
    }

    const onBlur = (key) => (e) => {
      setBlurInputs(inputs => ({...inputs, [key]: true}));
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

    return !!editForm && (<div className={drawerShown}>
        <div className="cards__item">
            <CardMedia 
              component="img"
              alt="img"
              height="180"
              image={cardVals.img}
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
        </div>
      </div>);
}