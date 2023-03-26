type HeaderProps = { children: JSX.Element };

export function Header({ children }: HeaderProps) {
  return (
    <header>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/add-image-9a3cd.appspot.com/o/Logokeys.png?alt=media&token=08618e3f-fa81-47f7-9795-d123e733fb11"
        alt=""
      />
      <h1 className="header__title">Maze Manor</h1>
      {children}
    </header>
  );
}
