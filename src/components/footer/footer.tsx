import styles from "./footer.module.scss";

export function Footer() {
  return (
    <>
      <section className={styles.footer}>
        <div className={styles.texts}>
          <h3>Maze Manor</h3>
          <p>Come to Maze Manor and get out. Are you capable?</p>
        </div>
        <div className={styles.image}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/add-image-9a3cd.appspot.com/o/Logokeys.png?alt=media&token=08618e3f-fa81-47f7-9795-d123e733fb11"
            alt="Logo"
          />
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/carlosruizalcerreca/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "./images/icon-linkedin.svg"}
              alt="Linkedin profile"
            />
          </a>
          <a
            href="https://github.com/CaRuaLeS"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "./images/icon-github.svg"}
              alt="GitHub profile"
            />
          </a>
        </div>
      </section>
    </>
  );
}
