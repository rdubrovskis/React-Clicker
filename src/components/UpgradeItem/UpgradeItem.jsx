import { useEffect } from "react";
import styles from "./UpgradeItem.module.css";

export function UpgradeItem({
  upgrade,
  handleUpgrade,
  handleIncome,
  isAffordable = false,
}) {
  const cycle = 5;
  let payload = upgrade.owned === 0 ? 1 : upgrade.owned * upgrade.value;
  let rate = upgrade.owned === 0 ? upgrade.value / cycle : payload / cycle;
  let interval = Math.round((upgrade.value / rate) * 1000);
  interval = interval > 120 ? interval : 100;

  let costFormat = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(upgrade.cost);

  useEffect(() => {
    const production =
      upgrade.owned > 0
        ? setInterval(() => {
            /*The idea here is that with more upgrades purchased the interval of the calls decreases, rather than
        the value they provide. I think the visual feedback is more satisfying this way,
        however, past a certain point the less noticeable and more of a resource hog it becomes. 
        The value calculations also become increasingly imprecise as frequency cannot go up indefinitely. 
        So past a certain point, I bottom out the interval at 100ms, after which the unit/sec rate 
        needs to be passed to the handleIncome function instead.
        Units/sec can continue to increase without having to increase the frequency of the calls*/
            interval === 100
              ? handleIncome(rate / 10)
              : handleIncome(upgrade.value);
            console.log("interval: ", interval);
          }, interval)
        : undefined;

    return () => clearInterval(production);
  }, [upgrade.owned, interval]);

  return (
    <li
      className={isAffordable ? styles.UpgradeActive : styles.UpgradeInactive}
      onClick={
        isAffordable
          ? () =>
              handleUpgrade(
                upgrade.id,
                upgrade.owned,
                upgrade.cost,
                upgrade.baseCost
              )
          : undefined
      }
    >
      <div className={styles.UpgradeButton}>
        <div className={styles.nameplate}>
          <h1>{upgrade.name}</h1>
          <p>{upgrade.description}</p>
        </div>
        <div className={styles.pricetag}>
          <span className={styles.currency}>β</span>
          <span>{costFormat}</span>
        </div>
      </div>
    </li>
  );
}
