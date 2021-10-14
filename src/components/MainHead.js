
const MainHead = () => {
  return (
    <div className='mainHead'>
      <div className='left'>
        <h1>
          <span className='alt'>I'm a </span>
          <span className='main'>GitHub </span>
          <span className='alt'>user</span>
          <span className='main'> Since </span>
          <span className='alt'>···</span>
        </h1>
      </div>

      <div className='right'>
        <img alt='example' src={window.MOCK_URL + '?w=600'} />
      </div>
    </div>
  )
}

export default MainHead
