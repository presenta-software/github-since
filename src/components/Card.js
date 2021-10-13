
const Card = ({ url }) => {
  return (
    <div className='wrapper'>
      <div className='card'>
        <div className='inner'>
          {url && <img alt='Github User Since Card' src={url + '?w=500'} />}
          {!url && <p>Empty</p>}
        </div>
      </div>
    </div>
  )
}

export default Card