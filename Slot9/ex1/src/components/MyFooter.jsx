import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Create by: {email}</p>
      <p>&copy; {new Date().getFullYear()} ThanhDatDora. All rights reserved</p>
      <Button variant="link" href="">My Link Github's project: {linkGithub}</Button>
    </footer>
  );
}
export default MyFooter;