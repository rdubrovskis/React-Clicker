import logo from "./logo.svg"
import "./App.css";
import { UPGRADES } from "./data/Upgrades";
import { useState } from "react";
import { UpgradeList } from "./components/UpgradeList/UpgradeList";
import { Counter } from "./components/Counter/Counter";
import { UpgradeItem } from "./components/UpgradeItem/UpgradeItem";
import { StatsMenu } from "./components/StatsMenu/StatsMenu";
import {createContext} from "react";

function App() {
  const [upgrades, setUpgrades] = useState(UPGRADES);
  let [count, setCount] = useState(0);

  function abbreviateInt(int){
    if(int > 9999999){
      return Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 2,
            useGrouping: 'always'
        }).format(Math.floor(int))
    }
    else{
      return Intl.NumberFormat('en-US',{
        useGrouping: 'always'
      }).format(Math.floor(int));
    }
    }

  function handleClick(){
    setCount(prevCount => prevCount + 1)
  }

  function handleIncome(income){
    setCount(prevCount => prevCount + income)
  }

  function handleUpgrade(id, owned, cost, baseCost){
      console.log("clicked doUpgrade")

      owned += 1
      setCount(count-=cost)
      cost = cost + baseCost

      setUpgrades(prevUpgrades => prevUpgrades.map(upgrade => upgrade.id === id ? 
        {...upgrade,owned, cost} : upgrade))
      console.log(upgrades.find(u => u.id === id))
  }

  function handleSave() {
    const saveJSON = JSON.stringify({
      upgrades : {...upgrades},
      count : count
    })
    //console.log(saveJSON);
    //document.cookie = `clickerSave=${encodeURIComponent(saveJSON)};path=/;secure=true`
    localStorage.setItem('saveGame', JSON.stringify({
      upgrades : upgrades,
      count : count
    }))
    console.log(localStorage.getItem('saveGame'))
    alert("Game Saved")
  }

  function handleLoad(){
    const saveGame = JSON.parse(localStorage.getItem('saveGame'))
    //setUpgrades(Object.values(saveGame.upgrades))
    //setCount(saveGame.count)
    if(localStorage.getItem('saveGame') !== null){
      setUpgrades(Object.values(saveGame.upgrades))
      setCount(saveGame.count)
      alert("Save data loaded")
    }
    else{
      alert("No save data found")
    }
  }

  function handleClear(){
    let uResponse = window.confirm("Are you sure you want to delete all save data?");
    uResponse && localStorage.clear()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>REACT CLICKER!!!!</h2>
      </header>
      <div className="UIContainer">
        <StatsMenu upgrades={upgrades} handleSave={handleSave} handleLoad={handleLoad} handleClear={handleClear}></StatsMenu>
        <div className="ClickMenu">
            <Counter count={abbreviateInt(count)} onClick={handleClick} logo={logo}/>
        </div>

        <UpgradeList>
          {upgrades.map(upgrade => (
                    <UpgradeItem
                      key = {upgrade.id} 
                      upgrade={upgrade}
                      handleUpgrade={handleUpgrade}
                      handleIncome={handleIncome}
                      isAffordable={count>=upgrade.cost ? true : false}
                    />
                    ))}
        </UpgradeList>
      </div>
    </div>
  );
}

export default App;
