import { useEffect } from "react";
import Whiteboard from "./Whiteboard/Whiteboard";

import { connectWithSocketServer } from "./socketClient/socketClient";

const App = () => {
  useEffect(() => {
    // make connection to Socket.io Server
    connectWithSocketServer();
  }, []);

  return (
    <div>
      <Whiteboard />
    </div>
  );
};

export default App;
