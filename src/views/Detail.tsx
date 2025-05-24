import { NavLink } from "react-router";

function Detail() {
    return (
        <div>
            <NavLink to="/" end>
                <button>Back</button>
            </NavLink>

            <h1>Detail View</h1>
            <p>This is the detail page.</p>
        </div>
    );
};

export default Detail;