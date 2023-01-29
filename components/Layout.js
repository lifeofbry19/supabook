import Nav from "./Nav";

export default function layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
