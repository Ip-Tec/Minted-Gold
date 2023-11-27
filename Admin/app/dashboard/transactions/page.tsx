import { MdWarning } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <h1 className="w-90% mx-auto my-auth text-center flex h-60vh justify-center items-center">
        <MdWarning className="text-yellow-500 text-6xl" /> This page is still under development
      </h1>
    </>
  );
};

export default Dashboard;
