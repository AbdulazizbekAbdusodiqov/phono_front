import styles from "./Spinner.module.scss"

const Spinner = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Spinner
