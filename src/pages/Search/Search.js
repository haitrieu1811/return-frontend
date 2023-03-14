import { useParams } from 'react-router-dom';

const Search = () => {
    const { keyword, provinceId, districtId, wardId } = useParams();

    return (
        <h1>
            Search Page {keyword} {provinceId} {districtId} {wardId}
        </h1>
    );
};

export default Search;
