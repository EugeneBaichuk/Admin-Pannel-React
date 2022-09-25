import './App.css';
import CardList from './component/Card-list';

function App() {

  //создал локальный сервер
  //npm i json-server
  //json-server --watch db.json --port 3001

  return (
    <div 
    // onClick={onDeactivate} 
    className="App">
      <section className="cards">
        <h1 className="cards__header">Coffee Shop</h1>
        <div className="cards__list">
          <CardList/>
        </div>
      </section>
    </div>
  );
}

export default App;
