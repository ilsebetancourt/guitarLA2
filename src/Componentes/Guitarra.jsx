import PropTypes from 'prop-types';

export default function Guitarra(props) {
    const { guitarra, addToCart } = props; 
    const { description, price, image } = guitarra;


    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} />
            </div>
            <div className="col-8">
                <h1 className="text-black fs-4 fw-bold text-uppercase">{guitarra.name}</h1>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitarra)} 
                >Agregar al Carrito</button>
            </div>
        </div>
    );
}

Guitarra.propTypes = {
    guitarra: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
    addToCart: PropTypes.func.isRequired, 
};
