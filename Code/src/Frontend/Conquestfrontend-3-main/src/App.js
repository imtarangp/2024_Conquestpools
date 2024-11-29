import { useRef } from "react";
import Router from "./routers";
// import { BrowserRouter } from "react-router-dom";
import { IdleTimerProvider, useIdleTimerContext } from "react-idle-timer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { authLogoutAsync } from "./store/actions/auth";

function App() {
  const dispatch = useDispatch();
  const idleTimerRef = useRef(null);
  const onIdle = () => {
    dispatch(authLogoutAsync());
  };
  const onPrompt = () => {
    // Fire a Modal Prompt
  };

  // const onIdle = () => {
  //   // Close Modal Prompt
  //   // Do some idle action like log out your user
  // }

  const onActive = (event) => {
    // Close Modal Prompt
    // Do some active action
  };

  const onAction = (event) => {
    // Do something when a user triggers a watched event
  };

  return (
    // <BrowserRouter>
    <>
      <IdleTimerProvider
        // ref={idleTimerRef}
        // timeout={5 * 1000}
        // onIdle={onIdle}
        timeout={1000 * 60 * 30}
        onPrompt={onPrompt}
        onIdle={onIdle}
        onActive={onActive}
        onAction={onAction}
      >
        <DndProvider backend={HTML5Backend}>
          <Router />
        </DndProvider>
      </IdleTimerProvider>
    </>
    // </BrowserRouter>
  );
}

export default App;
