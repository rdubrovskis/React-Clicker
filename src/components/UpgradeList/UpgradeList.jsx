import styles from "./UpgradeList.module.css";

export function UpgradeList(upgrades) {



  return (
    <div className={styles.UpgradeMenu}>
      <h3>Upgrades</h3>
      <hr className={styles.lineGold}/>
      <hr />
      <hr className={styles.linePink}/>
      <hr className={styles.lineLight}/>
      <br />
      <ul>
        {upgrades.children}
      </ul>
    </div>
  );
}
