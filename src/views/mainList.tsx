import type { RootState } from './../view model/store';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router";

function MainList() {
    const items = useSelector((state: RootState) => state.mainList.items)

    return (
        <div className="mainList">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <NavLink to="/detail" end>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainList;