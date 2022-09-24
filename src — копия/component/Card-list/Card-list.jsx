import { useEffect, useState } from "react";
import ShopCard from "../Card-item";
import AddCard from "../Add-card";
import EditForm from "../Edit-form";

import "./card-descr.css"

export const CardList = () => {

    const defaultEditForm = {
        id: 100,
        name: "",
        img: "",
        active: false,
        price: null,
        storeQuantity: null,
        descr: "",
    }

    const defaultBlurVal = {
        name: false,
        img: false,
        price: false,
        storeQuantity: false,
        descr: false,
    }

    useEffect(() => {
        fetch("http://localhost:3001/data")
        .then(res => res.json())
        .then(data => {
            setCards(data);
        });
    }, []);

    const [addCard, setAddCard] = useState(false);
    const [img, setImg] = useState('https://i.pinimg.com/736x/99/c7/f8/99c7f8a1584e2d98434eaa9fdc8a7a84.jpg');
    const [imgFormVal, setImgFormVal] = useState("");
    const [activeCardObj, setActiveCardObj] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [cardVals, setCardVals] = useState(defaultEditForm);
    const [changeIsDone, setChangeIsDone] = useState(false);
    const [addCardChangeIsDone, setAddCardChangeIsDone] = useState(false);
    const [blurInputs, setBlurInputs] = useState({...defaultBlurVal});
    const [cards, setCards] = useState([{
        id: 0,
        name: "",
        img: "",
        active: false,
        animation: "",
        price: 0,
        storeQuantity: 0,
        descr: ""
    }]);
    const [errorInputs, setErrorInputs] = useState({
        name: {error: false, text: ""},
        img: {error: false, text: ""},
        price: {error: false, text: ""},
        storeQuantity: {error: false, text: ""},
        descr: {error: false, text: ""}
    });
    
    const hideActiveCard = cards.map(item => ({...item, active: false}));
    //функция для выделения активной карты
    const onMakeActive = (id) => (e) => {
        const changedCards = cards.map(item => {
            if (item.id===id) {

                return {...item, active: !item.active} 
            } else {
                return {...item, active: false}
            }
        }); 
        setCards(prevState => (!changeIsDone && !addCardChangeIsDone) ? changedCards: prevState)  
        setEditForm(prevState => !changeIsDone ? false : prevState);
        
    }
    //показываем форму создания новой карточки
    const onShowCreateCardForm = () => {
        setAddCard(prevState => !prevState);
        setImg('https://i.pinimg.com/736x/99/c7/f8/99c7f8a1584e2d98434eaa9fdc8a7a84.jpg');
        setImgFormVal("");
        setAddCardChangeIsDone(prevState => !prevState);
    }
    //удаляем карточку
    const onDeleteCard = (id) => (e) => {
        e.stopPropagation();
        const confirmed = window.confirm("Вы действительно хотите удалить карту?");
        const filteredState = hideActiveCard.filter(item => (item.id !== id));
        setCards(prevState => confirmed ? filteredState: prevState);
    }
    //показ формы редактирования
    const onShowEditForm = (id) => (e) => {
        e.stopPropagation();
        const activeCard = cards.map(item => (item.id === id ? {...item, active: true}: {...item, active: false})); 
        setCards(activeCard)
        setEditForm(true);
    }
    //скрывем форму редактирования
    const onCloseEditForm = (_e) => {
        setCards(hideActiveCard)
        setEditForm(false);
        setChangeIsDone(false);
    }
    //добавляем отредактированную карту
    const onEditActveItem = (_e) => {
        const editedCardList = cards.map(item => (item.active ? {...cardVals}: item));
        const editedHiddenCardList = editedCardList.map(item => ({...item, active: false}));
        setCards(editedHiddenCardList);
        setEditForm(false);
        setChangeIsDone(false);
    }
    //получаем объект текущей активной карты
    
    useEffect(() => {
        const activeCard = cards.filter(item => item.active);
        setActiveCardObj(activeCard[0]);
        
    }, [cards]);
    //снимаем активность карты при внесении изменений в поле ввода при добавлении карты
    useEffect(() => {
        setCards(prevState => addCardChangeIsDone ? hideActiveCard: prevState);
    }, [addCardChangeIsDone, hideActiveCard]);
    //валидируем поля ввода
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
    // отслеживаем клик на инпут
    const onBlur = (key) => (_e) => {
        setBlurInputs(inputs => ({...inputs, [key]: true}));
    }

    return (
        !!cards[0].name && (
            <>
                {cards.map(item => <ShopCard 
                addCardChangeIsDone={addCardChangeIsDone} 
                changeIsDone={changeIsDone} 
                key={item.id} 
                onDeleteCard={onDeleteCard} 
                onMakeActive={onMakeActive} 
                onShowEditForm={onShowEditForm} 
                {...item} 
                />)}
                <AddCard 
                onBlur={onBlur} 
                setBlurInputs={setBlurInputs}
                errorInputs={errorInputs}
                defaultBlurVal={defaultBlurVal}
                onShowCreateCardForm={onShowCreateCardForm}
                addCard={addCard}
                setImg={setImg}
                setImgFormVal={setImgFormVal}
                imgFormVal={imgFormVal}
                img={img}
                addCardChangeIsDone={addCardChangeIsDone}
                changeIsDone={changeIsDone}
                cards={cards}
                setCards={setCards}
                setAddCardChangeIsDone={setAddCardChangeIsDone}
                />
                <EditForm
                onBlur={onBlur}
                setBlurInputs={setBlurInputs}
                errorInputs={errorInputs}
                setChangeIsDone={setChangeIsDone}
                onEditActveItem={onEditActveItem}
                cardVals={cardVals}
                setCardVals={setCardVals}
                cards={cards}
                setCards={setCards}
                editForm={editForm}
                onCloseEditForm={onCloseEditForm}
                {...activeCardObj}
                />
            </>
        )
    )
}