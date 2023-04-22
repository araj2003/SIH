import { useGlobalContext } from "./context";
const Notice = () => {
  const { currentUser } = useGlobalContext();
  if (currentUser) {
    return (
      <div>
        <h2>You're logged in!</h2>
      </div>
    );
  }
  return null;
};

export default Notice;
