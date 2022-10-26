import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicationContext } from "../../context/PublicationContext";
import { createPublication } from "../../services/publicationService";


const Create = () => {
    const navigate = useNavigate();
    const { addPublication } = useContext(PublicationContext);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        fishType: '',
        weight: '',
        place: '',
        catchingMethod: '',
        imageUrl: '',
    });
    const user = JSON.parse(localStorage.getItem('user'))

    const onSubmit = (e) => {
        e.preventDefault();
        const publicationData = values;
        
        createPublication(publicationData)
            .then(result => {
                result.owner = user.userWithoutPass;
                addPublication(result);
                navigate('/publications')
            }).catch((err) => {
                navigate('*');
            })

    }

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound,
        }));
    }

    const isPositive = (e) => {
        let number = Number(e.target.value);     
        setErrors(state => ({
            ...state,
            [e.target.name]: number <= 0,
        }));
    }

    const isFormValid = !Object.values(errors).some(x => x)


    return (
        <div
            className="form-signin w-100 m-auto text-center"
    
        >
            <form onSubmit={onSubmit}>
                <img
                    className=" mb-4"
                    src="assets/images/logoNew.png"
                    alt="logo"
                    width={72}
                    height={57}
                />
                <h1 className="h3 mb-3 fw-normal">Create Publication</h1>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="fishType"
                        value={values.fishType}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Fish Kind</label>
                </div>
                <div className="form-floating">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="weight"
                        value={values.weight}
                        onChange={changeHandler}
                        onBlur={isPositive}
                        
                    />
                    <label htmlFor="floatingInput">Weight</label>
                    {errors.weight &&
                        <p className='validation-text'>Weight should be a positive number.</p>
                    }
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="place"
                        value={values.place}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 2)}
                    />
                    <label htmlFor="floatingInput">Place</label>
                    {errors.place &&
                        <p className='validation-text'>Place should be more that 2 characters.</p>
                    }
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Image URL</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="catchingMethod"
                        value={values.catchingMethod}
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                    />
                    <label htmlFor="floatingInput">Catching Method</label>
                    {errors.catchingMethod &&
                        <p className='validation-text'>Catching Method should be more that 3 characters.</p>
                    }
                </div>
                <button
                    className="w-100 btn btn-lg btn-primary"
                    id="create-button"
                    type="submit"
                    disabled={!isFormValid}
                >
                    Create
                </button>
            </form>
        </div>

    );
}

export default Create;