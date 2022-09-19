import './App.css';
import CardList from './component/Card-list';
import {useState} from 'react';

function App() {

const [descr, setDescr] = useState(false);
  //создал локальный сервер
  //npm i json-server
  //json-server --watch db.json --port 3001


  //для переиспользования
  // const deactivateCard = () => {
  //   const activeCard = cards.map(item => ({...item, active: false}));
  //     setCards(prevState => activeCard)
  //     const showDescr = activeCard.some(item => item.active);
  //     setDescr(showDescr);
  // }
  //деактивируем карту по клику на свободную зону
  // const onDeactivate = (e) => {
  //   if (e.target.className === "cards__list" || e.target.className === "cards__header" || e.target.className === "cards"){
  //     deactivateCard();
  //   }
  // }

  return (
    <div 
    // onClick={onDeactivate} 
    className="App">
      <section className="cards">
        <h1 className="cards__header">Coffee Shop</h1>
        <div className="cards__list">
          <CardList descr={descr} setDescr={setDescr}/>
        </div>
      </section>
    </div>
  );
}

export default App;
