const Button = ({ key, text, onClick, className }) => (
    <button key={key} onClick={onClick} className={`button ${className}`}> 
        {text}
    </button>
)

export default Button