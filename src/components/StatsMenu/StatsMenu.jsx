import styles from "./StatsMenu.module.css";

export function StatsMenu({ upgrades, handleSave, handleLoad, handleClear }) {
  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.clickerTitle}>ReactClicker</h2>
      <ul className={styles.upgradeInv}>
        {upgrades.map((upgrade) => (
          <li className={styles.upgRow}>
            <span>{upgrade.name}:</span>{" "}
            <span className={styles.upgCount}>x{upgrade.owned}</span>
          </li>
        ))}
        <li className={styles.saveBtns}>
          <button onClick={handleSave}>Save</button>{" "}
          <button onClick={handleLoad}>Load</button>
        </li>
        <li class={styles.saveDel}>
          <span onClick={handleClear}>Delete Save</span>
        </li>
      </ul>
    </div>
  );
}
