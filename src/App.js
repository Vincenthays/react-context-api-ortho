import React, { useContext } from 'react';
import DATA from './config'
import './App.css';
import { ACTIONS } from './reducers/mainReducer'
import { MainContext, MainProvider } from './contexts/mainContext'
import { CSSTransition } from 'react-transition-group'


export default function App() {
  return (
    <MainProvider>
      <Home />
    </MainProvider>
  );
}

function Home() {
  return (
    <div className="App">
      <div className="App-options">
        {DATA.map((age, index) => (
          <Age key={index} age={{ id: index, ...age }}>
            {age.therapies.map((therapy, index) =>
              <Therapy key={index} therapy={{ id: index, ...therapy }} />
            )}
          </Age>
        ))}
      </div>
      <Video />
    </div >
  )
}

function Age({ age, children }) {
  const [state, dispatch] = useContext(MainContext)
  return (
    <CSSTransition
      in={state.ageId === age.id}
      timeout={500}
      classNames="Age"
    >
      <div className="Age"
        onClick={() => dispatch({ 'type': ACTIONS.CHANGE_AGE_SELECTED, ageId: age.id })}>
        <div className="Age-bg-img" style={{ backgroundImage: 'url(' + age.image + ')' }} />
        <div className="Age-bg-filter" />
        <div className="Age-title"
          style={state.ageId !== age.id ? { transform: 'rotate(90deg)' } : {}}
        >
          {age.name}
        </div>
        <div className="Age-theray-list">
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}

function Therapy({ therapy }) {
  const [state, dispatch] = useContext(MainContext)
  return (
    <div className="Therapy"
      onClick={() => dispatch({ type: ACTIONS.OPEN_VIDEO, video: therapy.video })}>
      <div className="Therapy-title">{therapy.name}</div>
    </div>
  )
}

function Video() {
  const [state, dispatch] = useContext(MainContext)
  const exit = () => dispatch({ type: ACTIONS.OPEN_VIDEO, video: null })
  return (
    <CSSTransition
      in={state.video !== null}
      timeout={500}
      classNames="Video"
    >
      <div
        className="Video"
        onClick={exit}
      >
        <div className="Video-button-exit" onClick={exit}>+</div>
        <iframe
          className="Video"
          src={`https://www.youtube-nocookie.com/embed/${state.video}`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </CSSTransition>
  )
}
