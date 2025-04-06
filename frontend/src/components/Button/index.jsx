const Button = ({ text, onClick, className }) => (
    <button onClick={onClick} className={`button ${className}`}> 
        {text}
    </button>
)

export default Button