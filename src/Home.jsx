import React from 'react'
import './components/Header.css'
import './components/banner.css'
import './components/MovieList.css'
import MovieList from './jsxComponents/MovieList.jsx'
import Banner from './jsxComponents/Banner.jsx'
import { Link } from "react-router-dom";

//import { results } from './movies'

function Home() {
  const [pageNo, setpageNumber] = React.useState(1);
  function descPageNum() {
    if (pageNo == 1) {
      return;
    }
    setpageNumber(function (pageNo) {
      return pageNo - 1;
    });
  }
  function incPageNumber() {
    setpageNumber(function (pageNo) {
      return pageNo + 1;
    });
  }
  return (
    <div>
      <Header />
      <Banner />
      <MovieList pageNo={pageNo} />
      <div className="pagination">
        <button className="pagination_btn" onClick={descPageNum}>Previous</button>
        <div className="page_no">{pageNo}</div>
        <button className="pagination_btn" onClick={incPageNumber}>Next</button>
      </div>
    </div>
  )
}





function Header() {
  return (
    <header className='flex'>
      <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png"></img>
      <Link to="/home"><h2>Movies</h2></Link>
      <Link to="/Favourites"><h2>Favourites</h2></Link>
    </header>
  )
}


export { Home, Header }; 