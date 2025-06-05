import type { RootState } from './../view model/store';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

function MainList() {
    const items = useSelector((state: RootState) => state.mainList.items);

    return (
        <div className="mainList">
            <ul>
                {items.slice(0, 3).map((item, index) => (
                    <li key={index}>
                        <NavLink to={`/detail?article=${index}`} end>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainList;