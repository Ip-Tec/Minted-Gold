import { MdWarning } from "react-icons/md";

const Dashboard = () => {
    return (
        <>
            <h1
                style={{
                    width: "90%",
                    margin: "auth",
                    textAlign: "center",
                    display:"flex",
                    height:"60vh",
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <MdWarning style={{fontSize: "6rem", color: "yellow",}} /> This page is still under development
            </h1>
        </>
    );
};

export default Dashboard;
