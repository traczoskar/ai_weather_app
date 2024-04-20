import { ReactComponent as Logo } from "../../assets/icons/icon.svg";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex justify-center items-center bg-black/10 backdrop-blur-md p-6 max-w-4xl rounded-3xl">
      <Logo />
      <h1 className="text-4xl font-bold font-['Raleway'] ">{title}</h1>
    </header>
  );
};

export default Header;
