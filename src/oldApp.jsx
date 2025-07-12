// // import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// import "./App.css";
// import { Button } from "antd";
// import { Routes, Route, Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// // function App() {
// //   return (
// //     <div className="App">
// //       <h1>Welcome to React Router!</h1>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="about" element={<About />} />
// //       </Routes>
// //     </div>
// //   );
// // }

// const App = () => {
//   const [num, setNum] = useState(0);

//   let timer;
//   useEffect(() => {
//     // timer = setInterval(() => {
//     //   setNum((num) => num + 1);
//     // }, 400);
//     console.log("只运行一次吧");
//   }, []);

//   useEffect(() => {
//     if (num > 10) {
//       console.log("大于10了，清除定时器");
//       console.log("timer：", timer);
//       //  因为每一个timer都是独立render的，所以获取不到
//       clearTimeout(timer);
//     }
//   }, [num]);

//   return <div>这是一个函数式组件————num:{num}</div>;
// };

// function Home() {
//   return (
//     <>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>

//       <Link
//         to="/about"
//         style={{
//           width: "80px",
//           height: "80px",
//           display: "block",
//           backgroundColor: "white",
//         }}
//       >
//         About
//       </Link>
//     </>
//   );
// }

// function About() {
//   return (
//     <>
//       <main>
//         <h2>Who are we?</h2>
//         <p>That feels like an existential question, don't you think?</p>
//       </main>
//       <Button>
//         <Link to="/">Home</Link>
//       </Button>
//     </>
//   );
// }

// // function App() {
// //   const [count, setCount] = useState(0);

// //   const toMyPage = () => {};

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React666</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //       <Button type="primary" onClick={toMyPage}>
// //         到我页面
// //       </Button>
// //     </>
// //   );
// // }

// export default App;
