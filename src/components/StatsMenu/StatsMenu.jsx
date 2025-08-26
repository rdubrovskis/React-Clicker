import styles from "./StatsMenu.module.css";

export function StatsMenu({ upgrades, handleSave, handleLoad, handleClear }) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.clickerTitle}>
        <span className={styles.bit}>Bit</span>
        <span className={styles.miner}>MINER</span>
        <hr></hr>
      </div>
      <ul className={styles.upgradeInv}>
        {upgrades.map((upgrade) => (
          <li className={styles.upgRow}>
            <span>{upgrade.name}:</span>{" "}
            <span className={styles.upgCount}>x{upgrade.owned}</span>
          </li>
        ))}
        <li className={styles.saveBtns}>
          <div className={styles.saveBtn} onClick={handleSave}>
            Save
          </div>{" "}
          <div className={styles.saveBtn} onClick={handleLoad}>
            Load
          </div>
        </li>
        <li class={styles.saveDel}>
          <span onClick={handleClear}>Delete Save</span>
        </li>
      </ul>
    </div>
  );
}
