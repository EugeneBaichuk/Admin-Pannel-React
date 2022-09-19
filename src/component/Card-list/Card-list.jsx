import { useEffect, useState } from "react";
import ShopCard from "../Card-item";
import AddCard from "../Add-card";
import CardDescr from '../Card-description';
import EditForm from "../Edit-form";

import "./card-descr.css"

export const CardList = ({descr, setDescr}) => {

    const defaultEditForm = {
        id: 100,
        name: "",
        img: "",
        active: false,
        animation: "",
        price: null,
        storeQuantity: null,
        descr: "",
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
    const [idCounter, setIdCounter] = useState(1000);
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
    
    const hideActiveCard = cards.map(item => ({...item, active: false}));

    //функция для выделения активной карты
    const onMakeActive = (id) => (e) => {
        const changedCards = cards.map(item => (item.id === id ? {...item, active: !item.active} : {...item, active: false})); 
        setCards(prevState => (!changeIsDone && !addCardChangeIsDone) ? changedCards: prevState)  
        setEditForm(prevState => !changeIsDone ? false : prevState);
    }

    const onShowCreateCardForm = () => {
        setAddCard(prevState => !prevState);
        setImg('https://i.pinimg.com/736x/99/c7/f8/99c7f8a1584e2d98434eaa9fdc8a7a84.jpg');
        setImgFormVal("");
        setAddCardChangeIsDone(prevState => !prevState);
    }

    const deleteCard = (id) => (e) => {
        e.stopPropagation();
        const confirmed = window.confirm("Вы действительно хотите удалить карту?");
        const filteredState = hideActiveCard.filter(item => (item.id !== id));
        setCards(prevState => confirmed ? filteredState: prevState);
    }

    const onShowEditForm = (id) => (e) => {
        e.stopPropagation();
        const activeCard = cards.map(item => (item.id === id ? {...item, active: true}: {...item, active: false})); 
        setCards(activeCard)
        setEditForm(true);
    }

    const onCloseEditForm = (_e) => {
        setCards(hideActiveCard)
        setEditForm(false);
        setChangeIsDone(false);
    }

    const onEditActveItem = (e) => {
        const editedCardList = cards.map(item => (item.active ? {...cardVals, id: idCounter}: item));
        const editedHiddenCardList = editedCardList.map(item => ({...item, active: false}));
        setCards(editedHiddenCardList);
        setEditForm(false);
        setChangeIsDone(false);
        setIdCounter(count => count + 1);
    }

    useEffect(() => {
        const activeCard = cards.filter(item => item.active);
        setActiveCardObj(activeCard[0]);
    }, [cards]);
    useEffect(() => {
        setCards(prevState => addCardChangeIsDone ? hideActiveCard: prevState);
    }, [addCardChangeIsDone, hideActiveCard]);

    return (
        !!cards[0].name && (
            <>
                {cards.map(item => {
                    return <ShopCard addCardChangeIsDone={addCardChangeIsDone} changeIsDone={changeIsDone} key={item.id} deleteCard={deleteCard} onMakeActive={onMakeActive} onShowEditForm={onShowEditForm} {...item} />
                })}
                <AddCard onShowCreateCardForm={onShowCreateCardForm} addCard={addCard} setAddCard={setAddCard} setImg={setImg} setImgFormVal={setImgFormVal} imgFormVal={imgFormVal} img={img} addCardChangeIsDone={addCardChangeIsDone} changeIsDone={changeIsDone} cards={cards} setCards={setCards} setAddCardChangeIsDone={setAddCardChangeIsDone}/>
                <CardDescr descr={descr} editForm={editForm} {...activeCardObj}/>
                <EditForm setChangeIsDone={setChangeIsDone} onEditActveItem={onEditActveItem} cardVals={cardVals} setCardVals={setCardVals} cards={cards} setCards={setCards} editForm={editForm} onCloseEditForm={onCloseEditForm} {...activeCardObj}/>
            </>
        )
    )
}