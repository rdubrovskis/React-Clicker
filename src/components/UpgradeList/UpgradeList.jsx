import styles from "./UpgradeList.module.css";

export function UpgradeList(upgrades) {
  return (
    <div className={styles.UpgradeMenu}>
      <h3>Upgrades</h3>
      <br />
      <ul>{upgrades.children}</ul>
    </div>
  );
}
