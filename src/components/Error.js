
const Error = ({ message }) => {
  return (
    <div className='wrapper'>
      <p className='err'>There's an error: 😢<br /><strong>{message}</strong></p>
    </div>
  )
}

export default Error
